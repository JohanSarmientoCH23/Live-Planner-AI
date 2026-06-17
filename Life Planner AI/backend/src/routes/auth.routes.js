const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UserService, GamificationService } = require('../services');

// Validación de usuario
const validateUser = [
  body('email')
    .isEmail()
    .withMessage('Por favor ingrese un correo electrónico válido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ max: 100 })
    .withMessage('El nombre no puede exceder los 100 caracteres')
];

// Registro de usuario
router.post('/register', validateUser, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Errores de validación',
        details: errors.array()
      });
    }

    const user = await UserService.createUser(req.body);
    
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        foto_perfil: user.foto_perfil
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear usuario',
      message: error.message
    });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({
        error: 'Credenciales inválidas',
        message: 'Correo electrónico o contraseña incorrectos'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        foto_perfil: user.foto_perfil
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al iniciar sesión',
      message: error.message
    });
  }
});

// Obtener perfil de usuario
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        error: 'Token no proporcionado',
        message: 'Por favor proporcione un token de autorización válido'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await UserService.getUser(decoded.id);
    
    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado',
        message: 'El usuario no existe'
      });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        foto_perfil: user.foto_perfil,
        fecha_nacimiento: user.fecha_nacimiento,
        genero: user.genero,
        zona_horaria: user.zona_horaria,
        idioma: user.idioma,
        modo_oscuro: user.modo_oscuro,
        biometria_habilitada: user.biometria_habilitada,
        email_verificado: user.email_verificado
      }
    });
  } catch (error) {
    res.status(401).json({
      error: 'Token inválido',
      message: 'Token de autorización inválido o expirado'
    });
  }
});

// Actualizar perfil de usuario
router.put('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        error: 'Token no proporcionado',
        message: 'Por favor proporcione un token de autorización válido'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await UserService.updateUser(decoded.id, req.body);
    
    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado',
        message: 'El usuario no existe'
      });
    }

    res.json({
      message: 'Perfil actualizado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        foto_perfil: user.foto_perfil,
        fecha_nacimiento: user.fecha_nacimiento,
        genero: user.genero,
        zona_horaria: user.zona_horaria,
        idioma: user.idioma,
        modo_oscuro: user.modo_oscuro,
        biometria_habilitada: user.biometria_habilitada,
        email_verificado: user.email_verificado
      }
    });
  } catch (error) {
    res.status(401).json({
      error: 'Token inválido',
      message: 'Token de autorización inválido o expirado'
    });
  }
});

// Cerrar sesión (logout)
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        error: 'Token no proporcionado',
        message: 'Por favor proporcione un token de autorización válido'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    res.json({
      message: 'Cierre de sesión exitoso'
    });
  } catch (error) {
    res.status(401).json({
      error: 'Token inválido',
      message: 'Token de autorización inválido o expirado'
    });
  }
});

module.exports = router;
