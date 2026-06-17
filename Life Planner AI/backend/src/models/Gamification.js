const db = require('../config/database');

class Gamification {
  constructor(data) {
    this.id = data.id;
    this.usuario_id = data.usuario_id;
    this.puntos_experiencia = data.puntos_experiencia;
    this.nivel = data.nivel;
    this.puntos_nivel_actual = data.puntos_nivel_actual;
    this.racha_dias = data.racha_dias;
    this.ultimo_login = data.ultimo_login;
    this.fecha_creacion = data.fecha_creacion;
  }

  static async create(gamificationData) {
    const {
      usuario_id,
      puntos_experiencia = 0,
      nivel = 1,
      puntos_nivel_actual = 0,
      racha_dias = 0,
      ultimo_login = null,
      fecha_creacion = new Date()
    } = gamificationData;
    
    const result = await db.query(
      `INSERT INTO gamification (usuario_id, puntos_experiencia, nivel, puntos_nivel_actual, racha_dias, ultimo_login, fecha_creacion)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        usuario_id,
        puntos_experiencia,
        nivel,
        puntos_nivel_actual,
        racha_dias,
        ultimo_login,
        fecha_creacion
      ]
    );
    
    return new Gamification(result.rows[0]);
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM gamification WHERE id = $1', [id]);
    return result.rows.length > 0 ? new Gamification(result.rows[0]) : null;
  }

  static async findByUser(usuario_id) {
    const result = await db.query('SELECT * FROM gamification WHERE usuario_id = $1', [usuario_id]);
    return result.rows.length > 0 ? new Gamification(result.rows[0]) : null;
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    const result = await db.query(
      `UPDATE gamification SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    
    return result.rows.length > 0 ? new Gamification(result.rows[0]) : null;
  }

  static async updateXP(usuario_id, puntos) {
    const result = await db.query(
      `UPDATE gamification 
       SET puntos_experiencia = puntos_experiencia + $2,
           nivel = CASE 
             WHEN puntos_experiencia + $2 >= $3 THEN nivel + 1
             ELSE nivel
           END,
           puntos_nivel_actual = CASE 
             WHEN nivel > 1 THEN ($3 - (puntos_experiencia % $3)) + ($2 % $3)
             ELSE $2
           END
       WHERE usuario_id = $1
       RETURNING *`,
      [usuario_id, puntos, 100] // 100 XP por nivel
    );
    
    return result.rows.length > 0 ? new Gamification(result.rows[0]) : null;
  }

  static async updateStreak(usuario_id) {
    const result = await db.query(
      `UPDATE gamification 
       SET racha_dias = racha_dias + 1,
           ultimo_login = CURRENT_TIMESTAMP
       WHERE usuario_id = $1
       RETURNING *`,
      [usuario_id]
    );
    
    return result.rows.length > 0 ? new Gamification(result.rows[0]) : null;
  }

  static async resetStreak(usuario_id) {
    const result = await db.query(
      `UPDATE gamification 
       SET racha_dias = 0,
           ultimo_login = CURRENT_TIMESTAMP
       WHERE usuario_id = $1
       RETURNING *`,
      [usuario_id]
    );
    
    return result.rows.length > 0 ? new Gamification(result.rows[0]) : null;
  }

  static async getLeaderboard(limit = 10) {
    const result = await db.query(
      `SELECT u.id, u.nombre, u.foto_perfil, g.puntos_experiencia, g.nivel, g.racha_dias
       FROM users u
       JOIN gamification g ON u.id = g.usuario_id
       WHERE u.activo = TRUE
       ORDER BY g.puntos_experiencia DESC, g.racha_dias DESC
       LIMIT $1`,
      [limit]
    );
    
    return result.rows;
  }
}

module.exports = Gamification;
