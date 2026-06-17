const db = require('../config/database');

class HabitLog {
  constructor(data) {
    this.id = data.id;
    this.habito_id = data.habito_id;
    this.usuario_id = data.usuario_id;
    this.fecha = data.fecha;
    this.completado = data.completado;
    this.notas = data.notas;
  }

  static async create(logData) {
    const {
      habito_id,
      usuario_id,
      fecha,
      completado = false,
      notas = null
    } = logData;
    
    const result = await db.query(
      `INSERT INTO habit_logs (habito_id, usuario_id, fecha, completado, notas)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        habito_id,
        usuario_id,
        fecha,
        completado,
        notas
      ]
    );
    
    return new HabitLog(result.rows[0]);
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM habit_logs WHERE id = $1', [id]);
    return result.rows.length > 0 ? new HabitLog(result.rows[0]) : null;
  }

  static async findByHabit(habito_id, fecha = null) {
    let query = 'SELECT * FROM habit_logs WHERE habito_id = $1';
    const params = [habito_id];
    
    if (fecha) {
      query += ' AND fecha = $2';
      params.push(fecha);
    }
    
    query += ' ORDER BY fecha DESC';
    
    const result = await db.query(query, params);
    return result.rows.map(row => new HabitLog(row));
  }

  static async findByUser(usuario_id, fecha = null) {
    let query = 'SELECT * FROM habit_logs WHERE usuario_id = $1';
    const params = [usuario_id];
    
    if (fecha) {
      query += ' AND fecha = $2';
      params.push(fecha);
    }
    
    query += ' ORDER BY fecha DESC';
    
    const result = await db.query(query, params);
    return result.rows.map(row => new HabitLog(row));
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    const result = await db.query(
      `UPDATE habit_logs SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    
    return result.rows.length > 0 ? new HabitLog(result.rows[0]) : null;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM habit_logs WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }

  static async getHabitLogsForDate(usuario_id, fecha) {
    const result = await db.query(
      `SELECT hl.*, h.titulo as habit_titulo, h.icono as habit_icono, h.color as habit_color
       FROM habit_logs hl
       JOIN habits h ON hl.habito_id = h.id
       WHERE hl.usuario_id = $1 AND hl.fecha = $2
       ORDER BY h.titulo ASC`,
      [usuario_id, fecha]
    );
    
    return result.rows;
  }

  static async getHabitLogsForWeek(usuario_id, fechaInicio, fechaFin) {
    const result = await db.query(
      `SELECT hl.*, h.titulo as habit_titulo, h.icono as habit_icono, h.color as habit_color
       FROM habit_logs hl
       JOIN habits h ON hl.habito_id = h.id
       WHERE hl.usuario_id = $1 AND hl.fecha BETWEEN $2 AND $3
       ORDER BY hl.fecha ASC, h.titulo ASC`,
      [usuario_id, fechaInicio, fechaFin]
    );
    
    return result.rows;
  }
}

module.exports = HabitLog;
