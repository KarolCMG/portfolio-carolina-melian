<?php
/**
 * Generador de Token CSRF
 * Endpoint para obtener tokens de seguridad
 */

require_once 'security.php';

// Configurar headers de seguridad
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Solo permitir GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Validar origen
if (!$security->validateOrigin()) {
    http_response_code(403);
    echo json_encode(['error' => 'Origen no autorizado']);
    exit;
}

// Generar token CSRF
$token = $security->generateCSRFToken();

$response = [
    'csrf_token' => $token,
    'timestamp' => date('Y-m-d H:i:s')
];

echo json_encode($response);
?>
