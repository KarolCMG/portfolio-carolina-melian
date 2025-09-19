# 🚀 Despliegue Netlify - @KarolCMG

## ✅ **Preparación Completada**

- [x] **Git inicializado** y configurado
- [x] **Archivos agregados** al repositorio
- [x] **Commit inicial** realizado
- [x] **Remote origin** configurado para @KarolCMG
- [x] **Rama main** configurada

## 🎯 **Próximos Pasos**

### **Paso 1: Crear Repositorio en GitHub**

1. **Ve a** [github.com/KarolCMG](https://github.com/KarolCMG)
2. **Haz clic** en **"New repository"** (botón verde)
3. **Nombre del repositorio**: `portfolio-carolina-melian`
4. **Descripción**: `Portfolio profesional de Carolina Melián con EmailJS`
5. **Marca** como **Público** (necesario para Netlify gratuito)
6. **NO marques** "Add a README file" (ya tenemos uno)
7. **NO marques** "Add .gitignore" (ya tenemos uno)
8. **Haz clic** en **"Create repository"**

### **Paso 2: Subir Código a GitHub**

Después de crear el repositorio, ejecuta este comando:

```bash
git push -u origin main
```

### **Paso 3: Desplegar en Netlify**

1. **Ve a** [netlify.com](https://netlify.com)
2. **Haz clic** en **"Sign up"**
3. **Regístrate** con GitHub (más fácil)
4. **Haz clic** en **"New site from Git"**
5. **Selecciona** **"GitHub"**
6. **Autoriza** Netlify si es necesario
7. **Busca** tu repositorio `portfolio-carolina-melian`
8. **Haz clic** en el repositorio

### **Paso 4: Configurar Build Settings**

Netlify detectará automáticamente la configuración, pero verifica:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18` (automático)

### **Paso 5: Desplegar**

1. **Haz clic** en **"Deploy site"**
2. **Espera** a que termine el build (2-3 minutos)
3. **¡Listo!** Tu sitio estará en `https://random-name.netlify.app`

### **Paso 6: Personalizar URL**

1. **En Netlify**, ve a **"Site settings"**
2. **Haz clic** en **"Change site name"**
3. **Cambia** a: `carolina-melian-portfolio`
4. **Tu URL será**: `https://carolina-melian-portfolio.netlify.app`

## 📧 **Configurar EmailJS para Producción**

### **Agregar Dominio a EmailJS:**

1. **Ve a** [emailjs.com](https://emailjs.com)
2. **Inicia sesión** en tu cuenta
3. **Ve a** **"Account"** → **"API Keys"**
4. **En "Allowed Origins"**, agrega:
   - `carolina-melian-portfolio.netlify.app`
   - `https://carolina-melian-portfolio.netlify.app`

## 🧪 **Probar en Producción**

### **1. Verificar que funciona:**
- **Abre** `https://carolina-melian-portfolio.netlify.app`
- **Navega** por todas las secciones
- **Verifica** que las animaciones funcionan

### **2. Probar formulario:**
- **Haz clic** en el enlace de email
- **Llena** el formulario:
  - **Nombre**: Tu nombre
  - **Email**: `cmg7775@gmail.com`
  - **Asunto**: Prueba desde Netlify
  - **Mensaje**: Este es un mensaje de prueba desde producción
- **Envía** el mensaje
- **Verifica** que recibes el email

## ✅ **Resultado Final**

Una vez completado, tendrás:

- **✅ URL pública**: `https://carolina-melian-portfolio.netlify.app`
- **✅ HTTPS automático**
- **✅ Formulario funcional**
- **✅ Emails recibidos** en `cmg7775@gmail.com`
- **✅ Acceso desde cualquier lugar**

## 🆘 **Solución de Problemas**

### **Error de Build:**
- Verifica que `npm run build` funciona localmente
- Revisa los logs de Netlify en la pestaña "Deploys"

### **Formulario no funciona:**
- Verifica que EmailJS tiene el dominio correcto
- Revisa la consola del navegador (F12)

### **Imágenes no cargan:**
- Verifica que las rutas son correctas
- Usa rutas relativas en lugar de absolutas

---

**¡Tu portfolio estará en internet en menos de 15 minutos!** 🚀


