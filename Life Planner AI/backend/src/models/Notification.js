const db = require('../config/database');

class Notification {
  constructor(data) {
    this.id = data.id;
    this.usuario_id = data.usuario_id;
    this.titulo = data.titulo;
    this.contenido = data.contenido;
    this.tipo = data.tipo;
    this.leido = data.leido;
    this.fecha_creacion = data.fecha_creacion;
    this.fecha_envio = data.fecha_envio;
    this.datos_adicionales = data.datos_adicionales;
  }

  static async create(notificationData) {
    const {
      usuario_id,
      titulo,
      contenido,
      tipo,
      leido = false,
      fecha_creacion = new Date(),
      fecha_envio = null,
      datos_adicionales = null
    } = notificationData;
    
    const result = await db.query(
      `INSERT INTO notifications (usuario_id, titulo, contenido, tipo, leido, fecha_creacion, fecha_envio, datos_adicionales)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        usuario_id,
        titulo,
        contenido,
        tipo,
        leido,
        fecha_creacion,
        fecha_envio,
        datos_adicionales
      ]
    );
    
    return new Notification(result.rows[0]);
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM notifications WHERE id = $1', [id]);
    return result.rows.length > 0 ? new Notification(result.rows[0]) : null;
  }

  static async findByUser(usuario_id, filters = {}) {
    let query = 'SELECT * FROM notifications WHERE usuario_id = $1';
    const params = [usuario_id];
    
    if (filters.leido !== undefined) {
      query += ' AND leido = $2';
      params.push(filters.leido);
    }
    
    query += ' ORDER BY fecha_creacion DESC';
    
    const result = await db.query(query, params);
    return result.rows.map(row => new Notification(row));
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    const result = await db.query(
      `UPDATE notifications SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    
    return result.rows.length > 0 ? new Notification(result.rows[0]) : null;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM notifications WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }

  static async markAsRead(id) {
    const result = await db.query(
      'UPDATE notifications SET leido = TRUE WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows.length > 0 ? new Notification(result.rows[0]) : null;
  }

  static async markAllAsRead(usuario_id) {
    const result = await db.query(
      'UPDATE notifications SET leido = TRUE WHERE usuario_id = $1 RETURNING *',
      [usuario_id]
    );
    return result.rows.map(row => new Notification(row));
  }

  static async getNotificationStats(usuario_id) {
    const result = await db.query(
      `SELECT 
        COUNT(*) as total_notificaciones,
        COUNT(CASE WHEN leido = FALSE THEN 1 END) as no_leidas
       FROM notifications WHERE usuario_id = $1`,
      [usuario_id]
    );
    
    return result.rows[0];
  }
}

module.exports = Notification;
