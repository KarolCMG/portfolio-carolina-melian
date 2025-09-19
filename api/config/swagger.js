const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API - Carolina Melián',
      version: '1.0.0',
      description: 'API REST para el portfolio de Carolina Melián - Desarrolladora Full Stack',
      contact: {
        name: 'Carolina Melián',
        email: 'cmg7775@gmail.com',
        url: 'https://github.com/KarolCMG'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desarrollo'
      },
      {
        url: 'https://portfolio-api-carolina.vercel.app',
        description: 'Servidor de producción'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Contact: {
          type: 'object',
          required: ['name', 'email', 'subject', 'message'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del contacto'
            },
            name: {
              type: 'string',
              description: 'Nombre del remitente',
              example: 'Juan Pérez'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del remitente',
              example: 'juan@ejemplo.com'
            },
            subject: {
              type: 'string',
              description: 'Asunto del mensaje',
              example: 'Consulta sobre proyecto'
            },
            message: {
              type: 'string',
              description: 'Contenido del mensaje',
              example: 'Hola, me interesa trabajar contigo...'
            },
            ip: {
              type: 'string',
              description: 'Dirección IP del remitente'
            },
            userAgent: {
              type: 'string',
              description: 'User Agent del navegador'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              description: 'Descripción del error'
            },
            details: {
              type: 'array',
              description: 'Detalles adicionales del error'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              description: 'Mensaje de éxito'
            },
            data: {
              type: 'object',
              description: 'Datos de respuesta'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Contact',
        description: 'Endpoints para manejo de mensajes de contacto'
      },
      {
        name: 'Auth',
        description: 'Endpoints de autenticación'
      }
    ]
  },
  apis: ['./routes/*.js'] // Archivos que contienen las anotaciones de Swagger
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Portfolio API - Carolina Melián'
  }));
};

module.exports = {
  setupSwagger,
  specs
};

