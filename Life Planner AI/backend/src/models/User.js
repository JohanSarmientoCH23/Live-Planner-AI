const db = require('../config/database');

class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.password_hash = data.password_hash;
    this.nombre = data.nombre;
    this.foto_perfil = data.foto_perfil;
    this.fecha_nacimiento = data.fecha_nacimiento;
    this.genero = data.genero;
    this.zona_horaria = data.zona_horaria;
    this.idioma = data.idioma;
    this.modo_oscuro = data.modo_oscuro;
    this.biometria_habilitada = data.biometria_habilitada;
    this.pin_seguridad = data.pin_seguridad;
    this.fecha_creacion = data.fecha_creacion;
    this.ultimo_inicio_sesion = data.ultimo_inicio_sesion;
    this.activo = data.activo;
    this.email_verificado = data.email_verificado;
  }

  static async create(userData) {
    const { email, password_hash, nombre, ...optionalData } = userData;
    
    const result = await db.query(
      `INSERT INTO users (email, password_hash, nombre, foto_perfil, fecha_nacimiento, genero, zona_horaria, idioma, modo_oscuro, biometria_habilitada, pin_seguridad, fecha_creacion, ultimo_inicio_sesion, activo, email_verificado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
       RETURNING *`,
      [
        email,
        password_hash,
        nombre,
        optionalData.foto_perfil || null,
        optionalData.fecha_nacimiento || null,
        optionalData.genero || null,
        optionalData.zona_horaria || 'UTC',
        optionalData.idioma || 'es',
        optionalData.modo_oscuro || false,
        optionalData.biometria_habilitada || false,
        optionalData.pin_seguridad || null,
        optionalData.fecha_creacion || new Date(),
        optionalData.ultimo_inicio_sesion || null,
        optionalData.activo !== undefined ? optionalData.activo : true,
        optionalData.email_verificado || false
      ]
    );
    
    return new User(result.rows[0]);
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows.length > 0 ? new User(result.rows[0]) : null;
  }

  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows.length > 0 ? new User(result.rows[0]) : null;
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    const result = await db.query(
      `UPDATE users SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    
    return result.rows.length > 0 ? new User(result.rows[0]) : null;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }

  static async verifyPassword(email, password) {
    const user = await this.findByEmail(email);
    if (!user) return false;
    
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(password, user.password_hash);
  }

  static async updateLastLogin(id) {
    await db.query('UPDATE users SET ultimo_inicio_sesion = CURRENT_TIMESTAMP WHERE id = $1', [id]);
  }

  static async verifyEmail(id) {
    await db.query('UPDATE users SET email_verificado = TRUE WHERE id = $1', [id]);
  }

  static async getUserStats(id) {
    const result = await db.query(
      `SELECT 
        (SELECT COUNT(*) FROM events WHERE usuario_id = $1) as eventos_total,
        (SELECT COUNT(*) FROM tasks WHERE usuario_id = $1 AND completada = FALSE) as tareas_pendientes,
        (SELECT COUNT(*) FROM habit_logs hl JOIN habits h ON hl.habito_id = h.id WHERE hl.usuario_id = $1 AND hl.fecha = CURRENT_DATE AND hl.completado = TRUE) as habitos_completados_hoy,
        (SELECT COUNT(*) FROM goals WHERE usuario_id = $1 AND progreso < 100) as metas_pendientes,
        (SELECT puntos_experiencia FROM gamification WHERE usuario_id = $1) as puntos_experiencia,
        (SELECT nivel FROM gamification WHERE usuario_id = $1) as nivel
       FROM users WHERE id = $1`,
      [id]
    );
    
    return result.rows[0];
  }
}

module.exports = User;
