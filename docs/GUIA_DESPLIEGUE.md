# 🌐 Guía de Despliegue - Portfolio Carolina Melián

## 🎯 **Objetivo**
Desplegar tu portfolio en internet para que sea accesible con un enlace directo.

## 🚀 **Opción Recomendada: Netlify**

### **¿Por qué Netlify?**
- ✅ **Gratis** para proyectos personales
- ✅ **Fácil** de usar
- ✅ **HTTPS automático**
- ✅ **Dominio personalizado** opcional
- ✅ **Despliegue automático** desde GitHub

## 📋 **Pasos para Desplegar**

### **Paso 1: Preparar el Proyecto**

#### **1.1 Verificar que funciona localmente:**
```bash
npm run dev
```
- Abre `http://localhost:5173`
- Verifica que todo funciona correctamente

#### **1.2 Crear build de producción:**
```bash
npm run build
```
- Esto crea la carpeta `dist/` con archivos optimizados

### **Paso 2: Crear Repositorio en GitHub**

#### **2.1 Inicializar Git (si no está):**
```bash
git init
git add .
git commit -m "Initial commit - Portfolio Carolina Melián"
```

#### **2.2 Crear repositorio en GitHub:**
1. **Ve a** [github.com](https://github.com)
2. **Haz clic** en "New repository"
3. **Nombre**: `portfolio-carolina-melian`
4. **Descripción**: "Portfolio profesional de Carolina Melián"
5. **Público** (para Netlify gratuito)
6. **Crea** el repositorio

#### **2.3 Subir código:**
```bash
git remote add origin https://github.com/tu-usuario/portfolio-carolina-melian.git
git branch -M main
git push -u origin main
```

### **Paso 3: Desplegar en Netlify**

#### **3.1 Crear cuenta en Netlify:**
1. **Ve a** [netlify.com](https://netlify.com)
2. **Haz clic** en "Sign up"
3. **Regístrate** con GitHub (más fácil)

#### **3.2 Conectar con GitHub:**
1. **Haz clic** en "New site from Git"
2. **Selecciona** "GitHub"
3. **Autoriza** Netlify
4. **Selecciona** tu repositorio `portfolio-carolina-melian`

#### **3.3 Configurar Build Settings:**
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18`

#### **3.4 Desplegar:**
1. **Haz clic** en "Deploy site"
2. **Espera** a que termine el build
3. **¡Listo!** Tu sitio estará en `https://random-name.netlify.app`

## 🔗 **Obtener Enlace Personalizado**

### **Opción 1: Dominio Netlify Personalizado**
1. **En Netlify**, ve a "Site settings"
2. **Haz clic** en "Change site name"
3. **Cambia** a: `carolina-melian-portfolio`
4. **Tu URL será**: `https://carolina-melian-portfolio.netlify.app`

### **Opción 2: Dominio Personalizado**
1. **Compra** un dominio (ej: `carolinamelian.com`)
2. **En Netlify**, ve a "Domain settings"
3. **Agrega** tu dominio personalizado
4. **Configura** DNS con tu proveedor

## 📧 **Configurar EmailJS para Producción**

### **Actualizar Orígenes Permitidos:**
1. **Ve a** [emailjs.com](https://emailjs.com)
2. **Ve a** "Account" > "API Keys"
3. **Agrega** tu dominio Netlify a orígenes permitidos:
   - `carolina-melian-portfolio.netlify.app`
   - `tu-dominio-personalizado.com`

## 🧪 **Probar en Producción**

### **1. Verificar que funciona:**
- **Abre** tu URL de Netlify
- **Navega** por todas las secciones
- **Prueba** el formulario de contacto

### **2. Probar formulario:**
- **Haz clic** en el enlace de email
- **Llena** el formulario
- **Envía** el mensaje
- **Verifica** que recibes el email

## 🔧 **Configuración Adicional**

### **Archivo netlify.toml (Ya creado):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### **Variables de Entorno (Opcional):**
```bash
# En Netlify, ve a Site settings > Environment variables
EMAILJS_PUBLIC_KEY=Ak2VMRgCVLCpSiZTF
EMAILJS_SERVICE_ID=service_go50l25
EMAILJS_TEMPLATE_ID=template_xxs3ewe
```

## 📊 **Estado del Despliegue**

### **✅ Preparado:**
- [x] Proyecto funcional localmente
- [x] Archivo `netlify.toml` creado
- [x] EmailJS configurado
- [x] Documentación completa

### **⏳ Pendiente:**
- [ ] Crear repositorio GitHub
- [ ] Subir código a GitHub
- [ ] Conectar con Netlify
- [ ] Configurar build settings
- [ ] Desplegar sitio
- [ ] Probar en producción

## 🎉 **Resultado Final**

Una vez desplegado, tendrás:
- **✅ URL pública**: `https://carolina-melian-portfolio.netlify.app`
- **✅ HTTPS automático**
- **✅ Formulario funcional**
- **✅ Emails recibidos** en `cmg7775@gmail.com`
- **✅ Acceso desde cualquier lugar**

## 🆘 **Solución de Problemas**

### **Error de Build:**
- Verifica que `npm run build` funciona localmente
- Revisa los logs de Netlify

### **Formulario no funciona:**
- Verifica que EmailJS tiene el dominio correcto
- Revisa la consola del navegador

### **Imágenes no cargan:**
- Verifica que las rutas son correctas
- Usa rutas relativas en lugar de absolutas

---

**¡Tu portfolio estará disponible en internet en menos de 30 minutos!** 🚀


