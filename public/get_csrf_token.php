<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Para desarrollo local, simplemente devolvemos un token fijo
// En producción deberías usar un sistema de tokens más robusto
$csrfToken = bin2hex(random_bytes(32));

echo json_encode(['csrf_token' => $csrfToken]);
?>
