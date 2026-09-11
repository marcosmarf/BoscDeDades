<?php
/**
 * status_data.php
 * Retorna l'estat de les plaques i sensors en format JSON.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');

// ==========================================
// CONFIGURACIÓ DE LA BASE DE DADES
// ==========================================
$db_host = 'localhost';
$db_name = 'nom_de_la_teva_base_de_dades';
$db_user = 'usuari_lectura'; // Usuari amb només permisos de SELECT
$db_pass = 'contrasenya_usuari_lectura';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'reason' => 'Error de connexió a la base de dades' // Amagar detalls de l'error per seguretat
    ]);
    exit;
}

// ==========================================
// CONSULTA A LA BASE DE DADES
// ==========================================
// Aquesta consulta agrupa per board_id i sensor_id per trobar l'última transmissió.
// Adapta 'sensor_readings' i les columnes al teu esquema real de base de dades.
$query = "
    SELECT 
        board_id, 
        sensor_id, 
        MAX(created_at) as last_seen,
        TIMESTAMPDIFF(SECOND, MAX(created_at), NOW()) / 3600.0 AS hours_since
    FROM sensor_readings
    GROUP BY board_id, sensor_id
    ORDER BY last_seen DESC
";

try {
    $stmt = $pdo->query($query);
    $boards = $stmt->fetchAll();
    
    // Processament de l'estat segons les regles sol·licitades
    foreach ($boards as &$board) {
        $hours = (float)$board['hours_since'];
        
        // Càlcul de l'estat
        if ($hours < 1) {
            $board['status'] = 'activa';
        } elseif ($hours < (24 * 30)) { // Aproximació d'1 mes (30 dies)
            $board['status'] = 'sense_dades';
        } else {
            $board['status'] = 'inactiva';
        }
        
        // Ometem mac_id, sw_version i total_readings tal com s'ha demanat
        // El javascript ('status.js') ja assignarà un '—' automàticament
        $board['mac_id'] = null;
        $board['sw_version'] = null;
        $board['total_readings'] = null;
    }
    
    // Resposta JSON final
    echo json_encode([
        'status' => 'ok',
        'generated_at' => date('Y-m-d\TH:i:sP'),
        'boards' => $boards
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'reason' => 'Error en la consulta SQL'
    ]);
}