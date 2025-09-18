# 🔒 Sistema de Seguridad para Portfolio

## 🛡️ Características de Seguridad Implementadas

### 1. **Protección CSRF (Cross-Site Request Forgery)**
- ✅ Tokens CSRF únicos para cada sesión
- ✅ Validación de tokens en cada petición
- ✅ Regeneración automática de tokens

### 2. **Rate Limiting (Límite de Peticiones)**
- ✅ Máximo 100 peticiones por hora por IP
- ✅ Bloqueo automático de IPs sospechosas
- ✅ Limpieza automática de datos antiguos

### 3. **Validación de Origen**
- ✅ Solo permite peticiones desde dominios autorizados
- ✅ Validación de referrer y origin headers
- ✅ Bloqueo de peticiones desde dominios no autorizados

### 4. **Detección de Inyección**
- ✅ Detección de scripts maliciosos
- ✅ Validación de patrones HTML peligrosos
- ✅ Filtrado de contenido sospechoso

### 5. **Validación de Formularios**
- ✅ Validación de campos requeridos
- ✅ Validación de longitud de campos
- ✅ Validación de formato de email
- ✅ Sanitización de datos de entrada

### 6. **Headers de Seguridad**
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Content-Security-Policy
- ✅ Referrer-Policy

### 7. **Logging de Seguridad**
- ✅ Registro de eventos sospechosos
- ✅ Tracking de intentos de ataque
- ✅ Estadísticas de seguridad
- ✅ Limpieza automática de logs antiguos

## 📁 Estructura de Archivos

```
security/
├── security.php              # Sistema principal de seguridad
├── contact_endpoint.php      # Endpoint para formulario de contacto
├── get_csrf_token.php        # Generador de tokens CSRF
├── advanced_security.php     # Funciones de seguridad avanzadas
├── .htaccess                 # Configuración de Apache
├── security_log.json         # Log de eventos de seguridad
└── rate_limit_*.json         # Archivos de rate limiting
```

## 🚀 Configuración

### 1. **Configurar Dominios Autorizados**
Edita `security.php` y actualiza el array `$allowedOrigins`:

```php
$this->allowedOrigins = [
    'localhost:5173',
    '127.0.0.1:5173',
    'tu-dominio.com',        // Cambia por tu dominio real
    'www.tu-dominio.com'     // Si usas www
];
```

### 2. **Configurar Rate Limiting**
Ajusta los límites en `security.php`:

```php
$this->rateLimit = [
    'max_requests' => 100,    // Máximo de peticiones
    'time_window' => 3600    // Ventana de tiempo en segundos
];
```

### 3. **Configurar EmailJS**
En `main.js`, reemplaza las credenciales:

```javascript
// Línea 4
emailjs.init("YOUR_PUBLIC_KEY")

// Líneas 307-308
'YOUR_SERVICE_ID',
'YOUR_TEMPLATE_ID',
```

## 🔧 Uso del Sistema

### **Flujo de Seguridad:**

1. **Cliente solicita token CSRF** → `get_csrf_token.php`
2. **Cliente envía formulario** → `contact_endpoint.php`
3. **Validaciones de seguridad:**
   - ✅ Origen autorizado
   - ✅ Rate limiting
   - ✅ Token CSRF válido
   - ✅ Integridad del formulario
   - ✅ Detección de inyección
4. **Si todo es válido** → Envío con EmailJS
5. **Si hay problemas** → Bloqueo y logging

### **Validaciones Implementadas:**

#### **Validación de Origen:**
```php
if (!$security->validateOrigin()) {
    // Bloquear petición
}
```

#### **Rate Limiting:**
```php
if (!$security->checkRateLimit($ip)) {
    // Bloquear por demasiadas peticiones
}
```

#### **Token CSRF:**
```php
if (!$security->validateCSRFToken($token)) {
    // Bloquear petición no autorizada
}
```

#### **Detección de Inyección:**
```php
if ($security->detectInjection($data)) {
    // Bloquear contenido malicioso
}
```

## 📊 Monitoreo de Seguridad

### **Logs de Seguridad:**
Los eventos se registran en `security/security_log.json`:

```json
{
    "timestamp": "2024-01-18 18:30:45",
    "event": "INJECTION_DETECTED",
    "data": "<script>alert('xss')</script>",
    "ip": "192.168.1.100",
    "user_agent": "Mozilla/5.0...",
    "referer": "https://example.com"
}
```

### **Eventos Registrados:**
- `INVALID_ORIGIN` - Origen no autorizado
- `RATE_LIMIT_EXCEEDED` - Límite de peticiones excedido
- `INVALID_CSRF_TOKEN` - Token CSRF inválido
- `INJECTION_DETECTED` - Contenido malicioso detectado
- `MISSING_FIELD` - Campo requerido faltante
- `INVALID_EMAIL` - Email inválido
- `INVALID_NAME_LENGTH` - Longitud de nombre inválida
- `INVALID_MESSAGE_LENGTH` - Longitud de mensaje inválida

## 🛠️ Mantenimiento

### **Limpieza Automática:**
- Los logs se limpian automáticamente después de 30 días
- Los archivos de rate limiting se limpian después de 1 hora
- Las sesiones expiran después de 1 hora

### **Monitoreo Manual:**
Puedes revisar los logs para detectar patrones de ataque:

```bash
# Ver logs de seguridad
cat security/security_log.json | jq '.[] | select(.event == "INJECTION_DETECTED")'

# Ver estadísticas
cat security/security_log.json | jq 'group_by(.event) | map({event: .[0].event, count: length})'
```

## 🔒 Protecciones Adicionales

### **Contra Manipulación de Código:**
1. **Validación del lado del servidor** - Todas las validaciones se hacen en PHP
2. **Tokens CSRF** - Previenen ataques de falsificación
3. **Rate limiting** - Previene ataques de fuerza bruta
4. **Detección de inyección** - Bloquea código malicioso
5. **Headers de seguridad** - Protegen contra varios tipos de ataques

### **Contra Ataques Comunes:**
- ✅ **XSS (Cross-Site Scripting)** - Filtrado de scripts
- ✅ **CSRF (Cross-Site Request Forgery)** - Tokens únicos
- ✅ **Clickjacking** - X-Frame-Options
- ✅ **MIME Sniffing** - X-Content-Type-Options
- ✅ **Rate Limiting** - Límite de peticiones
- ✅ **Injection Attacks** - Validación de patrones

## 🚨 Alertas de Seguridad

### **Configurar Notificaciones:**
Puedes agregar notificaciones por email cuando se detecten ataques:

```php
// En security.php, función logSecurityEvent()
if ($event === 'INJECTION_DETECTED') {
    mail('admin@tu-dominio.com', 'Alerta de Seguridad', 
         "Se detectó un intento de inyección desde IP: " . $ip);
}
```

## 📈 Estadísticas de Seguridad

El sistema genera estadísticas automáticamente:
- Total de peticiones
- Peticiones bloqueadas
- Intentos de CSRF
- Intentos de inyección
- Detecciones de bots
- Detecciones de proxies

## 🔧 Personalización

### **Agregar Nuevas Validaciones:**
```php
// En security.php
public function customValidation($data) {
    // Tu validación personalizada
    return true;
}
```

### **Modificar Patrones de Detección:**
```php
// En advanced_security.php
function detectSuspiciousPatterns($data) {
    $patterns = [
        '/tu-patron-personalizado/i'
    ];
    // ...
}
```

---

## ⚠️ **Importante**

1. **Configura tus dominios** en `$allowedOrigins`
2. **Configura EmailJS** con tus credenciales
3. **Monitorea los logs** regularmente
4. **Mantén el sistema actualizado**
5. **Prueba las validaciones** antes de producción

El sistema está diseñado para ser robusto y proteger tu portfolio contra la mayoría de ataques comunes. ¡Tu código está ahora mucho más seguro! 🛡️
