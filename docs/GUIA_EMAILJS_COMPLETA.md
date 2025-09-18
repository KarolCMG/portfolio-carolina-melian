# 📧 Configuración Completa de EmailJS - Guía Paso a Paso

## 🎯 **Objetivo**
Configurar EmailJS para que recibas emails reales desde el formulario de contacto de tu portfolio.

## 📋 **Paso 1: Crear Cuenta en EmailJS**

### **1.1 Registro:**
1. **Ve a**: https://www.emailjs.com/
2. **Haz clic** en "Sign Up"
3. **Regístrate** con tu email (es gratis)
4. **Verifica** tu cuenta por email

### **1.2 Iniciar Sesión:**
1. **Inicia sesión** en tu cuenta
2. **Ve al Dashboard** principal

## 🔧 **Paso 2: Configurar Servicio de Email**

### **2.1 Agregar Servicio:**
1. **Ve a "Email Services"** en el menú lateral
2. **Haz clic** en "Add New Service"
3. **Selecciona** tu proveedor de email:
   - **Gmail** (recomendado)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Otro proveedor**

### **2.2 Configurar Gmail (Recomendado):**
1. **Selecciona "Gmail"**
2. **Ingresa** tu email de Gmail
3. **Autoriza** el acceso a tu cuenta
4. **Guarda** el Service ID que aparece

### **2.3 Configurar Outlook:**
1. **Selecciona "Outlook"**
2. **Ingresa** tu email de Outlook
3. **Autoriza** el acceso
4. **Guarda** el Service ID

## 📝 **Paso 3: Crear Template de Email**

### **3.1 Crear Template:**
1. **Ve a "Email Templates"** en el menú lateral
2. **Haz clic** en "Create New Template"
3. **Usa** este contenido:

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

### **3.2 Configurar Variables:**
- **{{from_name}}** - Nombre del remitente
- **{{from_email}}** - Email del remitente
- **{{subject}}** - Asunto del mensaje
- **{{message}}** - Contenido del mensaje
- **{{date}}** - Fecha actual (opcional)

### **3.3 Guardar Template:**
1. **Guarda** el template
2. **Copia** el Template ID que aparece

## 🔑 **Paso 4: Obtener Claves**

### **4.1 Public Key:**
1. **Ve a "Account"** en el menú lateral
2. **Haz clic** en "API Keys"
3. **Copia** tu Public Key

### **4.2 Service ID:**
1. **Ve a "Email Services"**
2. **Copia** el Service ID del servicio que creaste

### **4.3 Template ID:**
1. **Ve a "Email Templates"**
2. **Copia** el Template ID del template que creaste

## 💻 **Paso 5: Configurar el Código**

### **5.1 Actualizar main.js:**
1. **Abre** `mi_portfolio/src/main.js`
2. **Busca** la línea:
   ```javascript
   // emailjs.init("YOUR_PUBLIC_KEY")
   ```
3. **Reemplaza** con tu Public Key:
   ```javascript
   emailjs.init("tu_public_key_aqui")
   ```

### **5.2 Actualizar Configuración:**
1. **Busca** la sección `EMAILJS_CONFIG`
2. **Reemplaza** los valores:
   ```javascript
   const EMAILJS_CONFIG = {
     PUBLIC_KEY: 'tu_public_key_aqui',
     SERVICE_ID: 'tu_service_id_aqui',
     TEMPLATE_ID: 'tu_template_id_aqui',
     TO_EMAIL: 'tu_email@ejemplo.com'
   }
   ```

## 🧪 **Paso 6: Probar**

### **6.1 Probar Localmente:**
1. **Ejecuta** `npm run dev`
2. **Abre** `http://localhost:5173`
3. **Haz clic** en el enlace de email
4. **Llena** el formulario
5. **Envía** el mensaje
6. **Verifica** que recibes el email

### **6.2 Verificar Logs:**
En la consola del navegador deberías ver:
```
Enviando email real con EmailJS...
Email enviado exitosamente: {status: 200, ...}
```

## 🔒 **Paso 7: Seguridad (Opcional)**

### **7.1 Configurar PHP:**
1. **Abre** `mi_portfolio/security/security.php`
2. **Actualiza** `allowedOrigins`:
   ```php
   $this->allowedOrigins = [
       'localhost:5173',
       'tu-dominio.com' // Cambia por tu dominio real
   ];
   ```

### **7.2 Subir a Servidor:**
1. **Sube** todos los archivos a tu servidor
2. **Configura** PHP si es necesario
3. **Actualiza** las URLs en el código

## 📊 **Límites de EmailJS**

### **Plan Gratuito:**
- **200 emails/mes**
- **Suficiente** para un portfolio personal

### **Plan de Pago:**
- **Más emails/mes**
- **Soporte prioritario**
- **Funciones avanzadas**

## 🚨 **Solución de Problemas**

### **Error: "EmailJS not initialized"**
- **Verifica** que descomentaste `emailjs.init()`
- **Verifica** que la Public Key es correcta

### **Error: "Service not found"**
- **Verifica** que el Service ID es correcto
- **Verifica** que el servicio está activo

### **Error: "Template not found"**
- **Verifica** que el Template ID es correcto
- **Verifica** que el template está publicado

### **No recibes emails:**
- **Verifica** tu carpeta de spam
- **Verifica** que el email de destino es correcto
- **Verifica** que el servicio de email está configurado

## ✅ **Checklist Final**

- [ ] Cuenta EmailJS creada
- [ ] Servicio de email configurado
- [ ] Template de email creado
- [ ] Public Key obtenida
- [ ] Service ID obtenido
- [ ] Template ID obtenido
- [ ] Código actualizado con las claves
- [ ] Prueba local exitosa
- [ ] Email recibido correctamente

## 🎉 **¡Listo!**

Una vez completados todos los pasos, tu formulario de contacto enviará emails reales a tu bandeja de entrada.

**¡Tu portfolio estará completamente funcional!** 🚀
