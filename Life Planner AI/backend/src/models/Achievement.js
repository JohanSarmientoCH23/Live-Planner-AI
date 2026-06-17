const db = require('../config/database');

class Achievement {
  constructor(data) {
    this.id = data.id;
    this.usuario_id = data.usuario_id;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.icono = data.icono;
    this.color = data.color;
    this.fecha_obtenido = data.fecha_obtenido;
  }

  static async create(achievementData) {
    const {
      usuario_id,
      nombre,
      descripcion,
      icono,
      color,
      fecha_obtenido = new Date()
    } = achievementData;
    
    const result = await db.query(
      `INSERT INTO achievements (usuario_id, nombre, descripcion, icono, color, fecha_obtenido)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        usuario_id,
        nombre,
        descripcion,
        icono,
        color,
        fecha_obtenido
      ]
    );
    
    return new Achievement(result.rows[0]);
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM achievements WHERE id = $1', [id]);
    return result.rows.length > 0 ? new Achievement(result.rows[0]) : null;
  }

  static async findByUser(usuario_id) {
    const result = await db.query('SELECT * FROM achievements WHERE usuario_id = $1 ORDER BY fecha_obtenido DESC', [usuario_id]);
    return result.rows.map(row => new Achievement(row));
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM achievements WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }

  static async getAchievementsStats(usuario_id) {
    const result = await db.query(
      `SELECT COUNT(*) as total_logros
       FROM achievements WHERE usuario_id = $1`,
      [usuario_id]
    );
    
    return result.rows[0];
  }
}

module.exports = Achievement;
