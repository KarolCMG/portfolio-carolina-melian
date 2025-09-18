// Archivo principal simplificado para Vercel
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware de seguridad
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'https://carolina-melian-portfolio.netlify.app'],
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

// Ruta de contacto simplificada
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validación básica
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Todos los campos son requeridos'
      });
    }
    
    // Simular guardado (en producción usar base de datos)
    console.log('Mensaje recibido:', { name, email, subject, message });
    
    res.json({
      success: true,
      message: 'Mensaje enviado correctamente',
      data: {
        name,
        email,
        subject,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error en contacto:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Ruta de login simplificada
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Credenciales simples (en producción usar base de datos)
    if (username === 'admin' && password === 'admin123') {
      res.json({
        success: true,
        message: 'Login exitoso',
        token: 'jwt-token-simulado',
        user: {
          id: 1,
          username: 'admin'
        }
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: 'Algo salió mal'
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.originalUrl} no existe`,
    availableEndpoints: ['/api/health', '/api/contact', '/api/auth/login']
  });
});

// Exportar para Vercel
module.exports = app;