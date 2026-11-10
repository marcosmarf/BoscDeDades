<?php
require_once __DIR__ . '/config_db.php';

if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    exit('Forbidden: aquest script només s\'ha d\'executar per crontab.');
}

// ============================================================
// CONFIGURACIÓ DELS FILTRES (ajusteu-ho segons calibratge)
// ============================================================

// --- Filtre 1: rangs físics ---
const PM_MIN              = 0.0;       // SDS011, µg/m³
const PM_MAX              = 1000.0;
const TEMP_MIN            = -20.0;     // °C
const TEMP_MAX            = 50.0;
const HUM_MIN             = 0.0;       // %
const HUM_MAX             = 100.0;
const PRES_MIN            = 60000.0;   // Pa (cobreix fins a ~4000 m d'altitud)
const PRES_MAX            = 110000.0;  // Pa
const DNMS_MIN            = 20.0;      // dB(A)
const DNMS_MAX            = 130.0;     // dB(A)

// --- Filtre 2: coherència i lectures encallades ---
const DNMS_COHERENCE_TOL  = 0.5;       // dB de tolerància a LA_min <= LAeq <= LA_max
const STUCK_RUN           = 10;        // lectures idèntiques consecutives (~25 min)

// --- Filtre 3: pics aïllats (Hampel) ---
const HAMPEL_HALF_WINDOW  = 3;         // finestra centrada de 2*3+1 = 7 lectures
const HAMPEL_K            = 3.5;       // múltiples de sigma robusta (1.4826*MAD)
const HAMPEL_FLOOR_PM     = 10.0;      // µg/m³
const HAMPEL_FLOOR_PRES   = 500.0;     // Pa
const HAMPEL_FLOOR_DNMS   = 15.0;      // dB(A)

// --- Filtre 4: compensació higroscòpica de les PM (Di Antonio et al., 2018) ---
const HUMIDITY_PM_LIMIT   = 85.0;      // % HR a partir del qual es compensa
const HUM_CORR_A          = 0.48756;   // factor = 1 + A * (HR/100)^B
const HUM_CORR_B          = 8.60068;
const HUM_FLAG_PCT        = 50.0;      // si >= 50% de lectures compensades => pm_hum_flag = 1

// --- Agregació ---
const MIN_VALID_READINGS  = 6;         // mínim de lectures vàlides per variable (~15 min)

// ============================================================
// FUNCIONS AUXILIARS
// ============================================================

function median(array $values): float {
    sort($values);
    $n = count($values);
    $mid = intdiv($n, 2);
    return ($n % 2) ? (float)$values[$mid] : ($values[$mid - 1] + $values[$mid]) / 2.0;
}

function in_range($v, float $min, float $max): bool {
    return $v !== null && $v >= $min && $v <= $max;
}

function avg_or_null(array $values): ?float {
    $values = array_values(array_filter($values, fn($v) => $v !== null));
    return count($values) >= MIN_VALID_READINGS ? array_sum($values) / count($values) : null;
}

/** Mitjana energètica (logarítmica) de nivells en dB. */
function energy_avg_db(array $values): ?float {
    if (count($values) < MIN_VALID_READINGS) {
        return null;
    }
    $sum = 0.0;
    foreach ($values as $v) {
        $sum += pow(10.0, $v / 10.0);
    }
    return 10.0 * log10($sum / count($values));
}

/**
 * Filtre Hampel. $series: [índex_fila => valor]. Retorna [índex_fila => true] dels pics aïllats.
 * Un augment sostingut desplaça la mediana de la finestra i NO es marca (episodi real).
 */
function hampel_outliers(array $series, float $floor): array {
    $keys = array_keys($series);
    $n = count($keys);
    $flagged = [];

    for ($i = 0; $i < $n; $i++) {
        $from = max(0, $i - HAMPEL_HALF_WINDOW);
        $to   = min($n - 1, $i + HAMPEL_HALF_WINDOW);
        $window = [];
        for ($j = $from; $j <= $to; $j++) {
            $window[] = $series[$keys[$j]];
        }
        if (count($window) < 4) {
            continue;
        }
        $med = median($window);
        $mad = median(array_map(fn($x) => abs($x - $med), $window));
        $threshold = max(HAMPEL_K * 1.4826 * $mad, $floor);

        if (abs($series[$keys[$i]] - $med) > $threshold) {
            $flagged[$keys[$i]] = true;
        }
    }
    return $flagged;
}

/**
 * Marca com a no vàlides (camp $okField = false) les seqüències de >= STUCK_RUN lectures
 * consecutives amb la mateixa clau. $keyFn retorna una cadena o null (lectura absent).
 * Retorna el nombre de lectures marcades.
 */
function mark_stuck_runs(array &$rows, callable $keyFn, string $okField): int {
    $count = 0;
    $run = [];
    $last = null;

    $flush = function () use (&$run, &$rows, $okField, &$count) {
        if (count($run) >= STUCK_RUN) {
            foreach ($run as $idx) {
                if ($rows[$idx][$okField]) {
                    $rows[$idx][$okField] = false;
                    $count++;
                }
            }
        }
        $run = [];
    };

    foreach ($rows as $i => $r) {
        $key = $keyFn($r);
        if ($key === null) {
            $flush();
            $last = null;
            continue;
        }
        if ($key === $last) {
            $run[] = $i;
        } else {
            $flush();
            $run = [$i];
            $last = $key;
        }
    }
    $flush();
    return $count;
}

/**
 * Aplica tots els filtres a les lectures d'UN sensor.
 * Retorna [valors agregats, estadístiques de descarts].
 */
function process_sensor(array $rows): array {
    $stats = [
        'total' => count($rows),
        'pm_f1' => 0, 'pm_f2_coh' => 0, 'pm_f2_stuck' => 0, 'pm_f3' => 0, 'pm_f4_comp' => 0,
        'pres_f1' => 0, 'pres_f3' => 0,
        'dn_f1' => 0, 'dn_f2_coh' => 0, 'dn_f2_stuck' => 0, 'dn_f3' => 0,
    ];

    // --- Normalització: primer BME280, si no n'hi ha, alternatives ---
    foreach ($rows as $i => &$r) {
        $r['temp'] = $r['bme280_temperature'] ?? $r['dht_temperature'];
        $r['hum']  = $r['bme280_humidity']    ?? $r['dht_humidity'];
        $r['pres'] = $r['bme280_pressure']    ?? $r['bmp280_pressure'] ?? $r['bmp_pressure'];

        $r['pm1']  = $r['sds_P1'];
        $r['pm2']  = $r['sds_P2'];
        $r['pm_ok'] = ($r['pm1'] !== null && $r['pm2'] !== null);

        $r['la_eq']  = $r['dnms_noise_LAeq'];
        $r['la_min'] = $r['dnms_noise_LA_min'];
        $r['la_max'] = $r['dnms_noise_LA_max'];
        $r['dn_ok']  = ($r['la_eq'] !== null && $r['la_min'] !== null && $r['la_max'] !== null);

        $r['pres_ok'] = ($r['pres'] !== null);
        $r['pm_corrected'] = false;
        $r['pm1_raw'] = $r['pm1'];
        $r['pm2_raw'] = $r['pm2'];
    }
    unset($r);

    // =========================================================
    // FILTRE 1: rangs físics
    // =========================================================
    foreach ($rows as $i => &$r) {
        if ($r['pm_ok'] && (!in_range($r['pm1'], PM_MIN, PM_MAX) || !in_range($r['pm2'], PM_MIN, PM_MAX))) {
            $r['pm_ok'] = false;
            $stats['pm_f1']++;
        }
        if ($r['temp'] !== null && !in_range($r['temp'], TEMP_MIN, TEMP_MAX)) {
            $r['temp'] = null;
        }
        if ($r['hum'] !== null && !in_range($r['hum'], HUM_MIN, HUM_MAX)) {
            $r['hum'] = null;
        }
        if ($r['pres_ok'] && !in_range($r['pres'], PRES_MIN, PRES_MAX)) {
            $r['pres_ok'] = false;
            $stats['pres_f1']++;
        }
        if ($r['dn_ok'] && (!in_range($r['la_eq'], DNMS_MIN, DNMS_MAX)
                         || !in_range($r['la_min'], DNMS_MIN, DNMS_MAX)
                         || !in_range($r['la_max'], DNMS_MIN, DNMS_MAX))) {
            $r['dn_ok'] = false;
            $stats['dn_f1']++;
        }
    }
    unset($r);

    // =========================================================
    // FILTRE 2: coherència + lectures encallades
    // =========================================================
    foreach ($rows as $i => &$r) {
        // SDS011: PM2.5 <= PM10
        if ($r['pm_ok'] && $r['pm2'] > $r['pm1']) {
            $r['pm_ok'] = false;
            $stats['pm_f2_coh']++;
        }
        // DNMS: LA_min <= LAeq <= LA_max (amb tolerància)
        if ($r['dn_ok'] && ($r['la_min'] > $r['la_eq'] + DNMS_COHERENCE_TOL
                         || $r['la_eq']  > $r['la_max'] + DNMS_COHERENCE_TOL)) {
            $r['dn_ok'] = false;
            $stats['dn_f2_coh']++;
        }
    }
    unset($r);

    $stats['pm_f2_stuck'] = mark_stuck_runs(
        $rows,
        fn($r) => ($r['pm1'] === null || $r['pm2'] === null) ? null : $r['pm1'] . '|' . $r['pm2'],
        'pm_ok'
    );
    $stats['dn_f2_stuck'] = mark_stuck_runs(
        $rows,
        fn($r) => ($r['la_eq'] === null || $r['la_min'] === null || $r['la_max'] === null)
            ? null : $r['la_eq'] . '|' . $r['la_min'] . '|' . $r['la_max'],
        'dn_ok'
    );

    // =========================================================
    // FILTRE 3: pics aïllats (Hampel)
    // =========================================================
    // PM
    $s1 = $s2 = [];
    foreach ($rows as $i => $r) {
        if ($r['pm_ok']) {
            $s1[$i] = (float)$r['pm1'];
            $s2[$i] = (float)$r['pm2'];
        }
    }
    $spikes = hampel_outliers($s1, HAMPEL_FLOOR_PM) + hampel_outliers($s2, HAMPEL_FLOOR_PM);
    foreach (array_keys($spikes) as $i) {
        $rows[$i]['pm_ok'] = false;
        $stats['pm_f3']++;
    }

    // Pressió
    $sp = [];
    foreach ($rows as $i => $r) {
        if ($r['pres_ok']) {
            $sp[$i] = (float)$r['pres'];
        }
    }
    foreach (array_keys(hampel_outliers($sp, HAMPEL_FLOOR_PRES)) as $i) {
        $rows[$i]['pres_ok'] = false;
        $stats['pres_f3']++;
    }

    // DNMS: només LAeq i LA_min. LA_max és per definició un valor extrem (esdeveniments
    // sonors reals), així que no s'hi aplica detecció de pics.
    $sl = $sm = [];
    foreach ($rows as $i => $r) {
        if ($r['dn_ok']) {
            $sl[$i] = (float)$r['la_eq'];
            $sm[$i] = (float)$r['la_min'];
        }
    }
    $spikes = hampel_outliers($sl, HAMPEL_FLOOR_DNMS) + hampel_outliers($sm, HAMPEL_FLOOR_DNMS);
    foreach (array_keys($spikes) as $i) {
        $rows[$i]['dn_ok'] = false;
        $stats['dn_f3']++;
    }

    // =========================================================
    // FILTRE 4: compensació higroscòpica + etiquetatge (PM)
    //   PM_corregida = PM / (1 + A * (HR/100)^B)   si HR > 85 %
    // =========================================================
    foreach ($rows as $i => &$r) {
        if ($r['pm_ok'] && $r['hum'] !== null && $r['hum'] > HUMIDITY_PM_LIMIT) {
            $factor = 1.0 + HUM_CORR_A * pow($r['hum'] / 100.0, HUM_CORR_B);
            $r['pm1'] = $r['pm1'] / $factor;
            $r['pm2'] = $r['pm2'] / $factor;
            $r['pm_corrected'] = true;
            $stats['pm_f4_comp']++;
        }
    }
    unset($r);

    // =========================================================
    // AGREGACIÓ
    // =========================================================
    $pm1v = $pm2v = $pm1raw = $pm2raw = [];
    $tempv = $humv = $presv = [];
    $laeqv = $laminv = $lamaxv = [];

    foreach ($rows as $r) {
        if ($r['pm_ok']) {
            $pm1v[]   = (float)$r['pm1'];
            $pm2v[]   = (float)$r['pm2'];
            $pm1raw[] = (float)$r['pm1_raw'];
            $pm2raw[] = (float)$r['pm2_raw'];
        }
        if ($r['temp'] !== null) $tempv[] = (float)$r['temp'];
        if ($r['hum']  !== null) $humv[]  = (float)$r['hum'];
        if ($r['pres_ok'])       $presv[] = (float)$r['pres'];
        if ($r['dn_ok']) {
            $laeqv[]  = (float)$r['la_eq'];
            $laminv[] = (float)$r['la_min'];
            $lamaxv[] = (float)$r['la_max'];
        }
    }

    $pmValid = count($pm1v);
    $pmEnough = $pmValid >= MIN_VALID_READINGS;
    $corrPct = $pmEnough ? round($stats['pm_f4_comp'] / $pmValid * 100.0, 2) : null;

    $avgs = [
        'temp'    => avg_or_null($tempv),
        'hum'     => avg_or_null($humv),
        'pres'    => avg_or_null($presv),
        'pm1'     => avg_or_null($pm1v),
        'pm2'     => avg_or_null($pm2v),
        'pm1_raw' => avg_or_null($pm1raw),
        'pm2_raw' => avg_or_null($pm2raw),
        'pm_corr_pct' => $corrPct,
        'pm_hum_flag' => $corrPct === null ? null : (int)($corrPct >= HUM_FLAG_PCT),
        'la_eq'   => energy_avg_db($laeqv),                                        // mitjana energètica
        'la_min'  => count($laminv) >= MIN_VALID_READINGS ? min($laminv) : null,   // mínim de l'hora
        'la_max'  => count($lamaxv) >= MIN_VALID_READINGS ? max($lamaxv) : null,   // màxim de l'hora
    ];
    $stats['valid_pm']   = $pmValid;
    $stats['valid_dnms'] = count($laeqv);

    return [$avgs, $stats];
}

// ============================================================
// EXECUCIÓ PRINCIPAL
// ============================================================
$pdo = null;
$hasLock = false;

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    // Control de concurrència
    $lock = $pdo->query("SELECT GET_LOCK('boscdedades_cron_horari', 0) AS got_lock")->fetch();
    if (!$lock || (int)$lock['got_lock'] !== 1) {
        echo "Ja hi ha una altra execució del cron en curs. Sortint.\n";
        exit(0);
    }
    $hasLock = true;

    // Extracció: última hora, ordenada per sensor i temps
    $numCols = [
        'sds_P1', 'sds_P2',
        'bme280_temperature', 'bme280_humidity', 'bme280_pressure',
        'dht_temperature', 'dht_humidity',
        'bmp280_pressure', 'bmp_pressure',
        'dnms_noise_LAeq', 'dnms_noise_LA_min', 'dnms_noise_LA_max',
    ];

    $rowsAll = $pdo->query("
        SELECT esp8266id, received_at, " . implode(', ', $numCols) . "
        FROM sensor_data
        WHERE received_at >= NOW() - INTERVAL 1 HOUR
        ORDER BY esp8266id, received_at
    ")->fetchAll();

    $bySensor = [];
    foreach ($rowsAll as $r) {
        foreach ($numCols as $c) {
            if ($r[$c] !== null) {
                $r[$c] = (float)$r[$c];
            }
        }
        $bySensor[$r['esp8266id']][] = $r;
    }
    unset($rowsAll);

    $pdo->beginTransaction();

    $ins = $pdo->prepare("
        INSERT INTO sensor_data_rolling_avg
            (fecha_calculo, esp8266id,
             avg_bme280_temperature, avg_bme280_humidity, avg_bme280_pressure,
             avg_sds_P1, avg_sds_P2, avg_sds_P1_raw, avg_sds_P2_raw,
             pm_hum_corrected_pct, pm_hum_flag,
             avg_dnms_noise_LAeq, dnms_noise_LA_min, dnms_noise_LA_max)
        VALUES
            (NOW(), :id,
             :t, :h, :p,
             :p1, :p2, :p1r, :p2r,
             :pcp, :pflag,
             :laeq, :lamin, :lamax)
    ");

    $inserted = 0;
    $skipped  = 0;

    foreach ($bySensor as $espId => $rows) {
        [$a, $st] = process_sensor($rows);

        $mainValues = [$a['temp'], $a['hum'], $a['pres'], $a['pm1'], $a['pm2'], $a['la_eq']];
        if (count(array_filter($mainValues, fn($v) => $v !== null)) === 0) {
            $skipped++;
            echo "[{$espId}] DESCARTAT (lectures={$st['total']}, PM vàlides={$st['valid_pm']}, DNMS vàlides={$st['valid_dnms']})\n";
            continue;
        }

        $ins->execute([
            ':id'    => $espId,
            ':t'     => $a['temp'],
            ':h'     => $a['hum'],
            ':p'     => $a['pres'],
            ':p1'    => $a['pm1'],
            ':p2'    => $a['pm2'],
            ':p1r'   => $a['pm1_raw'],
            ':p2r'   => $a['pm2_raw'],
            ':pcp'   => $a['pm_corr_pct'],
            ':pflag' => $a['pm_hum_flag'],
            ':laeq'  => $a['la_eq'],
            ':lamin' => $a['la_min'],
            ':lamax' => $a['la_max'],
        ]);
        $inserted++;

        echo sprintf(
            "[%s] OK lectures=%d | PM(vàlides=%d): F1=%d F2coh=%d F2stuck=%d F3=%d F4comp=%d | PRES: F1=%d F3=%d | DNMS(vàlides=%d): F1=%d F2coh=%d F2stuck=%d F3=%d\n",
            $espId, $st['total'],
            $st['valid_pm'], $st['pm_f1'], $st['pm_f2_coh'], $st['pm_f2_stuck'], $st['pm_f3'], $st['pm_f4_comp'],
            $st['pres_f1'], $st['pres_f3'],
            $st['valid_dnms'], $st['dn_f1'], $st['dn_f2_coh'], $st['dn_f2_stuck'], $st['dn_f3']
        );
    }

    // Neteja històrica (retenció 24h)
    $pdo->exec("DELETE FROM sensor_data WHERE received_at < NOW() - INTERVAL 24 HOUR");
    $pdo->exec("DELETE FROM send_log WHERE received_at < NOW() - INTERVAL 24 HOUR");

    $pdo->commit();

    echo "Completat: {$inserted} mitjanes inserides, {$skipped} sensors descartats, dades >24h eliminades.\n";

} catch (Throwable $e) {
    if ($pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('BoscDeDades Cron Error: ' . $e->getMessage());
    http_response_code(500);
    echo "Error en el procés horari. Consulteu els logs del servidor.\n";
    $exitCode = 1;
} finally {
    if ($pdo instanceof PDO && $hasLock) {
        try {
            $pdo->exec("SELECT RELEASE_LOCK('boscdedades_cron_horari')");
        } catch (Throwable $e2) {
        }
    }
}

exit($exitCode ?? 0);