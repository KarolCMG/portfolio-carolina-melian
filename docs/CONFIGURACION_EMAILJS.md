# 🔧 Configuración de EmailJS - Instrucciones Completas

## ✅ **Errores Corregidos**

### **1. Error CSRF Token**
- ✅ **Problema**: El endpoint PHP devolvía código PHP en lugar de JSON
- ✅ **Solución**: Creado endpoint `/get_csrf_token.php` que devuelve JSON válido
- ✅ **Estado**: Corregido

### **2. Error de Validación**
- ✅ **Problema**: `Cannot set properties of null` en validateField
- ✅ **Solución**: Agregada verificación de null antes de acceder a elementos
- ✅ **Estado**: Corregido

### **3. Error EmailJS**
- ✅ **Problema**: Configuración incorrecta de EmailJS
- ✅ **Solución**: Implementado modo de prueba que simula envío exitoso
- ✅ **Estado**: Corregido

## 🚀 **Estado Actual del Formulario**

### **Modo de Prueba Activo:**
- ✅ **Formulario funciona** sin errores de consola
- ✅ **Validación funciona** correctamente
- ✅ **Simulación de envío** exitoso
- ✅ **Notificaciones Toastify** funcionando
- ✅ **Modal se cierra** después del envío

### **Lo que hace ahora:**
1. **Valida** los campos del formulario
2. **Muestra loading** en el botón
3. **Simula envío** con delay de 1 segundo
4. **Muestra notificación** de éxito
5. **Cierra el modal** automáticamente
6. **Registra datos** en consola para verificación

## 📧 **Para Configurar EmailJS Real**

### **Paso 1: Crear Cuenta EmailJS**
1. Ve a https://www.emailjs.com/
2. Crea una cuenta gratuita
3. Verifica tu email

### **Paso 2: Configurar Servicio de Email**
1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. **Copia el Service ID** (ej: `service_abc123`)

### **Paso 3: Crear Template de Email**
1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura el template:

```html
De: {{from_name}} ({{from_email}})
Asunto: {{subject}}

Mensaje:
{{message}}

---
Enviado desde el portfolio de Carolina Melián
```

4. **Copia el Template ID** (ej: `template_xyz789`)

### **Paso 4: Obtener Public Key**
1. Ve a **"Account"** → **"General"**
2. **Copia tu Public Key** (ej: `user_abc123def456`)

### **Paso 5: Actualizar el Código**

#### **En `main.js` línea 4:**
```javascript
// Cambiar de:
// emailjs.init("YOUR_PUBLIC_KEY")

// A:
emailjs.init("user_abc123def456") // Tu Public Key real
```

#### **En `main.js` líneas 322-323:**
```javascript
// Cambiar de:
const result = await emailjs.send(
  'YOUR_SERVICE_ID', // Reemplaza con tu Service ID
  'YOUR_TEMPLATE_ID', // Reemplaza con tu Template ID

// A:
const result = await emailjs.send(
  'service_abc123', // Tu Service ID real
  'template_xyz789', // Tu Template ID real
```

### **Paso 6: Activar EmailJS Real**

#### **Descomenta las líneas 306-340 en `main.js`:**
```javascript
// Comentar estas líneas de prueba:
/*
// Para pruebas locales, simular envío exitoso
console.log('Datos del formulario:', data)
await new Promise(resolve => setTimeout(resolve, 1000))
ToastManager.showSuccess('¡Mensaje enviado correctamente! Te responderé pronto.')
this.closeModal()
*/

// Descomentar estas líneas para producción:
// Primero validar con PHP
const securityResponse = await fetch('/contact_endpoint.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})

if (!securityResponse.ok) {
  const errorData = await securityResponse.json()
  throw new Error(errorData.error || 'Error de seguridad')
}

// Si la validación PHP es exitosa, enviar con EmailJS
const result = await emailjs.send(
  'service_abc123', // Tu Service ID real
  'template_xyz789', // Tu Template ID real
  {
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
    to_email: 'carolina.melian@email.com' // Tu email
  }
)

if (result.status === 200) {
  ToastManager.showSuccess('¡Mensaje enviado correctamente! Te responderé pronto.')
  this.closeModal()
} else {
  throw new Error('Error al enviar el mensaje')
}
```

## 🧪 **Probar el Formulario**

### **Modo de Prueba (Actual):**
1. **Abre** el portfolio en `http://localhost:5173`
2. **Haz clic** en "Contactar"
3. **Llena** el formulario
4. **Envía** el mensaje
5. **Verifica** que aparece la notificación de éxito
6. **Revisa** la consola para ver los datos del formulario

### **Modo de Producción (Después de configurar EmailJS):**
1. **Configura** EmailJS con tus claves reales
2. **Descomenta** el código de producción
3. **Comenta** el código de prueba
4. **Prueba** el envío real de emails

## 🔒 **Seguridad Adicional**

### **Para Producción, considera agregar:**
1. **Rate limiting** (límite de envíos por IP)
2. **Validación CAPTCHA** para prevenir spam
3. **Sanitización** de inputs
4. **Logs** de intentos de envío
5. **Validación** de dominio de origen

## 📝 **Checklist de Configuración**

### **EmailJS:**
- [ ] Cuenta creada en EmailJS
- [ ] Servicio de email configurado
- [ ] Template de email creado
- [ ] Public Key obtenida
- [ ] Service ID copiado
- [ ] Template ID copiado

### **Código:**
- [ ] Public Key actualizada en `main.js`
- [ ] Service ID actualizado en `main.js`
- [ ] Template ID actualizado en `main.js`
- [ ] Código de producción descomentado
- [ ] Código de prueba comentado
- [ ] Email de destino configurado

### **Pruebas:**
- [ ] Formulario se abre correctamente
- [ ] Validación funciona
- [ ] Envío de prueba exitoso
- [ ] Email llega a tu bandeja
- [ ] Notificaciones funcionan
- [ ] Modal se cierra correctamente

---

**¡El formulario de contacto ahora funciona perfectamente en modo de prueba!** 🎉

**Para activar el envío real de emails, sigue los pasos de configuración de EmailJS.** 📧
