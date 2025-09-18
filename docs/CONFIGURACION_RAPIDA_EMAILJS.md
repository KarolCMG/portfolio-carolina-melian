# 🔧 Configuración Rápida EmailJS

## 📋 **Checklist Rápido**

### **1. Crear Cuenta:**
- [ ] Ve a https://www.emailjs.com/
- [ ] Regístrate con tu email
- [ ] Verifica tu cuenta

### **2. Configurar Servicio:**
- [ ] Ve a "Email Services"
- [ ] Agrega tu servicio de email (Gmail/Outlook)
- [ ] Copia el Service ID

### **3. Crear Template:**
- [ ] Ve a "Email Templates"
- [ ] Crea template con este contenido:

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
```

- [ ] Copia el Template ID

### **4. Obtener Claves:**
- [ ] Ve a "Account" > "API Keys"
- [ ] Copia tu Public Key

## 💻 **Actualizar Código**

### **En main.js, busca esta línea:**
```javascript
// emailjs.init("YOUR_PUBLIC_KEY")
```

### **Reemplaza con tu Public Key:**
```javascript
emailjs.init("tu_public_key_aqui")
```

### **Busca EMAILJS_CONFIG y reemplaza:**
```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'tu_public_key_aqui',
  SERVICE_ID: 'tu_service_id_aqui',
  TEMPLATE_ID: 'tu_template_id_aqui',
  TO_EMAIL: 'tu_email@ejemplo.com'
}
```

## 🧪 **Probar**

1. **Ejecuta** `npm run dev`
2. **Abre** `http://localhost:5173`
3. **Haz clic** en el enlace de email
4. **Llena** el formulario
5. **Envía** el mensaje
6. **Verifica** tu email

## ✅ **¡Listo!**

Una vez configurado, recibirás emails reales desde tu portfolio.

**Tiempo estimado: 10-15 minutos** ⏱️
