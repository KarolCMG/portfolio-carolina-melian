<?php
/**
 * Endpoint de Seguridad para Formulario de Contacto
 * Valida y procesa las peticiones del formulario
 */

require_once 'security.php';

// Configurar headers de seguridad
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
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

// Rate limiting
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (!$security->checkRateLimit($ip)) {
    http_response_code(429);
    echo json_encode(['error' => 'Demasiadas peticiones. Intenta más tarde.']);
    exit;
}

// Obtener datos del formulario
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos inválidos']);
    exit;
}

// Validar token CSRF
if (!isset($input['csrf_token']) || !$security->validateCSRFToken($input['csrf_token'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Token de seguridad inválido']);
    exit;
}

// Validar integridad del formulario
if (!$security->validateFormIntegrity($input)) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos del formulario inválidos']);
    exit;
}

// Detectar intentos de inyección
$allData = implode(' ', array_values($input));
if ($security->detectInjection($allData)) {
    http_response_code(400);
    echo json_encode(['error' => 'Contenido no permitido detectado']);
    exit;
}

// Si llegamos aquí, los datos son seguros
// Aquí puedes procesar el email o hacer lo que necesites

// Simular procesamiento exitoso
$response = [
    'success' => true,
    'message' => 'Mensaje enviado correctamente',
    'timestamp' => date('Y-m-d H:i:s')
];

echo json_encode($response);
?>

