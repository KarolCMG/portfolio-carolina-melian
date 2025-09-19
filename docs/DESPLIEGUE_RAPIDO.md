# ⚡ Despliegue Rápido - Portfolio Carolina Melián

## 🎯 **Objetivo**
Tener tu portfolio disponible en internet con un enlace directo.

## 🚀 **Pasos Rápidos (30 minutos)**

### **1. Crear Repositorio GitHub (5 min)**
1. **Ve a** [github.com](https://github.com)
2. **"New repository"** → `portfolio-carolina-melian`
3. **Público** → **Create**

### **2. Subir Código (5 min)**
```bash
git init
git add .
git commit -m "Portfolio Carolina Melián"
git remote add origin https://github.com/tu-usuario/portfolio-carolina-melian.git
git push -u origin main
```

### **3. Desplegar en Netlify (10 min)**
1. **Ve a** [netlify.com](https://netlify.com)
2. **"New site from Git"** → **GitHub**
3. **Selecciona** tu repositorio
4. **Build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. **Deploy site**

### **4. Configurar Dominio (5 min)**
1. **Site settings** → **Change site name**
2. **Cambia** a: `carolina-melian-portfolio`
3. **Tu URL**: `https://carolina-melian-portfolio.netlify.app`

### **5. Configurar EmailJS (5 min)**
1. **Ve a** [emailjs.com](https://emailjs.com)
2. **Account** → **API Keys**
3. **Agrega** a orígenes: `carolina-melian-portfolio.netlify.app`

## ✅ **Resultado**
- **URL pública**: `https://carolina-melian-portfolio.netlify.app`
- **Formulario funcional**
- **Emails recibidos** en `cmg7775@gmail.com`

## 🧪 **Probar**
1. **Abre** tu URL de Netlify
2. **Prueba** el formulario de contacto
3. **Verifica** que recibes el email

---

**¡Tu portfolio estará en internet en 30 minutos!** 🚀


