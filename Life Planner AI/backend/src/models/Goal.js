const db = require('../config/database');

class Goal {
  constructor(data) {
    this.id = data.id;
    this.usuario_id = data.usuario_id;
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.fecha_objetivo = data.fecha_objetivo;
    this.fecha_inicio = data.fecha_inicio;
    this.progreso = data.progreso;
    this.subtareas = data.subtareas;
    this.icono = data.icono;
    this.color = data.color;
    this.completada = data.completada;
    this.fecha_completada = data.fecha_completada;
    this.creado_por_ia = data.creado_por_ia;
  }

  static async create(goalData) {
    const {
      usuario_id,
      titulo,
      descripcion,
      fecha_objetivo,
      fecha_inicio = new Date(),
      progreso = 0,
      subtareas = null,
      icono = 'target',
      color = '#8B5CF6',
      completada = false,
      fecha_completada = null,
      creado_por_ia = false
    } = goalData;
    
    const result = await db.query(
      `INSERT INTO goals (usuario_id, titulo, descripcion, fecha_objetivo, fecha_inicio, progreso, subtareas, icono, color, completada, fecha_completada, creado_por_ia)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        usuario_id,
        titulo,
        descripcion,
        fecha_objetivo,
        fecha_inicio,
        progreso,
        subtareas,
        icono,
        color,
        completada,
        fecha_completada,
        creado_por_ia
      ]
    );
    
    return new Goal(result.rows[0]);
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM goals WHERE id = $1', [id]);
    return result.rows.length > 0 ? new Goal(result.rows[0]) : null;
  }

  static async findByUser(usuario_id, filters = {}) {
    let query = 'SELECT * FROM goals WHERE usuario_id = $1';
    const params = [usuario_id];
    
    if (filters.completada !== undefined) {
      query += ' AND completada = $2';
      params.push(filters.completada);
    }
    
    if (filters.fecha_objetivo) {
      query += ' AND fecha_objetivo <= $3';
      params.push(filters.fecha_objetivo);
    }
    
    query += ' ORDER BY fecha_objetivo ASC';
    
    const result = await db.query(query, params);
    return result.rows.map(row => new Goal(row));
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    const result = await db.query(
      `UPDATE goals SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    
    return result.rows.length > 0 ? new Goal(result.rows[0]) : null;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM goals WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }

  static async complete(id) {
    const result = await db.query(
      'UPDATE goals SET completada = TRUE, fecha_completada = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows.length > 0 ? new Goal(result.rows[0]) : null;
  }

  static async updateProgress(id, progreso) {
    const result = await db.query(
      'UPDATE goals SET progreso = $2 WHERE id = $1 RETURNING *',
      [id, progreso]
    );
    return result.rows.length > 0 ? new Goal(result.rows[0]) : null;
  }

  static async getGoalsStats(usuario_id) {
    const result = await db.query(
      `SELECT 
        COUNT(*) as total_metas,
        COUNT(CASE WHEN completada = TRUE THEN 1 END) as metas_completadas,
        COUNT(CASE WHEN progreso < 100 THEN 1 END) as metas_pendientes,
        AVG(progreso) as progreso_promedio,
        COUNT(CASE WHEN fecha_objetivo < CURRENT_DATE AND progreso < 100 THEN 1 END) as metas_atrasadas
       FROM goals WHERE usuario_id = $1`,
      [usuario_id]
    );
    
    return result.rows[0];
  }
}

module.exports = Goal;
