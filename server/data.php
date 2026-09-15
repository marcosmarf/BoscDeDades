<?php
require_once __DIR__ . '/config_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['status' => 'error', 'reason' => 'method_not_allowed']));
}

// --- 1. Límit de mida del body (evita DoS amb payloads enormes) ---
$content_length = isset($_SERVER['CONTENT_LENGTH']) ? (int)$_SERVER['CONTENT_LENGTH'] : 0;
if ($content_length > MAX_BODY_BYTES) {
    http_response_code(413);
    exit(json_encode(['status' => 'error', 'reason' => 'payload_too_large']));
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
    http_response_code(413);
    exit(json_encode(['status' => 'error', 'reason' => 'payload_too_large']));
}

// --- 2. Sanejament de capçaleres (només caràcters segurs) ---
function clean_header(?string $val, int $maxLen): ?string {
    if ($val === null) return null;
    $val = substr($val, 0, $maxLen);
    return preg_replace('/[^A-Za-z0-9\-_.:]/', '', $val);
}

$http_sensor = isset($_SERVER['HTTP_X_SENSOR']) ? clean_header($_SERVER['HTTP_X_SENSOR'], 40) : null;
$http_mac    = isset($_SERVER['HTTP_X_MAC_ID'])  ? clean_header($_SERVER['HTTP_X_MAC_ID'], 40) : null;
$http_pin    = isset($_SERVER['HTTP_X_PIN'])     ? intval($_SERVER['HTTP_X_PIN'])              : null;
// Nota: com que no controleu el firmware de les plaques, el PIN
// NO es fa servir per autenticar. Només es registra informativament.

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE          => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    error_log('BoscDeDades: no es pot connectar a la BD: ' . $e->getMessage());
    http_response_code(500);
    exit(json_encode(['status' => 'error', 'reason' => 'db_connect']));
}

function log_attempt(PDO $pdo, ?string $http_sensor, ?string $http_mac, ?int $http_pin, string $result, ?int $sensor_data_id, string $raw_body): void {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO send_log (http_sensor, http_mac, http_pin, result, sensor_data_id, raw_body)
            VALUES (:sensor, :mac, :pin, :result, :sdid, :body)
        ");
        $stmt->execute([
            ':sensor' => $http_sensor,
            ':mac'    => $http_mac,
            ':pin'    => $http_pin,
            ':result' => $result,
            ':sdid'   => $sensor_data_id,
            ':body'   => substr($raw_body, 0, 2000),
        ]);
    } catch (PDOException $e) {
        error_log('BoscDeDades: error escrivint send_log: ' . $e->getMessage());
    }
}

// --- 3. Comprovació a la llista blanca (per MAC i/o esp8266id) ---
function is_sensor_allowed(PDO $pdo, ?string $http_mac, string $esp8266id): bool {
    if ($http_mac !== null) {
        $stmt = $pdo->prepare("SELECT 1 FROM allowed_sensors WHERE mac_id = :mac LIMIT 1");
        $stmt->execute([':mac' => $http_mac]);
        if ($stmt->fetch()) return true;
    }
    $stmt = $pdo->prepare("SELECT 1 FROM allowed_sensors WHERE esp8266id = :id LIMIT 1");
    $stmt->execute([':id' => $esp8266id]);
    return (bool)$stmt->fetch();
}

$json = json_decode($raw, true);

if (!is_array($json)) {
    log_attempt($pdo, $http_sensor, $http_mac, $http_pin, 'bad_json', null, $raw);
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'reason' => 'bad_json']));
}

if (!isset($json['sensordatavalues']) || !is_array($json['sensordatavalues'])) {
    log_attempt($pdo, $http_sensor, $http_mac, $http_pin, 'no_data', null, $raw);
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'reason' => 'no_data']));
}

// --- 4. Limitem el nombre d'entrades processades ---
if (count($json['sensordatavalues']) > 60) {
    log_attempt($pdo, $http_sensor, $http_mac, $http_pin, 'too_many_fields', null, $raw);
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'reason' => 'too_many_fields']));
}

const FIELD_MAP = [
    'samples'               => 'samples',
    'min_micro'             => 'min_micro',
    'max_micro'             => 'max_micro',
    'interval'              => 'interval_ms',
    'signal'                => 'signal',
    // ... [Resta del FIELD_MAP sense canvis per no fer-ho etern] ...
    'SPS30_P0'              => 'sps30_P0',
    'temperature'           => 'dht_temperature',
    'humidity'              => 'dht_humidity',
    'BME280_temperature'    => 'bme280_temperature',
    'BME280_pressure'       => 'bme280_pressure',
    'BME280_humidity'       => 'bme280_humidity',
    'SDS_P1'                => 'sds_P1',
    'SDS_P2'                => 'sds_P2',
    'GPS_lat'               => 'gps_lat',
    'GPS_lon'               => 'gps_lon',
    'GPS_height'            => 'gps_height',
    'GPS_timestamp'         => 'gps_timestamp',
];

const STRING_COLS = ['gps_timestamp'];

function clean_id(?string $val, int $maxLen): string {
    if ($val === null) return 'unknown';
    $val = substr($val, 0, $maxLen);
    $val = preg_replace('/[^A-Za-z0-9\-_]/', '', $val);
    return $val === '' ? 'unknown' : $val;
}

$esp8266id  = isset($json['esp8266id'])        ? clean_id((string)$json['esp8266id'], 20)        : 'unknown';
$sw_version = isset($json['software_version']) ? substr((string)$json['software_version'], 0, 30) : '';

// --- 5. Aplicació de la llista blanca ---
try {
    $allowed = is_sensor_allowed($pdo, $http_mac, $esp8266id);
} catch (PDOException $e) {
    // Si la taula allowed_sensors encara no existeix, no bloquegem
    // per evitar tallar el servei; només ho registrem al log.
    error_log('BoscDeDades: no s\'ha pogut consultar allowed_sensors (existeix la taula?): ' . $e->getMessage());
    $allowed = true;
}

if (!$allowed) {
    log_attempt($pdo, $http_sensor, $http_mac, $http_pin, 'sensor_not_allowlisted', null, $raw);
    if (ALLOWLIST_ENFORCE) {
        http_response_code(403);
        exit(json_encode(['status' => 'error', 'reason' => 'sensor_not_recognized']));
    }
    // En mode no-forçat, continuem processant l'enviament normalment.
}

$cols = [
    'esp8266id'   => $esp8266id,
    'sw_version'  => $sw_version,
    'http_sensor' => $http_sensor,
    'http_mac'    => $http_mac,
];

foreach ($json['sensordatavalues'] as $entry) {
    if (!is_array($entry) || !isset($entry['value_type'], $entry['value'])) continue;
    $vtype = $entry['value_type'];
    if (!is_string($vtype) || !isset(FIELD_MAP[$vtype])) continue;

    $col = FIELD_MAP[$vtype];

    if (in_array($col, STRING_COLS, true)) {
        $cols[$col] = substr((string)$entry['value'], 0, 30);
    } else {
        if (!is_numeric($entry['value'])) continue; // ignorem valors no numèrics
        $cols[$col] = floatval($entry['value']);
    }
}

try {
    // --- 6. Antiflood senzill: no acceptem enviaments massa freqüents ---
    $stmt_check = $pdo->prepare("SELECT TIMESTAMPDIFF(SECOND, last_seen, NOW()) AS secs FROM sensor_status WHERE esp8266id = :id LIMIT 1");
    $stmt_check->execute([':id' => $esp8266id]);
    $row = $stmt_check->fetch(PDO::FETCH_ASSOC);
    if ($row && $row['secs'] !== null && (int)$row['secs'] < MIN_SECONDS_BETWEEN_SENDS) {
        log_attempt($pdo, $http_sensor, $http_mac, $http_pin, 'rate_limited', null, $raw);
        http_response_code(429);
        exit(json_encode(['status' => 'error', 'reason' => 'rate_limited']));
    }

    // 1. Inserim les dades a sensor_data
    $colNames = implode(', ', array_map(fn($c) => "`{$c}`", array_keys($cols)));
    $placeholders = implode(', ', array_map(fn($k) => ":{$k}", array_keys($cols)));
    $stmt = $pdo->prepare("INSERT INTO sensor_data ({$colNames}) VALUES ({$placeholders})");

    $binds = [];
    foreach ($cols as $colName => $value) {
        $binds[":{$colName}"] = $value;
    }
    $stmt->execute($binds);
    $new_id = (int)$pdo->lastInsertId();

    // 2. Actualitzem la taula d'estat independent
    $stmt_status = $pdo->prepare("
        INSERT INTO sensor_status (esp8266id, http_sensor, last_seen) 
        VALUES (:esp8266id, :http_sensor, NOW())
        ON DUPLICATE KEY UPDATE 
            http_sensor = VALUES(http_sensor),
            last_seen = NOW()
    ");
    $stmt_status->execute([
        ':esp8266id'   => $esp8266id,
        ':http_sensor' => $http_sensor
    ]);

    log_attempt($pdo, $http_sensor, $http_mac, $http_pin, $allowed ? 'ok' : 'ok_not_allowlisted', $new_id, $raw);

    http_response_code(201);
    echo json_encode(['status' => 'ok', 'id' => $new_id]);

} catch (PDOException $e) {
    error_log('BoscDeDades DB error en inserir: ' . $e->getMessage());
    log_attempt($pdo, $http_sensor, $http_mac, $http_pin, 'db_error', null, $raw);
    http_response_code(500);
    // SEGURETAT: Error genèric per no filtrar dades de la BD a l'exterior
    exit(json_encode(['status' => 'error', 'reason' => 'db_error_internal']));
}