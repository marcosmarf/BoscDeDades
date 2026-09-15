<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');

require_once __DIR__ . '/config_db.php';

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    error_log('BoscDeDades Status Error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'reason' => 'Error de connexió a la base de dades' // Missatge segur
    ]);
    exit;
}

$query = "
    SELECT 
        esp8266id AS board_id, 
        http_sensor AS sensor_id, 
        last_seen,
        TIMESTAMPDIFF(SECOND, last_seen, NOW()) / 3600.0 AS hours_since
    FROM sensor_status
    ORDER BY last_seen DESC
    LIMIT 500
";

try {
    $stmt = $pdo->query($query);
    $boards = $stmt->fetchAll();
    
    foreach ($boards as &$board) {
        $hours = (float)$board['hours_since'];
        
        if ($hours < 1) {
            $board['status'] = 'activa';
        } elseif ($hours < (24 * 30)) { 
            $board['status'] = 'sense_dades';
        } else {
            $board['status'] = 'inactiva';
        }

        $board['mac_id'] = null;
        $board['sw_version'] = null;
        $board['total_readings'] = null;
    }
    
    echo json_encode([
        'status' => 'ok',
        'generated_at' => date('Y-m-d\TH:i:sP'),
        'boards' => $boards
    ]);

} catch (PDOException $e) {
    error_log('BoscDeDades Status Query Error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'reason' => 'Error en la consulta SQL' // Missatge segur
    ]);
}