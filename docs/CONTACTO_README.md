# Portfolio de Carolina Melián - Sistema de Contacto

## 🚀 Características Implementadas

### ✨ Sistema de Contacto Completo
- **Modal de contacto** que se abre al hacer clic en el enlace de email
- **Formulario validado** con validaciones en tiempo real
- **Integración con EmailJS** para envío de emails
- **Notificaciones Toastify** para confirmaciones y errores
- **Diseño responsivo** que se adapta a todos los dispositivos

### 📧 Configuración de EmailJS

Para que el sistema de contacto funcione, necesitas configurar EmailJS:

#### 1. Crear cuenta en EmailJS
- Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
- Crea una cuenta gratuita
- Verifica tu email

#### 2. Configurar el servicio de email
- Ve a "Email Services" en tu dashboard
- Conecta tu proveedor de email (Gmail, Outlook, etc.)
- Copia el **Service ID**

#### 3. Crear template de email
- Ve a "Email Templates"
- Crea un nuevo template con este contenido:

```
Asunto: {{subject}}
De: {{from_name}} ({{from_email}})

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el portfolio de Carolina Melián
```

- Copia el **Template ID**

#### 4. Obtener Public Key
- Ve a "Account" > "General"
- Copia tu **Public Key**

#### 5. Configurar en el código
Edita el archivo `src/main.js` y reemplaza:

```javascript
// Línea 4
emailjs.init("YOUR_PUBLIC_KEY") // Reemplaza con tu Public Key

// Líneas 270-271
'YOUR_SERVICE_ID', // Reemplaza con tu Service ID
'YOUR_TEMPLATE_ID', // Reemplaza con tu Template ID
```

### 🎨 Características del Formulario

#### Validaciones Implementadas
- **Nombre**: Mínimo 2 caracteres
- **Email**: Formato de email válido
- **Mensaje**: Mínimo 10 caracteres
- **Validación en tiempo real**: Los errores se muestran al salir del campo
- **Validación al enviar**: Verificación completa antes del envío

#### Notificaciones Toastify
- **Éxito**: Mensaje verde con icono de check
- **Error**: Mensaje rojo con icono de exclamación
- **Auto-dismiss**: Se ocultan automáticamente después de 4 segundos
- **Animaciones suaves**: Entrada y salida con transiciones

#### Funcionalidades del Modal
- **Apertura**: Al hacer clic en el enlace de email
- **Cierre**: Botón X, botón Cancelar, o clic fuera del modal
- **Focus automático**: En el primer campo al abrir
- **Limpieza**: El formulario se resetea al cerrar
- **Responsive**: Se adapta perfectamente a móviles

### 🛠 Tecnologías Utilizadas

- **EmailJS**: Para envío de emails sin backend
- **Vanilla JavaScript**: Para toda la lógica del formulario
- **CSS3**: Para estilos modernos y animaciones
- **Font Awesome**: Para iconos
- **Validaciones personalizadas**: Sin dependencias externas

### 📱 Diseño Responsivo

El formulario se adapta perfectamente a:
- **Desktop**: Modal centrado con ancho máximo
- **Tablet**: Modal adaptado con márgenes
- **Móvil**: Modal de pantalla completa con botones apilados

### 🔧 Personalización

Puedes personalizar fácilmente:
- **Colores**: Modifica las variables CSS en `:root`
- **Mensajes**: Cambia los textos en las clases `ToastManager` y `FormValidator`
- **Validaciones**: Ajusta las reglas en `FormValidator`
- **Estilos**: Modifica los estilos del modal en CSS

### 🚀 Próximos Pasos

1. Configura EmailJS con tus credenciales
2. Prueba el formulario de contacto
3. Personaliza los mensajes según tus necesidades
4. ¡Tu portfolio está listo para recibir mensajes!

---

**Nota**: El sistema está completamente funcional y listo para usar una vez configurado EmailJS.
