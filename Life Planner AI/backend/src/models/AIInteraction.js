const db = require('../config/database');

class AIInteraction {
  constructor(data) {
    this.id = data.id;
    this.usuario_id = data.usuario_id;
    this.tipo = data.tipo;
    this.prompt = data.prompt;
    this.respuesta = data.respuesta;
    this.fecha_creacion = data.fecha_creacion;
  }

  static async create(interactionData) {
    const {
      usuario_id,
      tipo,
      prompt,
      respuesta,
      fecha_creacion = new Date()
    } = interactionData;
    
    const result = await db.query(
      `INSERT INTO ai_interactions (usuario_id, tipo, prompt, respuesta, fecha_creacion)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        usuario_id,
        tipo,
        prompt,
        respuesta,
        fecha_creacion
      ]
    );
    
    return new AIInteraction(result.rows[0]);
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM ai_interactions WHERE id = $1', [id]);
    return result.rows.length > 0 ? new AIInteraction(result.rows[0]) : null;
  }

  static async findByUser(usuario_id, filters = {}) {
    let query = 'SELECT * FROM ai_interactions WHERE usuario_id = $1';
    const params = [usuario_id];
    
    if (filters.tipo) {
      query += ' AND tipo = $2';
      params.push(filters.tipo);
    }
    
    query += ' ORDER BY fecha_creacion DESC';
    
    const result = await db.query(query, params);
    return result.rows.map(row => new AIInteraction(row));
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM ai_interactions WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }

  static async getInteractionStats(usuario_id) {
    const result = await db.query(
      `SELECT 
        COUNT(*) as total_interacciones,
        COUNT(CASE WHEN tipo = 'agenda' THEN 1 END) as interacciones_agenda,
        COUNT(CASE WHEN tipo = 'tareas' THEN 1 END) as interacciones_tareas,
        COUNT(CASE WHEN tipo = 'hábitos' THEN 1 END) as interacciones_hábitos,
        COUNT(CASE WHEN tipo = 'metas' THEN 1 END) as interacciones_metas,
        COUNT(CASE WHEN tipo = 'notas' THEN 1 END) as interacciones_notas,
        COUNT(CASE WHEN tipo = 'finanzas' THEN 1 END) as interacciones_finanzas
       FROM ai_interactions WHERE usuario_id = $1`,
      [usuario_id]
    );
    
    return result.rows[0];
  }
}

module.exports = AIInteraction;
