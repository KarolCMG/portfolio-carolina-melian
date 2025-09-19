<?php
/**
 * Configuración de Seguridad Avanzada
 * Protección adicional contra manipulación de código
 */

// Configuración de seguridad
define('SECURITY_CONFIG', [
    'max_file_size' => 1024 * 1024, // 1MB
    'allowed_file_types' => ['jpg', 'jpeg', 'png', 'gif', 'pdf'],
    'max_execution_time' => 30,
    'memory_limit' => '128M',
    'session_timeout' => 3600, // 1 hora
    'max_login_attempts' => 5,
    'lockout_duration' => 900, // 15 minutos
    'enable_captcha' => false,
    'log_level' => 'INFO',
    'enable_honeypot' => true,
    'honeypot_field' => 'website_url'
]);

// Headers de seguridad adicionales
function setSecurityHeaders() {
    // Prevenir clickjacking
    header('X-Frame-Options: DENY');
    
    // Prevenir MIME type sniffing
    header('X-Content-Type-Options: nosniff');
    
    // Habilitar protección XSS del navegador
    header('X-XSS-Protection: 1; mode=block');
    
    // Política de referrer
    header('Referrer-Policy: strict-origin-when-cross-origin');
    
    // Content Security Policy
    header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'");
    
    // Permissions Policy
    header('Permissions-Policy: geolocation=(), microphone=(), camera=()');
    
    // Strict Transport Security (solo en HTTPS)
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
        header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
    }
}

// Función para detectar bots
function detectBot() {
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $botPatterns = [
        '/bot/i', '/crawler/i', '/spider/i', '/scraper/i',
        '/curl/i', '/wget/i', '/python/i', '/java/i',
        '/php/i', '/perl/i', '/ruby/i', '/go-http/i'
    ];
    
    foreach ($botPatterns as $pattern) {
        if (preg_match($pattern, $userAgent)) {
            return true;
        }
    }
    
    return false;
}

// Función para detectar proxies y VPNs
function detectProxy() {
    $proxyHeaders = [
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_FORWARDED',
        'HTTP_X_CLUSTER_CLIENT_IP',
        'HTTP_FORWARDED_FOR',
        'HTTP_FORWARDED',
        'HTTP_CLIENT_IP',
        'HTTP_VIA',
        'HTTP_X_VIA'
    ];
    
    foreach ($proxyHeaders as $header) {
        if (isset($_SERVER[$header])) {
            return true;
        }
    }
    
    return false;
}

// Función para validar IP
function validateIP($ip) {
    // Verificar que sea una IP válida
    if (!filter_var($ip, FILTER_VALIDATE_IP)) {
        return false;
    }
    
    // Bloquear IPs privadas si es necesario
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
        return true;
    }
    
    return true; // Permitir IPs privadas para desarrollo
}

// Función para generar nonce
function generateNonce() {
    return base64_encode(random_bytes(32));
}

// Función para validar nonce
function validateNonce($nonce, $action = 'default') {
    if (!isset($_SESSION['nonces'][$action])) {
        return false;
    }
    
    $storedNonce = $_SESSION['nonces'][$action];
    unset($_SESSION['nonces'][$action]); // Usar solo una vez
    
    return hash_equals($storedNonce, $nonce);
}

// Función para limpiar datos de entrada
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    
    // Remover caracteres de control
    $data = preg_replace('/[\x00-\x1F\x7F]/', '', $data);
    
    // Normalizar espacios en blanco
    $data = preg_replace('/\s+/', ' ', $data);
    
    // Trim
    $data = trim($data);
    
    return $data;
}

// Función para validar longitud de campos
function validateFieldLength($field, $min = 0, $max = 1000) {
    $length = strlen($field);
    return $length >= $min && $length <= $max;
}

// Función para detectar patrones sospechosos
function detectSuspiciousPatterns($data) {
    $patterns = [
        '/eval\s*\(/i',
        '/exec\s*\(/i',
        '/system\s*\(/i',
        '/shell_exec\s*\(/i',
        '/passthru\s*\(/i',
        '/proc_open\s*\(/i',
        '/popen\s*\(/i',
        '/file_get_contents\s*\(/i',
        '/file_put_contents\s*\(/i',
        '/fopen\s*\(/i',
        '/fwrite\s*\(/i',
        '/include\s*\(/i',
        '/require\s*\(/i',
        '/include_once\s*\(/i',
        '/require_once\s*\(/i',
        '/base64_decode\s*\(/i',
        '/base64_encode\s*\(/i',
        '/gzinflate\s*\(/i',
        '/gzuncompress\s*\(/i',
        '/str_rot13\s*\(/i',
        '/chr\s*\(/i',
        '/ord\s*\(/i',
        '/hex2bin\s*\(/i',
        '/bin2hex\s*\(/i',
        '/pack\s*\(/i',
        '/unpack\s*\(/i',
        '/serialize\s*\(/i',
        '/unserialize\s*\(/i',
        '/json_decode\s*\(/i',
        '/json_encode\s*\(/i',
        '/xml_parse\s*\(/i',
        '/simplexml_load_string\s*\(/i',
        '/domdocument/i',
        '/xmlreader/i',
        '/xmlwriter/i',
        '/soap/i',
        '/curl/i',
        '/wget/i',
        '/nc\s+/i',
        '/netcat/i',
        '/telnet/i',
        '/ssh/i',
        '/ftp/i',
        '/sftp/i',
        '/scp/i',
        '/rsync/i',
        '/mysql/i',
        '/postgresql/i',
        '/sqlite/i',
        '/oracle/i',
        '/mssql/i',
        '/mongodb/i',
        '/redis/i',
        '/memcached/i',
        '/elasticsearch/i',
        '/solr/i',
        '/lucene/i',
        '/apache/i',
        '/nginx/i',
        '/iis/i',
        '/tomcat/i',
        '/jetty/i',
        '/glassfish/i',
        '/weblogic/i',
        '/websphere/i',
        '/jboss/i',
        '/wildfly/i',
        '/undertow/i',
        '/netty/i',
        '/vertx/i',
        '/spring/i',
        '/hibernate/i',
        '/struts/i',
        '/jsf/i',
        '/primefaces/i',
        '/richfaces/i',
        '/icefaces/i',
        '/myfaces/i',
        '/tapestry/i',
        '/wicket/i',
        '/vaadin/i',
        '/gwt/i',
        '/play/i',
        '/grails/i',
        '/groovy/i',
        '/scala/i',
        '/clojure/i',
        '/kotlin/i',
        '/jruby/i',
        '/jython/i',
        '/jphp/i',
        '/jnode/i',
        '/jruby/i',
        '/jython/i',
        '/jphp/i',
        '/jnode/i'
    ];
    
    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $data)) {
            return true;
        }
    }
    
    return false;
}

// Función para generar hash seguro
function generateSecureHash($data) {
    return hash('sha256', $data . SECURITY_CONFIG['session_timeout']);
}

// Función para verificar integridad
function verifyIntegrity($data, $hash) {
    $expectedHash = generateSecureHash($data);
    return hash_equals($expectedHash, $hash);
}

// Función para limpiar logs antiguos
function cleanupLogs() {
    $logFiles = glob('security/*.json');
    $maxAge = 30 * 24 * 60 * 60; // 30 días
    
    foreach ($logFiles as $file) {
        if (filemtime($file) < (time() - $maxAge)) {
            unlink($file);
        }
    }
}

// Función para generar reporte de seguridad
function generateSecurityReport() {
    $report = [
        'timestamp' => date('Y-m-d H:i:s'),
        'total_requests' => $_SESSION['security_stats']['total_requests'] ?? 0,
        'blocked_requests' => $_SESSION['security_stats']['blocked_requests'] ?? 0,
        'csrf_attempts' => $_SESSION['security_stats']['csrf_attempts'] ?? 0,
        'injection_attempts' => $_SESSION['security_stats']['injection_attempts'] ?? 0,
        'rate_limit_hits' => $_SESSION['security_stats']['rate_limit_hits'] ?? 0,
        'bot_detections' => $_SESSION['security_stats']['bot_detections'] ?? 0,
        'proxy_detections' => $_SESSION['security_stats']['proxy_detections'] ?? 0
    ];
    
    return $report;
}

// Inicializar estadísticas de seguridad
if (!isset($_SESSION['security_stats'])) {
    $_SESSION['security_stats'] = [
        'total_requests' => 0,
        'blocked_requests' => 0,
        'csrf_attempts' => 0,
        'injection_attempts' => 0,
        'rate_limit_hits' => 0,
        'bot_detections' => 0,
        'proxy_detections' => 0
    ];
}

// Incrementar contador de requests
$_SESSION['security_stats']['total_requests']++;

// Aplicar headers de seguridad
setSecurityHeaders();

// Limpiar logs antiguos (solo una vez por sesión)
if (!isset($_SESSION['logs_cleaned'])) {
    cleanupLogs();
    $_SESSION['logs_cleaned'] = true;
}
?>

