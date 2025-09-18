# 🚀 Portfolio API - Carolina Melián

API REST profesional para el portfolio de Carolina Melián, desarrolladora Full Stack.

## ✨ **Características**

- **✅ API REST** completa con Node.js + Express
- **✅ Base de datos** SQLite para persistencia
- **✅ Autenticación** JWT para endpoints protegidos
- **✅ Validaciones** robustas con express-validator
- **✅ Documentación** automática con Swagger
- **✅ Seguridad** con Helmet, CORS y Rate Limiting
- **✅ Manejo de errores** profesional
- **✅ Logging** y monitoreo

## 🛠️ **Tecnologías Utilizadas**

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **SQLite3** - Base de datos ligera
- **JWT** - Autenticación
- **Swagger** - Documentación API
- **Helmet** - Seguridad
- **CORS** - Control de acceso
- **Rate Limiting** - Protección contra spam

## 🚀 **Instalación y Uso**

### **1. Instalar dependencias**
```bash
cd api
npm install
```

### **2. Configurar variables de entorno**
```bash
cp env.example .env
# Editar .env con tus configuraciones
```

### **3. Ejecutar en desarrollo**
```bash
npm run dev
```

### **4. Ejecutar en producción**
```bash
npm start
```

## 📚 **Endpoints Disponibles**

### **Contacto**
- `POST /api/contact` - Enviar mensaje de contacto
- `GET /api/contact` - Obtener mensajes (requiere auth)
- `GET /api/contact/:id` - Obtener mensaje específico (requiere auth)
- `DELETE /api/contact/:id` - Eliminar mensaje (requiere auth)

### **Autenticación**
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/verify` - Verificar token

### **Sistema**
- `GET /api/health` - Estado de la API
- `GET /api-docs` - Documentación Swagger

## 🔐 **Autenticación**

### **Login**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### **Usar token**
```bash
curl -X GET http://localhost:3001/api/contact \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📖 **Documentación**

La documentación completa está disponible en:
- **Desarrollo**: http://localhost:3001/api-docs
- **Producción**: https://portfolio-api-carolina.vercel.app/api-docs

## 🧪 **Testing**

```bash
# Ejecutar tests
npm test

# Test de contacto
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Juan Pérez",
    "email":"juan@ejemplo.com",
    "subject":"Consulta sobre proyecto",
    "message":"Hola, me interesa trabajar contigo..."
  }'
```

## 🚀 **Despliegue**

### **Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

### **Heroku**
```bash
# Crear app
heroku create portfolio-api-carolina

# Desplegar
git push heroku main
```

## 📊 **Estructura del Proyecto**

```
api/
├── 📁 config/          # Configuración Swagger
├── 📁 database/        # Base de datos SQLite
├── 📁 middleware/      # Middlewares de auth
├── 📁 models/         # Modelos de datos
├── 📁 routes/         # Rutas de la API
├── 📄 server.js       # Servidor principal
├── 📄 package.json    # Dependencias
└── 📄 env.example     # Variables de entorno
```

## 🔒 **Seguridad**

- **Rate Limiting**: 100 requests por 15 minutos
- **CORS**: Configurado para dominios específicos
- **Helmet**: Headers de seguridad
- **JWT**: Autenticación segura
- **Validación**: Datos de entrada validados
- **Sanitización**: Prevención de inyecciones

## 📈 **Monitoreo**

- **Health Check**: `/api/health`
- **Logs**: Console logging configurado
- **Métricas**: Estadísticas de contactos

## 🤝 **Contribuir**

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 **Licencia**

MIT License - ver archivo LICENSE para detalles.

---

**Desarrollado por Carolina Melián**  
📧 Email: cmg7775@gmail.com  
🐙 GitHub: https://github.com/KarolCMG  
💼 LinkedIn: https://www.linkedin.com/in/carolina-melian-40a7332a8
