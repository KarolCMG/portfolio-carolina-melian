# 🗄️ Base de Datos del Portfolio API

Esta carpeta contiene todos los archivos relacionados con la configuración y modelos de la base de datos SQLite.

## 📁 **Archivos Incluidos:**

### **`init.js`**
- Configuración inicial de la base de datos
- Creación de tablas: `contacts`, `users`, `security_logs`
- Funciones para inicializar y cerrar conexiones

### **`ContactModel.js`**
- Modelo para gestionar mensajes de contacto
- Operaciones CRUD completas
- Paginación y filtros

### **`UserModel.js`**
- Modelo para gestión de usuarios
- Autenticación con bcrypt
- Roles y permisos

### **`SecurityLogModel.js`**
- Modelo para logs de seguridad
- Tracking de eventos sospechosos
- Limpieza automática de logs antiguos

## 🚀 **Uso:**

```javascript
const { initDatabase } = require('./database/init');
const ContactModel = require('./database/ContactModel');

// Inicializar base de datos
await initDatabase();

// Usar modelos
const contactModel = new ContactModel();
const newContact = await contactModel.create(contactData);
```

## 📊 **Estructura de Tablas:**

### **contacts**
- `id` (INTEGER PRIMARY KEY)
- `name` (TEXT NOT NULL)
- `email` (TEXT NOT NULL)
- `subject` (TEXT)
- `message` (TEXT NOT NULL)
- `created_at` (DATETIME)
- `ip_address` (TEXT)
- `user_agent` (TEXT)

### **users**
- `id` (INTEGER PRIMARY KEY)
- `username` (TEXT UNIQUE)
- `password_hash` (TEXT NOT NULL)
- `email` (TEXT UNIQUE)
- `role` (TEXT DEFAULT 'user')
- `created_at` (DATETIME)
- `last_login` (DATETIME)

### **security_logs**
- `id` (INTEGER PRIMARY KEY)
- `event_type` (TEXT NOT NULL)
- `ip_address` (TEXT)
- `user_agent` (TEXT)
- `details` (TEXT)
- `created_at` (DATETIME)

## ⚠️ **Nota Importante:**

La base de datos SQLite se crea automáticamente en `portfolio.db` cuando se ejecuta la API por primera vez. Este archivo se genera en la carpeta `database/` y contiene todos los datos persistentes.

