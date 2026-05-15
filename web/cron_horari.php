<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'boscdedades_sensors');
define('DB_USER', 'boscdedades_user');
define('DB_PASS', '');

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

    $pdo->beginTransaction();

    $sql_locations = "
        INSERT INTO sensor_locations (esp8266id, lat, lon, lastUpdate)
        SELECT esp8266id, MAX(gps_lat), MAX(gps_lon), NOW() 
        FROM sensor_data 
        WHERE gps_lat IS NOT NULL AND gps_lon IS NOT NULL
        GROUP BY esp8266id
        ON DUPLICATE KEY UPDATE 
            lat = VALUES(lat), 
            lon = VALUES(lon), 
            lastUpdate = VALUES(lastUpdate)
    ";
    $pdo->exec($sql_locations);

    $sql_averages = "
        INSERT INTO sensor_data_rolling_avg (fecha_calculo, esp8266id, avg_dht_temperature, avg_dht_humidity, avg_dht_pressure, avg_sds_P1, avg_sds_P2)
        SELECT 
            NOW(), 
            esp8266id, 
            AVG(bme280_temperature), 
            AVG(bme280_humidity),
            AVG(bme280_pressure), 
            AVG(sds_P1), 
            AVG(sds_P2)
        FROM sensor_data
        WHERE received_at >= NOW() - INTERVAL 1 HOUR
        GROUP BY esp8266id
    ";
    $pdo->exec($sql_averages);

    $pdo->exec("DELETE FROM sensor_data WHERE received_at < NOW() - INTERVAL 1 HOUR");
    $pdo->exec("DELETE FROM send_log WHERE received_at < NOW() - INTERVAL 1 HOUR");

    $pdo->commit();
    echo "Completat: Mitges calculades i dades antigues (>1h) eliminades.";

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('BoscDeDades Cron Error: ' . $e->getMessage());
    die("Error en el proces horari: " . $e->getMessage());
}
?>