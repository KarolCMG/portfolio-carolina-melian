// Configuración EmailJS - Reemplaza con tus claves reales
// Para obtener estas claves, ve a https://www.emailjs.com/

export const EMAILJS_CONFIG = {
  // Clave pública de EmailJS (Account > API Keys)
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
  
  // ID del servicio de email (Email Services)
  SERVICE_ID: 'YOUR_SERVICE_ID',
  
  // ID del template de email (Email Templates)
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
  
  // Tu email de destino
  TO_EMAIL: 'cmg7775@gmail.com'
}

// Instrucciones para configurar:
// 1. Ve a https://www.emailjs.com/ y crea una cuenta
// 2. Configura tu servicio de email (Gmail, Outlook, etc.)
// 3. Crea un template de email
// 4. Obtén las claves y reemplaza los valores arriba
// 5. Descomenta la línea de inicialización en main.js:
//    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)