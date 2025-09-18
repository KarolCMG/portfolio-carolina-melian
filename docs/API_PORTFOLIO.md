# 🚀 API del Portfolio - Carolina Melián

## 📋 **Resumen**

He creado una **API REST profesional** completa para tu portfolio que demuestra tus habilidades full stack. Esta API incluye:

### **✅ Características Implementadas:**

1. **🔧 API REST Completa**
   - Node.js + Express
   - Base de datos SQLite
   - Autenticación JWT
   - Documentación Swagger

2. **📧 Sistema de Contacto**
   - Envío de mensajes
   - Validaciones robustas
   - Almacenamiento en BD
   - Rate limiting

3. **🔐 Seguridad**
   - Helmet para headers de seguridad
   - CORS configurado
   - Rate limiting (100 req/15min)
   - Validación de datos

4. **📚 Documentación**
   - Swagger UI automático
   - Endpoints documentados
   - Ejemplos de uso

---

## 🛠️ **Estructura Creada:**

```
mi_portfolio/
├── 📁 api/                    # 🆕 API REST
│   ├── 📁 config/             # Configuración Swagger
│   ├── 📁 database/           # Base de datos SQLite
│   ├── 📁 middleware/         # Middlewares de auth
│   ├── 📁 models/            # Modelos de datos
│   ├── 📁 routes/            # Rutas de la API
│   ├── 📄 server.js          # Servidor principal
│   ├── 📄 package.json       # Dependencias
│   ├── 📄 README.md          # Documentación
│   └── 📄 test-api.js        # Script de pruebas
├── 📄 vercel.json            # 🆕 Configuración Vercel
└── 📄 src/api-config.js      # 🆕 Configuración frontend
```

---

## 🚀 **Endpoints Disponibles:**

### **📧 Contacto**
- `POST /api/contact` - Enviar mensaje
- `GET /api/contact` - Obtener mensajes (auth)
- `GET /api/contact/:id` - Mensaje específico (auth)
- `DELETE /api/contact/:id` - Eliminar mensaje (auth)

### **🔐 Autenticación**
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/verify` - Verificar token

### **🏥 Sistema**
- `GET /api/health` - Estado de la API
- `GET /api-docs` - Documentación Swagger

---

## 🧪 **Cómo Probar la API:**

### **1. Ejecutar en desarrollo:**
```bash
cd api
npm run dev
```

### **2. Probar endpoints:**
```bash
# Health check
curl http://localhost:3001/api/health

# Enviar mensaje
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@test.com","subject":"Test","message":"Hola"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### **3. Ver documentación:**
- **Swagger UI**: http://localhost:3001/api-docs

---

## 🚀 **Despliegue:**

### **Vercel (Recomendado):**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

### **URLs de Despliegue:**
- **API**: `https://portfolio-api-carolina.vercel.app`
- **Docs**: `https://portfolio-api-carolina.vercel.app/api-docs`

---

## 🔗 **Integración con tu Portfolio:**

### **1. Configuración Frontend:**
He creado `src/api-config.js` que puedes usar para integrar la API con tu portfolio.

### **2. Ejemplo de Uso:**
```javascript
// En tu main.js
import { PortfolioAPI } from './api-config.js';

// Enviar mensaje de contacto
const response = await PortfolioAPI.sendContact({
  name: 'Juan',
  email: 'juan@test.com',
  subject: 'Consulta',
  message: 'Hola...'
});
```

---

## 📊 **Beneficios para tu Portfolio:**

### **✅ Demuestra Habilidades:**
- **Backend**: Node.js, Express, SQLite
- **APIs**: REST, JWT, Swagger
- **Seguridad**: Helmet, CORS, Rate Limiting
- **Base de Datos**: SQLite, CRUD operations
- **Documentación**: Swagger UI automático

### **✅ Profesional:**
- **Código limpio** y bien estructurado
- **Validaciones** robustas
- **Manejo de errores** profesional
- **Documentación** completa
- **Testing** incluido

### **✅ Escalable:**
- **Arquitectura modular**
- **Middleware** reutilizable
- **Configuración** por entornos
- **Base de datos** preparada para crecimiento

---

## 🎯 **Próximos Pasos:**

1. **✅ Probar la API** localmente
2. **✅ Desplegar en Vercel**
3. **✅ Integrar con tu portfolio**
4. **✅ Añadir a tu GitHub**
5. **✅ Incluir en tu CV**

---

## 📝 **Para tu CV/LinkedIn:**

**"Desarrollé una API REST completa con Node.js y Express que incluye:**
- **Sistema de contacto** con validaciones y base de datos
- **Autenticación JWT** para endpoints protegidos  
- **Documentación automática** con Swagger
- **Seguridad robusta** con Helmet, CORS y Rate Limiting
- **Despliegue en Vercel** con configuración de producción"

**¡Esto demuestra habilidades full stack reales!** 🚀
