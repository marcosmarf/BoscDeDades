<?php


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

$http_sensor = isset($_SERVER['HTTP_X_SENSOR'])  ? substr($_SERVER['HTTP_X_SENSOR'], 0, 40)  : null;
$http_mac    = isset($_SERVER['HTTP_X_MAC_ID'])   ? substr($_SERVER['HTTP_X_MAC_ID'],  0, 40)  : null;
$http_pin    = isset($_SERVER['HTTP_X_PIN'])       ? intval($_SERVER['HTTP_X_PIN'])             : null;

$raw = file_get_contents('php://input');

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
    error_log('BoscDeDades: no se puede conectar a la BD: ' . $e->getMessage());
    http_response_code(500);
    exit(json_encode(['status' => 'error', 'reason' => 'db_connect']));
}

function log_attempt(PDO $pdo, $http_sensor, $http_mac, $http_pin, string $result, ?int $sensor_data_id, string $raw_body): void {
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
        error_log('BoscDeDades: error escribiendo send_log: ' . $e->getMessage());
    }
}

$json = json_decode($raw, true);

if (!$json) {
    log_attempt($pdo, $http_sensor, $http_mac, $http_pin, 'bad_json', null, $raw);
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'reason' => 'bad_json']));
}

if (!isset($json['sensordatavalues']) || !is_array($json['sensordatavalues'])) {
    log_attempt($pdo, $http_sensor, $http_mac, $http_pin, 'no_data', null, $raw);
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'reason' => 'no_data']));
}
const FIELD_MAP = [
    // Telemetría del dispositivo
    'samples'               => 'samples',
    'min_micro'             => 'min_micro',
    'max_micro'             => 'max_micro',
    'interval'              => 'interval_ms',
    'signal'                => 'signal',

    // PPD42NS
    'durP1'                 => 'ppd_durP1',
    'ratioP1'               => 'ppd_ratioP1',
    'P1'                    => 'ppd_P1',
    'durP2'                 => 'ppd_durP2',
    'ratioP2'               => 'ppd_ratioP2',
    'P2'                    => 'ppd_P2',

    // SDS011
    'SDS_P1'                => 'sds_P1',
    'SDS_P2'                => 'sds_P2',

    // PMS
    'PMS_P0'                => 'pms_P0',
    'PMS_P1'                => 'pms_P1',
    'PMS_P2'                => 'pms_P2',

    // HPM
    'HPM_P1'                => 'hpm_P1',
    'HPM_P2'                => 'hpm_P2',

    // Next PM
    'NPM_P0'                => 'npm_P0',
    'NPM_P1'                => 'npm_P1',
    'NPM_P2'                => 'npm_P2',
    'NPM_N1'                => 'npm_N1',
    'NPM_N10'               => 'npm_N10',
    'NPM_N25'               => 'npm_N25',

    // IPS-7100
    'IPS_P0'                => 'ips_P0',
    'IPS_P01'               => 'ips_P01',
    'IPS_P03'               => 'ips_P03',
    'IPS_P05'               => 'ips_P05',
    'IPS_P1'                => 'ips_P1',
    'IPS_P2'                => 'ips_P2',
    'IPS_P5'                => 'ips_P5',
    'IPS_N01'               => 'ips_N01',
    'IPS_N03'               => 'ips_N03',
    'IPS_N05'               => 'ips_N05',
    'IPS_N1'                => 'ips_N1',
    'IPS_N10'               => 'ips_N10',
    'IPS_N25'               => 'ips_N25',
    'IPS_N5'                => 'ips_N5',

    // SPS30
    'SPS30_P0'              => 'sps30_P0',
    'SPS30_P1'              => 'sps30_P1',
    'SPS30_P2'              => 'sps30_P2',
    'SPS30_P4'              => 'sps30_P4',
    'SPS30_N05'             => 'sps30_N05',
    'SPS30_N1'              => 'sps30_N1',
    'SPS30_N25'             => 'sps30_N25',
    'SPS30_N4'              => 'sps30_N4',
    'SPS30_N10'             => 'sps30_N10',
    'SPS30_TS'              => 'sps30_TS',

    // DHT22 (usa value_type genérico sin prefijo)
    'temperature'           => 'dht_temperature',
    'humidity'              => 'dht_humidity',

    // HTU21D
    'HTU21D_temperature'    => 'htu21d_temperature',
    'HTU21D_humidity'       => 'htu21d_humidity',

    // BMP180
    'BMP_temperature'       => 'bmp_temperature',
    'BMP_pressure'          => 'bmp_pressure',

    // BMP280
    'BMP280_temperature'    => 'bmp280_temperature',
    'BMP280_pressure'       => 'bmp280_pressure',

    // BME280
    'BME280_temperature'    => 'bme280_temperature',
    'BME280_pressure'       => 'bme280_pressure',
    'BME280_humidity'       => 'bme280_humidity',

    // SHT3x
    'SHT3X_temperature'     => 'sht3x_temperature',
    'SHT3X_humidity'        => 'sht3x_humidity',

    // SCD30
    'SCD30_temperature'     => 'scd30_temperature',
    'SCD30_humidity'        => 'scd30_humidity',
    'SCD30_co2_ppm'         => 'scd30_co2_ppm',

    // DS18B20
    'DS18B20_temperature'   => 'ds18b20_temperature',

    // DNMS
    'DNMS_noise_LAeq'       => 'dnms_noise_LAeq',
    'DNMS_noise_LA_min'     => 'dnms_noise_LA_min',
    'DNMS_noise_LA_max'     => 'dnms_noise_LA_max',

    // GPS
    'GPS_lat'               => 'gps_lat',
    'GPS_lon'               => 'gps_lon',
    'GPS_height'            => 'gps_height',
    'GPS_timestamp'         => 'gps_timestamp',
];

const STRING_COLS = ['gps_timestamp'];

$esp8266id  = isset($json['esp8266id'])        ? substr($json['esp8266id'], 0, 20)        : 'unknown';
$sw_version = isset($json['software_version']) ? substr($json['software_version'], 0, 30) : '';

$cols = [
    'esp8266id'   => $esp8266id,
    'sw_version'  => $sw_version,
    'http_sensor' => $http_sensor,
    'http_mac'    => $http_mac,
];

foreach ($json['sensordatavalues'] as $entry) {
    if (!isset($entry['value_type'], $entry['value'])) {
        continue;
    }
    $vtype = $entry['value_type'];
    if (!isset(FIELD_MAP[$vtype])) {
        error_log("BoscDeDades: value_type desconocido ignorado: {$vtype}");
        continue;
    }
    $col        = FIELD_MAP[$vtype];
    $cols[$col] = in_array($col, STRING_COLS, true)
        ? substr((string)$entry['value'], 0, 30)
        : floatval($entry['value']);
}

try {
    $colNames = implode(', ', array_map(fn($c) => "`{$c}`", array_keys($cols)));
    
    $placeholders = implode(', ', array_map(fn($k) => ":{$k}", array_keys($cols)));
    $stmt = $pdo->prepare(
    "INSERT INTO sensor_data ({$colNames}) VALUES ({$placeholders})"
);

    $binds = [];
    foreach ($cols as $colName => $value) {
        $binds[":{$colName}"] = $value;
    }
    $stmt->execute($binds);

    $new_id = (int)$pdo->lastInsertId();

    log_attempt($pdo, $http_sensor, $http_mac, $http_pin, 'ok', $new_id, $raw);

    http_response_code(201);
    echo json_encode(['status' => 'ok', 'id' => $new_id]);

} 
catch (PDOException $e) {

    error_log('BoscDeDades DB error al insertar: ' . $e->getMessage());

    log_attempt($pdo, $http_sensor, $http_mac, $http_pin, 'db_error', null, $raw);

    http_response_code(500);

    die($e->getMessage());
}
?>