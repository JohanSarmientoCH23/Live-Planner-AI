const db = require('../config/database');

class Preference {
  constructor(data) {
    this.id = data.id;
    this.usuario_id = data.usuario_id;
    this.notificaciones_push = data.notificaciones_push;
    this.sonido_recordatorios = data.sonido_recordatorios;
    this.vibracion_recordatorios = data.vibracion_recordatorios;
    this.resumen_diario = data.resumen_diario;
    this.resumen_semanal = data.resumen_semanal;
    this.backup_automatico = data.backup_automatico;
  }

  static async create(prefData) {
    const {
      usuario_id,
      notificaciones_push = true,
      sonido_recordatorios = true,
      vibracion_recordatorios = true,
      resumen_diario = true,
      resumen_semanal = true,
      backup_automatico = true
    } = prefData;
    
    const result = await db.query(
      `INSERT INTO preferences (usuario_id, notificaciones_push, sonido_recordatorios, vibracion_recordatorios, resumen_diario, resumen_semanal, backup_automatico)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        usuario_id,
        notificaciones_push,
        sonido_recordatorios,
        vibracion_recordatorios,
        resumen_diario,
        resumen_semanal,
        backup_automatico
      ]
    );
    
    return new Preference(result.rows[0]);
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM preferences WHERE id = $1', [id]);
    return result.rows.length > 0 ? new Preference(result.rows[0]) : null;
  }

  static async findByUser(usuario_id) {
    const result = await db.query('SELECT * FROM preferences WHERE usuario_id = $1', [usuario_id]);
    return result.rows.length > 0 ? new Preference(result.rows[0]) : null;
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    const result = await db.query(
      `UPDATE preferences SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    
    return result.rows.length > 0 ? new Preference(result.rows[0]) : null;
  }
}

module.exports = Preference;
