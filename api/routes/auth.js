const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const UserModel = require('../database/UserModel');
const SecurityLogModel = require('../database/SecurityLogModel');

const router = express.Router();

// Usuario admin por defecto (en producción usar base de datos)
const ADMIN_USER = {
  id: 1,
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123' // En producción usar hash
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', [
  body('username').notEmpty().withMessage('Username es requerido'),
  body('password').isLength({ min: 6 }).withMessage('Password debe tener al menos 6 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Datos inválidos',
        details: errors.array()
      });
    }

    const { username, password } = req.body;
    const userModel = new UserModel();
    const securityLogModel = new SecurityLogModel();

    // Buscar usuario en la base de datos
    const user = await userModel.findByUsername(username);
    
    if (!user) {
      // Log de intento de login fallido
      await securityLogModel.create({
        event_type: 'failed_login',
        ip_address: req.ip,
        user_agent: req.get('User-Agent'),
        details: `Intento de login con usuario inexistente: ${username}`
      });

      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const isValidPassword = await userModel.verifyPassword(password, user.password_hash);
    
    if (!isValidPassword) {
      // Log de intento de login fallido
      await securityLogModel.create({
        event_type: 'failed_login',
        ip_address: req.ip,
        user_agent: req.get('User-Agent'),
        details: `Intento de login con contraseña incorrecta para usuario: ${username}`
      });

      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    // Generar JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET || 'portfolio-secret-key',
      { expiresIn: '24h' }
    );

    // Actualizar último login
    await userModel.updateLastLogin(username);

    // Log de login exitoso
    await securityLogModel.create({
      event_type: 'successful_login',
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      details: `Login exitoso para usuario: ${username}`
    });

    res.json({
      success: true,
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verificar token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido
 */
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Token no proporcionado'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'portfolio-secret-key');
    res.json({
      success: true,
      message: 'Token válido',
      user: decoded
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Token inválido'
    });
  }
});

module.exports = router;
