const db = require('../config/database');

class Habit {
  constructor(data) {
    this.id = data.id;
    this.usuario_id = data.usuario_id;
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.icono = data.icono;
    this.color = data.color;
    this.objetivo_diario = data.objetivo_diario;
    this.objetivo_semanal = data.objetivo_semanal;
    this.objetivo_mensual = data.objetivo_mensual;
    this.activo = data.activo;
    this.fecha_inicio = data.fecha_inicio;
    this.fecha_fin = data.fecha_fin;
    this.dias_excluidos = data.dias_excluidos;
  }

  static async create(habitData) {
    const {
      usuario_id,
      titulo,
      descripcion,
      icono = 'activity',
      color = '#10B981',
      objetivo_diario = 1,
      objetivo_semanal = null,
      objetivo_mensual = null,
      activo = true,
      fecha_inicio = new Date(),
      fecha_fin = null,
      dias_excluidos = null
    } = habitData;
    
    const result = await db.query(
      `INSERT INTO habits (usuario_id, titulo, descripcion, icono, color, objetivo_diario, objetivo_semanal, objetivo_mensual, activo, fecha_inicio, fecha_fin, dias_excluidos)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        usuario_id,
        titulo,
        descripcion,
        icono,
        color,
        objetivo_diario,
        objetivo_semanal,
        objetivo_mensual,
        activo,
        fecha_inicio,
        fecha_fin,
        dias_excluidos
      ]
    );
    
    return new Habit(result.rows[0]);
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM habits WHERE id = $1', [id]);
    return result.rows.length > 0 ? new Habit(result.rows[0]) : null;
  }

  static async findByUser(usuario_id, filters = {}) {
    let query = 'SELECT * FROM habits WHERE usuario_id = $1';
    const params = [usuario_id];
    
    if (filters.activo !== undefined) {
      query += ' AND activo = $2';
      params.push(filters.activo);
    }
    
    query += ' ORDER BY titulo ASC';
    
    const result = await db.query(query, params);
    return result.rows.map(row => new Habit(row));
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    const result = await db.query(
      `UPDATE habits SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    
    return result.rows.length > 0 ? new Habit(result.rows[0]) : null;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM habits WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }

  static async getHabitStats(usuario_id, fecha) {
    const result = await db.query(
      `SELECT 
        h.id,
        h.titulo,
        h.icono,
        h.color,
        COUNT(hl.id) as total_registros,
        COUNT(CASE WHEN hl.completado = TRUE THEN 1 END) as registros_completados,
        COUNT(CASE WHEN hl.fecha = $1 THEN 1 END) as racha_actual,
        ROUND(COUNT(CASE WHEN hl.completado = TRUE THEN 1 END) * 100.0 / NULLIF(COUNT(hl.id), 0), 2) as porcentaje_cumplimiento
       FROM habits h
       LEFT JOIN habit_logs hl ON h.id = hl.habito_id
       WHERE h.usuario_id = $2
       GROUP BY h.id, h.titulo, h.icono, h.color
       ORDER BY porcentaje_cumplimiento DESC`,
      [fecha, usuario_id]
    );
    
    return result.rows;
  }
}

module.exports = Habit;
