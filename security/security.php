<?php
/**
 * Sistema de Seguridad para Portfolio
 * Protección contra manipulación de código en consola
 */

class PortfolioSecurity {
    private $secretKey;
    private $allowedOrigins;
    private $rateLimit;
    
    public function __construct() {
        $this->secretKey = 'portfolio_secret_key_' . md5('carolina_melian_2024');
        $this->allowedOrigins = [
            'localhost:5173',
            '127.0.0.1:5173',
            'tu-dominio.com' // Cambia por tu dominio real
        ];
        $this->rateLimit = [
            'max_requests' => 100,
            'time_window' => 3600 // 1 hora
        ];
    }
    
    /**
     * Validar origen de la petición
     */
    public function validateOrigin() {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
        $host = parse_url($origin, PHP_URL_HOST);
        $port = parse_url($origin, PHP_URL_PORT);
        
        $fullOrigin = $host . ($port ? ':' . $port : '');
        
        if (!in_array($fullOrigin, $this->allowedOrigins)) {
            $this->logSecurityEvent('INVALID_ORIGIN', $origin);
            return false;
        }
        
        return true;
    }
    
    /**
     * Rate Limiting - Prevenir spam
     */
    public function checkRateLimit($ip) {
        $file = 'security/rate_limit_' . md5($ip) . '.json';
        
        if (!file_exists($file)) {
            $this->saveRateLimit($file, []);
            return true;
        }
        
        $data = json_decode(file_get_contents($file), true);
        $now = time();
        
        // Limpiar requests antiguos
        $data = array_filter($data, function($timestamp) use ($now) {
            return ($now - $timestamp) < $this->rateLimit['time_window'];
        });
        
        if (count($data) >= $this->rateLimit['max_requests']) {
            $this->logSecurityEvent('RATE_LIMIT_EXCEEDED', $ip);
            return false;
        }
        
        $data[] = $now;
        $this->saveRateLimit($file, $data);
        
        return true;
    }
    
    /**
     * Validar integridad del formulario
     */
    public function validateFormIntegrity($formData) {
        // Verificar que los campos requeridos estén presentes
        $requiredFields = ['name', 'email', 'message'];
        foreach ($requiredFields as $field) {
            if (!isset($formData[$field]) || empty(trim($formData[$field]))) {
                $this->logSecurityEvent('MISSING_FIELD', $field);
                return false;
            }
        }
        
        // Validar longitud de campos
        if (strlen($formData['name']) < 2 || strlen($formData['name']) > 100) {
            $this->logSecurityEvent('INVALID_NAME_LENGTH', $formData['name']);
            return false;
        }
        
        if (strlen($formData['message']) < 10 || strlen($formData['message']) > 2000) {
            $this->logSecurityEvent('INVALID_MESSAGE_LENGTH', strlen($formData['message']));
            return false;
        }
        
        // Validar email
        if (!filter_var($formData['email'], FILTER_VALIDATE_EMAIL)) {
            $this->logSecurityEvent('INVALID_EMAIL', $formData['email']);
            return false;
        }
        
        return true;
    }
    
    /**
     * Detectar intentos de inyección
     */
    public function detectInjection($data) {
        $patterns = [
            '/<script[^>]*>.*?<\/script>/is',
            '/javascript:/i',
            '/on\w+\s*=/i',
            '/<iframe[^>]*>.*?<\/iframe>/is',
            '/<object[^>]*>.*?<\/object>/is',
            '/<embed[^>]*>/i',
            '/<link[^>]*>/i',
            '/<meta[^>]*>/i',
            '/<style[^>]*>.*?<\/style>/is',
            '/<form[^>]*>.*?<\/form>/is',
            '/<input[^>]*>/i',
            '/<textarea[^>]*>.*?<\/textarea>/is',
            '/<select[^>]*>.*?<\/select>/is',
            '/<button[^>]*>.*?<\/button>/is',
            '/<a[^>]*>.*?<\/a>/is',
            '/<img[^>]*>/i',
            '/<video[^>]*>.*?<\/video>/is',
            '/<audio[^>]*>.*?<\/audio>/is',
            '/<source[^>]*>/i',
            '/<track[^>]*>/i',
            '/<canvas[^>]*>.*?<\/canvas>/is',
            '/<svg[^>]*>.*?<\/svg>/is',
            '/<math[^>]*>.*?<\/math>/is',
            '/<table[^>]*>.*?<\/table>/is',
            '/<tr[^>]*>.*?<\/tr>/is',
            '/<td[^>]*>.*?<\/td>/is',
            '/<th[^>]*>.*?<\/th>/is',
            '/<thead[^>]*>.*?<\/thead>/is',
            '/<tbody[^>]*>.*?<\/tbody>/is',
            '/<tfoot[^>]*>.*?<\/tfoot>/is',
            '/<colgroup[^>]*>.*?<\/colgroup>/is',
            '/<col[^>]*>/i',
            '/<caption[^>]*>.*?<\/caption>/is',
            '/<fieldset[^>]*>.*?<\/fieldset>/is',
            '/<legend[^>]*>.*?<\/legend>/is',
            '/<label[^>]*>.*?<\/label>/is',
            '/<optgroup[^>]*>.*?<\/optgroup>/is',
            '/<option[^>]*>.*?<\/option>/is',
            '/<output[^>]*>.*?<\/output>/is',
            '/<progress[^>]*>.*?<\/progress>/is',
            '/<meter[^>]*>.*?<\/meter>/is',
            '/<details[^>]*>.*?<\/details>/is',
            '/<summary[^>]*>.*?<\/summary>/is',
            '/<dialog[^>]*>.*?<\/dialog>/is',
            '/<menu[^>]*>.*?<\/menu>/is',
            '/<menuitem[^>]*>.*?<\/menuitem>/is',
            '/<command[^>]*>.*?<\/command>/is',
            '/<keygen[^>]*>.*?<\/keygen>/is',
            '/<datalist[^>]*>.*?<\/datalist>/is',
            '/<time[^>]*>.*?<\/time>/is',
            '/<mark[^>]*>.*?<\/mark>/is',
            '/<ruby[^>]*>.*?<\/ruby>/is',
            '/<rt[^>]*>.*?<\/rt>/is',
            '/<rp[^>]*>.*?<\/rp>/is',
            '/<bdi[^>]*>.*?<\/bdi>/is',
            '/<bdo[^>]*>.*?<\/bdo>/is',
            '/<wbr[^>]*>/i',
            '/<ins[^>]*>.*?<\/ins>/is',
            '/<del[^>]*>.*?<\/del>/is',
            '/<s[^>]*>.*?<\/s>/is',
            '/<strike[^>]*>.*?<\/strike>/is',
            '/<u[^>]*>.*?<\/u>/is',
            '/<small[^>]*>.*?<\/small>/is',
            '/<big[^>]*>.*?<\/big>/is',
            '/<tt[^>]*>.*?<\/tt>/is',
            '/<kbd[^>]*>.*?<\/kbd>/is',
            '/<samp[^>]*>.*?<\/samp>/is',
            '/<var[^>]*>.*?<\/var>/is',
            '/<code[^>]*>.*?<\/code>/is',
            '/<pre[^>]*>.*?<\/pre>/is',
            '/<blockquote[^>]*>.*?<\/blockquote>/is',
            '/<q[^>]*>.*?<\/q>/is',
            '/<cite[^>]*>.*?<\/cite>/is',
            '/<abbr[^>]*>.*?<\/abbr>/is',
            '/<acronym[^>]*>.*?<\/acronym>/is',
            '/<address[^>]*>.*?<\/address>/is',
            '/<b[^>]*>.*?<\/b>/is',
            '/<i[^>]*>.*?<\/i>/is',
            '/<em[^>]*>.*?<\/em>/is',
            '/<strong[^>]*>.*?<\/strong>/is',
            '/<dfn[^>]*>.*?<\/dfn>/is',
            '/<sub[^>]*>.*?<\/sub>/is',
            '/<sup[^>]*>.*?<\/sup>/is',
            '/<span[^>]*>.*?<\/span>/is',
            '/<div[^>]*>.*?<\/div>/is',
            '/<p[^>]*>.*?<\/p>/is',
            '/<h[1-6][^>]*>.*?<\/h[1-6]>/is',
            '/<ul[^>]*>.*?<\/ul>/is',
            '/<ol[^>]*>.*?<\/ol>/is',
            '/<li[^>]*>.*?<\/li>/is',
            '/<dl[^>]*>.*?<\/dl>/is',
            '/<dt[^>]*>.*?<\/dt>/is',
            '/<dd[^>]*>.*?<\/dd>/is',
            '/<hr[^>]*>/i',
            '/<br[^>]*>/i',
            '/<area[^>]*>/i',
            '/<base[^>]*>/i',
            '/<param[^>]*>/i',
            '/<noscript[^>]*>.*?<\/noscript>/is',
            '/<script[^>]*>.*?<\/script>/is',
            '/<style[^>]*>.*?<\/style>/is',
            '/<title[^>]*>.*?<\/title>/is',
            '/<head[^>]*>.*?<\/head>/is',
            '/<body[^>]*>.*?<\/body>/is',
            '/<html[^>]*>.*?<\/html>/is',
            '/<!DOCTYPE[^>]*>/i',
            '/<!--.*?-->/s',
            '/<\?php.*?\?>/s',
            '/<\?.*?\?>/s',
            '/<%%.*?%%>/s',
            '/<%.*?%>/s',
            '/<jsp:.*?>/i',
            '/<c:.*?>/i',
            '/<fmt:.*?>/i',
            '/<sql:.*?>/i',
            '/<x:.*?>/i',
            '/<fn:.*?>/i',
            '/<spring:.*?>/i',
            '/<struts:.*?>/i',
            '/<hibernate:.*?>/i',
            '/<mybatis:.*?>/i',
            '/<ibatis:.*?>/i',
            '/<tiles:.*?>/i',
            '/<display:.*?>/i',
            '/<logic:.*?>/i',
            '/<bean:.*?>/i',
            '/<html:.*?>/i',
            '/<nested:.*?>/i',
            '/<template:.*?>/i',
            '/<theme:.*?>/i',
            '/<ui:.*?>/i',
            '/<a4j:.*?>/i',
            '/<rich:.*?>/i',
            '/<ice:.*?>/i',
            '/<ace:.*?>/i',
            '/<pe:.*?>/i',
            '/<p:.*?>/i',
            '/<h:.*?>/i',
            '/<f:.*?>/i',
            '/<ui:.*?>/i',
            '/<cc:.*?>/i',
            '/<composite:.*?>/i',
            '/<event:.*?>/i',
            '/<util:.*?>/i',
            '/<c:.*?>/i',
            '/<fmt:.*?>/i',
            '/<fn:.*?>/i',
            '/<sql:.*?>/i',
            '/<x:.*?>/i',
            '/<spring:.*?>/i',
            '/<struts:.*?>/i',
            '/<hibernate:.*?>/i',
            '/<mybatis:.*?>/i',
            '/<ibatis:.*?>/i',
            '/<tiles:.*?>/i',
            '/<display:.*?>/i',
            '/<logic:.*?>/i',
            '/<bean:.*?>/i',
            '/<html:.*?>/i',
            '/<nested:.*?>/i',
            '/<template:.*?>/i',
            '/<theme:.*?>/i',
            '/<ui:.*?>/i',
            '/<a4j:.*?>/i',
            '/<rich:.*?>/i',
            '/<ice:.*?>/i',
            '/<ace:.*?>/i',
            '/<pe:.*?>/i',
            '/<p:.*?>/i',
            '/<h:.*?>/i',
            '/<f:.*?>/i',
            '/<ui:.*?>/i',
            '/<cc:.*?>/i',
            '/<composite:.*?>/i',
            '/<event:.*?>/i',
            '/<util:.*?>/i'
        ];
        
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $data)) {
                $this->logSecurityEvent('INJECTION_DETECTED', $data);
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Generar token CSRF
     */
    public function generateCSRFToken() {
        $token = bin2hex(random_bytes(32));
        $_SESSION['csrf_token'] = $token;
        return $token;
    }
    
    /**
     * Validar token CSRF
     */
    public function validateCSRFToken($token) {
        if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $token)) {
            $this->logSecurityEvent('INVALID_CSRF_TOKEN', $token);
            return false;
        }
        return true;
    }
    
    /**
     * Log de eventos de seguridad
     */
    private function logSecurityEvent($event, $data) {
        $logEntry = [
            'timestamp' => date('Y-m-d H:i:s'),
            'event' => $event,
            'data' => $data,
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
            'referer' => $_SERVER['HTTP_REFERER'] ?? 'unknown'
        ];
        
        $logFile = 'security/security_log.json';
        $logs = [];
        
        if (file_exists($logFile)) {
            $logs = json_decode(file_get_contents($logFile), true) ?: [];
        }
        
        $logs[] = $logEntry;
        
        // Mantener solo los últimos 1000 logs
        if (count($logs) > 1000) {
            $logs = array_slice($logs, -1000);
        }
        
        file_put_contents($logFile, json_encode($logs, JSON_PRETTY_PRINT));
    }
    
    /**
     * Guardar datos de rate limiting
     */
    private function saveRateLimit($file, $data) {
        if (!is_dir('security')) {
            mkdir('security', 0755, true);
        }
        file_put_contents($file, json_encode($data));
    }
    
    /**
     * Limpiar datos antiguos
     */
    public function cleanup() {
        $files = glob('security/rate_limit_*.json');
        $now = time();
        
        foreach ($files as $file) {
            if (filemtime($file) < ($now - $this->rateLimit['time_window'])) {
                unlink($file);
            }
        }
    }
}

// Inicializar sesión
session_start();

// Crear directorio de seguridad si no existe
if (!is_dir('security')) {
    mkdir('security', 0755, true);
}

// Instanciar sistema de seguridad
$security = new PortfolioSecurity();

// Limpiar datos antiguos
$security->cleanup();
?>
