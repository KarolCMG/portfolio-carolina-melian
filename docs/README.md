# 📚 Documentación del Portfolio - Carolina Melián

## 🎯 **Descripción del Proyecto**

Portfolio profesional desarrollado con **HTML5**, **CSS3**, **JavaScript** y **Vite**, integrado con **EmailJS** para el formulario de contacto.

## 📋 **Características Principales**

- ✅ **Diseño Responsivo** - Adaptable a todos los dispositivos
- ✅ **Formulario de Contacto** - Integrado con EmailJS
- ✅ **Validación en Tiempo Real** - Campos con validación instantánea
- ✅ **Notificaciones Toastify** - Feedback visual para el usuario
- ✅ **Animaciones CSS** - Elementos dinámicos y atractivos
- ✅ **Seguridad PHP** - Validación backend opcional
- ✅ **Avatar Animado** - Imagen personalizada con efectos

## 🚀 **Tecnologías Utilizadas**

### **Frontend:**
- **HTML5** - Estructura semántica
- **CSS3** - Estilos y animaciones
- **JavaScript ES6+** - Funcionalidad interactiva
- **Vite** - Herramienta de desarrollo

### **Integraciones:**
- **EmailJS** - Envío de emails desde el frontend
- **Toastify** - Notificaciones elegantes
- **Font Awesome** - Iconografía
- **Google Fonts** - Tipografía (Inter)

### **Backend (Opcional):**
- **PHP** - Validación y seguridad
- **CSRF Protection** - Protección contra ataques
- **Rate Limiting** - Control de envíos

## 📁 **Estructura del Proyecto**

```
mi_portfolio/
├── docs/                           # 📚 Documentación
│   ├── README.md                   # Este archivo
│   ├── EMAILJS_CONFIGURADO.md      # Configuración EmailJS
│   ├── GUIA_PASO_A_PASO_EMAILJS.md # Guía detallada EmailJS
│   └── RESUMEN_CLAVES_EMAILJS.md  # Resumen de claves
├── src/
│   ├── main.js                     # Lógica principal
│   ├── style.css                   # Estilos CSS
│   └── emailjs-config.js           # Configuración EmailJS
├── public/
│   ├── carolina-avatar-animated.svg # Avatar animado
│   ├── get_csrf_token.php          # Endpoint CSRF (desarrollo)
│   └── contact_endpoint.php        # Endpoint contacto (desarrollo)
├── security/                       # Sistema de seguridad PHP
│   ├── security.php                # Clase principal de seguridad
│   ├── contact_endpoint.php        # Endpoint de contacto
│   ├── get_csrf_token.php          # Generador de tokens CSRF
│   ├── advanced_security.php       # Funciones avanzadas
│   └── .htaccess                   # Configuración Apache
├── index.html                      # Página principal
├── package.json                    # Dependencias npm
└── package-lock.json              # Lock de dependencias
```

## 🛠️ **Instalación y Configuración**

### **1. Instalar Dependencias:**
```bash
npm install
```

### **2. Ejecutar en Desarrollo:**
```bash
npm run dev
```

### **3. Configurar EmailJS:**
Ver [EMAILJS_CONFIGURADO.md](./EMAILJS_CONFIGURADO.md) para la configuración completa.

## 📖 **Guías de Documentación**

### **📧 EmailJS:**
- **[EMAILJS_CONFIGURADO.md](./EMAILJS_CONFIGURADO.md)** - Estado actual de la configuración
- **[GUIA_PASO_A_PASO_EMAILJS.md](./GUIA_PASO_A_PASO_EMAILJS.md)** - Guía detallada paso a paso
- **[RESUMEN_CLAVES_EMAILJS.md](./RESUMEN_CLAVES_EMAILJS.md)** - Resumen rápido de claves

## 🔧 **Configuración Actual**

### **EmailJS:**
- **Public Key**: `Ak2VMRgCVLCpSiZTF`
- **Service ID**: `service_go50l25`
- **Template ID**: `template_xxs3ewe`
- **Email Destino**: `cmg7775@gmail.com`

### **Servidor de Desarrollo:**
- **URL**: `http://localhost:5173`
- **Comando**: `npm run dev`

## 🧪 **Pruebas**

### **Formulario de Contacto:**
1. **Abrir** `http://localhost:5173`
2. **Hacer clic** en el enlace de email
3. **Llenar** el formulario
4. **Enviar** el mensaje
5. **Verificar** email en `cmg7775@gmail.com`

## 🎨 **Características de Diseño**

### **Colores:**
- **Primario**: `#6366f1` (Indigo)
- **Secundario**: `#ec4899` (Pink)
- **Acento**: `#06b6d4` (Cyan)
- **Éxito**: `#10b981` (Emerald)

### **Tipografía:**
- **Fuente Principal**: Inter (Google Fonts)
- **Fuente Código**: Courier New

### **Animaciones:**
- **Floating Elements** - Elementos flotantes con código
- **Pulse Badge** - Badge "Coding" con pulso
- **Image Glow** - Efectos de brillo en la imagen
- **Smooth Transitions** - Transiciones suaves

## 🔒 **Seguridad**

### **Implementada:**
- **CSRF Protection** - Tokens de seguridad
- **Rate Limiting** - Control de envíos
- **Input Sanitization** - Limpieza de datos
- **Origin Validation** - Validación de origen

### **Archivos de Seguridad:**
- `security/security.php` - Clase principal
- `security/contact_endpoint.php` - Endpoint de contacto
- `security/get_csrf_token.php` - Generador de tokens

## 📊 **Estado del Proyecto**

### **✅ Completado:**
- [x] Estructura HTML/CSS
- [x] Funcionalidad JavaScript
- [x] Formulario de contacto
- [x] Integración EmailJS
- [x] Validación en tiempo real
- [x] Notificaciones Toastify
- [x] Animaciones CSS
- [x] Avatar animado
- [x] Sistema de seguridad PHP
- [x] Documentación completa

### **🔄 En Progreso:**
- [ ] Pruebas de envío de email

### **📋 Pendiente:**
- [ ] Optimizaciones de rendimiento
- [ ] Pruebas en diferentes navegadores
- [ ] Despliegue en producción

## 👨‍💻 **Desarrolladora**

**Carolina Melián**
- **Email**: cmg7775@gmail.com
- **GitHub**: [@KarolCMG](https://github.com/KarolCMG)
- **LinkedIn**: [Carolina Melián](https://www.linkedin.com/in/carolina-melian-40a7332a8)

## 📝 **Notas de Desarrollo**

### **Última Actualización:**
- **Fecha**: 18 de Septiembre, 2025
- **Versión**: 1.0.0
- **Estado**: Funcional con EmailJS configurado

### **Próximas Mejoras:**
- Implementar más animaciones
- Optimizar imágenes
- Agregar más proyectos
- Mejorar SEO

---

**¡Portfolio completamente funcional y listo para usar!** 🚀


