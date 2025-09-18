# 📧 Configuración EmailJS para cmg7775@gmail.com

## 🎯 **Tu Configuración Específica**

### **Email de Destino:**
- **Tu email**: `cmg7775@gmail.com`
- **Servicio recomendado**: Gmail
- **Configuración**: Ya actualizada en el código

## 🚀 **Pasos Rápidos para Gmail**

### **1. Crear Cuenta EmailJS:**
1. **Ve a**: https://www.emailjs.com/
2. **Regístrate** con `cmg7775@gmail.com`
3. **Verifica** tu cuenta por email

### **2. Configurar Gmail:**
1. **Ve a "Email Services"**
2. **Haz clic** en "Add New Service"
3. **Selecciona "Gmail"**
4. **Ingresa**: `cmg7775@gmail.com`
5. **Autoriza** el acceso a tu cuenta Gmail
6. **Copia** el Service ID (ej: `service_abc123`)

### **3. Crear Template:**
1. **Ve a "Email Templates"**
2. **Crea template** con este contenido:

```html
Subject: Nuevo mensaje desde tu Portfolio - {{subject}}

Hola Carolina,

Has recibido un nuevo mensaje desde tu portfolio:

Nombre: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Enviado desde tu portfolio web
Fecha: {{date}}
```

3. **Copia** el Template ID (ej: `template_xyz789`)

### **4. Obtener Public Key:**
1. **Ve a "Account" > "API Keys"**
2. **Copia** tu Public Key (ej: `user_abc123def456`)

## 💻 **Actualizar Código**

### **En main.js, busca:**
```javascript
// emailjs.init("YOUR_PUBLIC_KEY")
```

### **Reemplaza con:**
```javascript
emailjs.init("tu_public_key_aqui")
```

### **Busca EMAILJS_CONFIG y actualiza:**
```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'tu_public_key_aqui',        // Ej: 'user_abc123def456'
  SERVICE_ID: 'tu_service_id_aqui',        // Ej: 'service_abc123'
  TEMPLATE_ID: 'tu_template_id_aqui',      // Ej: 'template_xyz789'
  TO_EMAIL: 'cmg7775@gmail.com'           // Ya configurado ✅
}
```

## 🧪 **Probar**

### **1. Ejecutar servidor:**
```bash
npm run dev
```

### **2. Abrir portfolio:**
- Ve a `http://localhost:5173`

### **3. Probar formulario:**
- Haz clic en el enlace de email
- Llena el formulario
- Envía el mensaje
- Verifica tu email `cmg7775@gmail.com`

## 📊 **Límites Gmail**

### **Plan Gratuito EmailJS:**
- **200 emails/mes**
- **Suficiente** para tu portfolio

### **Gmail:**
- **Sin límites** de recepción
- **500 emails/día** de envío (más que suficiente)

## 🔒 **Seguridad Gmail**

### **Ventajas:**
- ✅ **Autenticación OAuth2** automática
- ✅ **Encriptación** SSL/TLS
- ✅ **Protección** contra spam
- ✅ **Filtros** automáticos

### **Configuración automática:**
- EmailJS maneja la autenticación
- No necesitas configurar SMTP
- Funciona inmediatamente

## 🚨 **Solución de Problemas**

### **No recibes emails:**
1. **Verifica** tu carpeta de spam
2. **Verifica** que el email es `cmg7775@gmail.com`
3. **Verifica** que el servicio Gmail está activo

### **Error de autenticación:**
1. **Reautoriza** el acceso a Gmail
2. **Verifica** que tu cuenta Gmail está activa
3. **Verifica** que no hay bloqueos de seguridad

### **Template no funciona:**
1. **Verifica** que el Template ID es correcto
2. **Verifica** que el template está publicado
3. **Verifica** que las variables están bien escritas

## ✅ **Checklist Final**

- [ ] Cuenta EmailJS creada con `cmg7775@gmail.com`
- [ ] Servicio Gmail configurado
- [ ] Template creado con el contenido proporcionado
- [ ] Public Key obtenida
- [ ] Service ID obtenido
- [ ] Template ID obtenido
- [ ] Código actualizado con las claves
- [ ] Prueba local exitosa
- [ ] Email recibido en `cmg7775@gmail.com`

## 🎉 **¡Listo!**

Una vez completados todos los pasos, recibirás todos los mensajes del formulario en `cmg7775@gmail.com`.

**Tiempo estimado: 10-15 minutos** ⏱️

---

**¿Necesitas ayuda con algún paso específico?** 🤔
