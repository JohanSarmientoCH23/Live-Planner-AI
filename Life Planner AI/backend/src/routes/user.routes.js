const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { UserService } = require('../services');

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUser(id);
    
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
    res.status(500).json({
      error: 'Error al obtener usuario',
      message: error.message
    });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const user = await UserService.updateUser(id, updateData);
    
    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado',
        message: 'El usuario no existe'
      });
    }

    res.json({
      message: 'Usuario actualizado exitosamente',
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
    res.status(500).json({
      error: 'Error al actualizar usuario',
      message: error.message
    });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserService.deleteUser(id);
    
    if (!deleted) {
      return res.status(404).json({
        error: 'Usuario no encontrado',
        message: 'El usuario no existe'
      });
    }

    res.json({
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar usuario',
      message: error.message
    });
  }
});

module.exports = router;
