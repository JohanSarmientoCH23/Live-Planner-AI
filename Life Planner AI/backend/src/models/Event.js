const db = require('../config/database');

class Event {
  constructor(data) {
    this.id = data.id;
    this.usuario_id = data.usuario_id;
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.fecha_inicio = data.fecha_inicio;
    this.fecha_fin = data.fecha_fin;
    this.todo_el_dia = data.todo_el_dia;
    this.repetir = data.repetir;
    this.repetir_hasta = data.repetir_hasta;
    this.ubicacion = data.ubicacion;
    this.recordatorio = data.recordatorio;
    this.minutos_recordatorio = data.minutos_recordatorio;
    this.color = data.color;
    this.tipo = data.tipo;
    this.importancia = data.importancia;
    this.creado_por_ia = data.creado_por_ia;
    this.fecha_creacion = data.fecha_creacion;
  }

  static async create(eventData) {
    const {
      usuario_id,
      titulo,
      descripcion,
      fecha_inicio,
      fecha_fin,
      todo_el_dia = false,
      repetir = null,
      repetir_hasta = null,
      ubicacion = null,
      recordatorio = false,
      minutos_recordatorio = null,
      color = '#3B82F6',
      tipo = 'evento',
      importancia = 'media',
      creado_por_ia = false,
      fecha_creacion = new Date()
    } = eventData;
    
    const result = await db.query(
      `INSERT INTO events (usuario_id, titulo, descripcion, fecha_inicio, fecha_fin, todo_el_dia, repetir, repetir_hasta, ubicacion, recordatorio, minutos_recordatorio, color, tipo, importancia, creado_por_ia, fecha_creacion)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
       RETURNING *`,
      [
        usuario_id,
        titulo,
        descripcion,
        fecha_inicio,
        fecha_fin,
        todo_el_dia,
        repetir,
        repetir_hasta,
        ubicacion,
        recordatorio,
        minutos_recordatorio,
        color,
        tipo,
        importancia,
        creado_por_ia,
        fecha_creacion
      ]
    );
    
    return new Event(result.rows[0]);
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM events WHERE id = $1', [id]);
    return result.rows.length > 0 ? new Event(result.rows[0]) : null;
  }

  static async findByUser(usuario_id, filters = {}) {
    let query = 'SELECT * FROM events WHERE usuario_id = $1';
    const params = [usuario_id];
    
    if (filters.fecha_inicio) {
      query += ' AND fecha_inicio >= $2';
      params.push(filters.fecha_inicio);
    }
    
    if (filters.fecha_fin) {
      query += ' AND fecha_inicio <= $3';
      params.push(filters.fecha_fin);
    }
    
    if (filters.tipo) {
      query += ' AND tipo = $4';
      params.push(filters.tipo);
    }
    
    query += ' ORDER BY fecha_inicio ASC';
    
    const result = await db.query(query, params);
    return result.rows.map(row => new Event(row));
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    const result = await db.query(
      `UPDATE events SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    
    return result.rows.length > 0 ? new Event(result.rows[0]) : null;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }

  static async getRecurringEvents(usuario_id, fecha) {
    const result = await db.query(
      `SELECT * FROM events 
       WHERE usuario_id = $1 
       AND repetir IS NOT NULL 
       AND fecha_inicio <= $2
       AND (repetir_hasta IS NULL OR repetir_hasta >= $3)
       ORDER BY fecha_inicio ASC`,
      [usuario_id, fecha, fecha]
    );
    
    return result.rows.map(row => new Event(row));
  }

  static async getEventsForDate(usuario_id, fecha) {
    const result = await db.query(
      `SELECT * FROM events 
       WHERE usuario_id = $1 
       AND DATE(fecha_inicio) = $2
       ORDER BY fecha_inicio ASC`,
      [usuario_id, fecha]
    );
    
    return result.rows.map(row => new Event(row));
  }
}

module.exports = Event;
