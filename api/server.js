const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Inicializar base de datos
const { initDatabase } = require('./database/init');
const createAdminUser = require('./database/createAdmin');

const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const { setupSwagger } = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de seguridad
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'https://cute-malasada-7aa843.netlify.app'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: {
    error: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.'
  }
});
app.use(limiter);

// Middleware para parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
setupSwagger(app);

// Rutas
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Portfolio API funcionando correctamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API del Portfolio de Carolina Melián',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      auth: '/api/auth',
      docs: '/api-docs'
    }
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.originalUrl} no existe`,
    availableEndpoints: ['/api/health', '/api/contact', '/api/auth', '/api-docs']
  });
});

// Inicializar base de datos y luego iniciar servidor
async function startServer() {
  try {
    await initDatabase();
    console.log('✅ Base de datos inicializada correctamente');
    
    await createAdminUser();
    console.log('✅ Usuario administrador verificado/creado');
    
    app.listen(PORT, () => {
      console.log(`🚀 API corriendo en puerto ${PORT}`);
      console.log(`📚 Documentación disponible en http://localhost:${PORT}/api-docs`);
      console.log(`🏥 Health check en http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
