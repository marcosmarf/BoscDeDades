<?php
// Diagnostico PHP BoscDeDades — borrar tras usarlo
header('Content-Type: text/plain; charset=utf-8');

echo "=== Diagnostico PHP ===\n";
echo "PHP OK\n";
echo "Version: " . PHP_VERSION . "\n";
echo "SAPI: " . PHP_SAPI . "\n";
echo "Fecha: " . date('Y-m-d H:i:s') . "\n\n";

echo "=== Extensiones ===\n";
foreach (['pdo', 'pdo_mysql', 'json', 'mbstring'] as $ext) {
    echo $ext . ': ' . (extension_loaded($ext) ? 'OK' : 'FALTA') . "\n";
}

if (class_exists('PDO')) {
    echo 'PDO drivers: ' . implode(', ', PDO::getAvailableDrivers()) . "\n";
}

echo "\n=== Archivos ===\n";
echo 'config.php: ' . (is_file(__DIR__ . '/config.php') ? 'existe' : 'NO existe') . "\n";
echo 'data.php: ' . (is_file(__DIR__ . '/data.php') ? 'existe' : 'NO existe') . "\n";

echo "\n=== Config / BD ===\n";
$config = __DIR__ . '/config.php';
if (!is_file($config)) {
    echo "Sin config.php — copia config.example.php y rellena credenciales.\n";
    exit;
}

require $config;

echo 'DB_HOST: ' . (defined('DB_HOST') ? DB_HOST : 'NO') . "\n";
echo 'DB_NAME: ' . (defined('DB_NAME') ? DB_NAME : 'NO') . "\n";
echo 'DB_USER: ' . (defined('DB_USER') ? DB_USER : 'NO') . "\n";
echo 'DB_PASS: ' . (defined('DB_PASS') && DB_PASS !== '' ? 'definida' : 'vacia/NO') . "\n";

if (!extension_loaded('pdo_mysql') || !defined('DB_HOST') || !defined('DB_NAME') || !defined('DB_USER') || !defined('DB_PASS')) {
    echo "No se puede probar la BD.\n";
    exit;
}

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    echo "Conexion BD: OK\n";
    echo 'MySQL: ' . $pdo->query('SELECT VERSION()')->fetchColumn() . "\n";

    $have = $pdo->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);
    echo 'Tablas: ' . (count($have) ? implode(', ', $have) : '(ninguna)') . "\n";
} catch (Exception $e) {
    echo "Conexion BD: ERROR\n";
    echo $e->getMessage() . "\n";
}
