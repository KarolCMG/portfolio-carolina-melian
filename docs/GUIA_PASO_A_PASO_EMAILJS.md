# 🚀 Guía Paso a Paso - Configurar EmailJS para cmg7775@gmail.com

## 📋 **Paso 1: Crear Cuenta en EmailJS**

### **1.1 Ir al sitio web:**
1. **Abre tu navegador**
2. **Ve a**: https://www.emailjs.com/
3. **Haz clic** en el botón **"Sign Up"** (azul, arriba a la derecha)

### **1.2 Registrarse:**
1. **Ingresa tu email**: `cmg7775@gmail.com`
2. **Crea una contraseña** (puede ser la misma de Gmail)
3. **Haz clic** en **"Sign Up"**
4. **Verifica tu email** - Revisa tu bandeja de entrada de Gmail

### **1.3 Iniciar sesión:**
1. **Después de verificar**, vuelve a https://www.emailjs.com/
2. **Haz clic** en **"Sign In"**
3. **Ingresa** tu email y contraseña
4. **Haz clic** en **"Sign In"**

---

## 🔧 **Paso 2: Configurar Servicio de Email**

### **2.1 Ir a Email Services:**
1. **En el dashboard** de EmailJS
2. **Haz clic** en **"Email Services"** en el menú lateral izquierdo
3. **Haz clic** en el botón **"Add New Service"** (azul)

### **2.2 Seleccionar Gmail:**
1. **Selecciona** el icono de **Gmail** (icono rojo con "G")
2. **Haz clic** en **"Connect Account"**

### **2.3 Autorizar Gmail:**
1. **Se abrirá** una ventana de Google
2. **Selecciona** tu cuenta `cmg7775@gmail.com`
3. **Haz clic** en **"Allow"** para autorizar el acceso
4. **Cierra** la ventana de Google

### **2.4 Guardar Service ID:**
1. **Verás** una pantalla con el Service ID
2. **Copia** el Service ID (ejemplo: `service_abc123def`)
3. **Haz clic** en **"Save"**

---

## 📝 **Paso 3: Crear Template de Email**

### **3.1 Ir a Email Templates:**
1. **En el menú lateral**, haz clic en **"Email Templates"**
2. **Haz clic** en **"Create New Template"** (botón azul)

### **3.2 Configurar el Template:**
1. **Template Name**: `Portfolio Contact Form`
2. **Subject**: `Nuevo mensaje desde tu Portfolio - {{subject}}`

### **3.3 Contenido del Template:**
**Copia y pega** este contenido en el campo de texto:

```html
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

### **3.4 Guardar Template:**
1. **Haz clic** en **"Save"**
2. **Copia** el Template ID (ejemplo: `template_xyz789`)

---

## 🔑 **Paso 4: Obtener Public Key**

### **4.1 Ir a API Keys:**
1. **En el menú lateral**, haz clic en **"Account"**
2. **Haz clic** en **"API Keys"**

### **4.2 Copiar Public Key:**
1. **Verás** tu Public Key
2. **Copia** la Public Key (ejemplo: `user_abc123def456`)

---

## 💻 **Paso 5: Actualizar el Código**

### **5.1 Abrir main.js:**
1. **Abre** el archivo `mi_portfolio/src/main.js`
2. **Busca** la línea que dice: `// emailjs.init("YOUR_PUBLIC_KEY")`

### **5.2 Activar EmailJS:**
**Reemplaza** esta línea:
```javascript
// emailjs.init("YOUR_PUBLIC_KEY")
```

**Con** (usando tu Public Key real):
```javascript
emailjs.init("tu_public_key_aqui")
```

### **5.3 Actualizar Configuración:**
**Busca** la sección `EMAILJS_CONFIG` y **reemplaza** los valores:

```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'tu_public_key_aqui',        // Tu Public Key real
  SERVICE_ID: 'tu_service_id_aqui',        // Tu Service ID real
  TEMPLATE_ID: 'tu_template_id_aqui',      // Tu Template ID real
  TO_EMAIL: 'cmg7775@gmail.com'           // Ya está correcto ✅
}
```

---

## 🧪 **Paso 6: Probar**

### **6.1 Ejecutar el servidor:**
1. **Abre** PowerShell
2. **Navega** al directorio: `cd "C:\Users\Carolina Melián\OneDrive\Escritorio\Portfolio\mi_portfolio"`
3. **Ejecuta**: `npm run dev`

### **6.2 Probar el formulario:**
1. **Abre** `http://localhost:5173`
2. **Haz clic** en el enlace de email (icono de sobre)
3. **Llena** el formulario:
   - **Nombre**: Tu nombre
   - **Email**: `cmg7775@gmail.com`
   - **Asunto**: Prueba
   - **Mensaje**: Este es un mensaje de prueba
4. **Haz clic** en **"Enviar Mensaje"**

### **6.3 Verificar el email:**
1. **Revisa** tu bandeja de entrada de Gmail
2. **Busca** el email con asunto "Nuevo mensaje desde tu Portfolio - Prueba"
3. **Verifica** que el contenido es correcto

---

## ✅ **Checklist de Verificación**

### **EmailJS:**
- [ ] Cuenta creada con `cmg7775@gmail.com`
- [ ] Servicio Gmail configurado
- [ ] Template creado con el contenido correcto
- [ ] Public Key copiada
- [ ] Service ID copiado
- [ ] Template ID copiado

### **Código:**
- [ ] `emailjs.init()` descomentado con Public Key real
- [ ] `EMAILJS_CONFIG` actualizado con claves reales
- [ ] `TO_EMAIL` configurado como `cmg7775@gmail.com`

### **Prueba:**
- [ ] Servidor ejecutándose (`npm run dev`)
- [ ] Portfolio cargando en `http://localhost:5173`
- [ ] Formulario se abre al hacer clic en email
- [ ] Formulario se envía sin errores
- [ ] Email recibido en `cmg7775@gmail.com`

---

## 🚨 **Solución de Problemas**

### **Error: "EmailJS not initialized"**
- **Verifica** que descomentaste `emailjs.init()`
- **Verifica** que la Public Key es correcta

### **Error: "Service not found"**
- **Verifica** que el Service ID es correcto
- **Verifica** que el servicio Gmail está activo

### **Error: "Template not found"**
- **Verifica** que el Template ID es correcto
- **Verifica** que el template está guardado

### **No recibes emails:**
- **Revisa** tu carpeta de spam
- **Verifica** que el email de destino es `cmg7775@gmail.com`
- **Verifica** que el servicio Gmail está configurado

---

## 🎉 **¡Listo!**

Una vez completados todos los pasos, tu formulario de contacto enviará emails reales a `cmg7775@gmail.com`.

**¿Necesitas ayuda con algún paso específico?** 🤔
