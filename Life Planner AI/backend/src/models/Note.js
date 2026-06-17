const db = require('../config/database');

class Note {
  constructor(data) {
    this.id = data.id;
    this.usuario_id = data.usuario_id;
    this.titulo = data.titulo;
    this.contenido = data.contenido;
    this.etiquetas = data.etiquetas;
    this.archivado = data.archivado;
    this.creado_por_ia = data.creado_por_ia;
    this.fecha_creacion = data.fecha_creacion;
    this.fecha_actualizacion = data.fecha_actualizacion;
  }

  static async create(noteData) {
    const {
      usuario_id,
      titulo,
      contenido,
      etiquetas = null,
      archivado = false,
      creado_por_ia = false,
      fecha_creacion = new Date(),
      fecha_actualizacion = new Date()
    } = noteData;
    
    const result = await db.query(
      `INSERT INTO notes (usuario_id, titulo, contenido, etiquetas, archivado, creado_por_ia, fecha_creacion, fecha_actualizacion)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        usuario_id,
        titulo,
        contenido,
        etiquetas,
        archivado,
        creado_por_ia,
        fecha_creacion,
        fecha_actualizacion
      ]
    );
    
    return new Note(result.rows[0]);
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM notes WHERE id = $1', [id]);
    return result.rows.length > 0 ? new Note(result.rows[0]) : null;
  }

  static async findByUser(usuario_id, filters = {}) {
    let query = 'SELECT * FROM notes WHERE usuario_id = $1';
    const params = [usuario_id];
    
    if (filters.archivado !== undefined) {
      query += ' AND archivado = $2';
      params.push(filters.archivado);
    }
    
    if (filters.etiquetas) {
      query += ' AND $3 = ANY(etiquetas)'
      params.push(filters.etiquetas);
    }
    
    query += ' ORDER BY fecha_actualizacion DESC';
    
    const result = await db.query(query, params);
    return result.rows.map(row => new Note(row));
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    if (fields.includes('fecha_actualizacion')) {
      setClause += ', fecha_actualizacion = CURRENT_TIMESTAMP';
    }
    
    const result = await db.query(
      `UPDATE notes SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    
    return result.rows.length > 0 ? new Note(result.rows[0]) : null;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }

  static async search(usuario_id, query) {
    const searchTerm = `%${query}%`;
    const result = await db.query(
      `SELECT * FROM notes 
       WHERE usuario_id = $1 
       AND (titulo ILIKE $2 OR contenido ILIKE $2)
       ORDER BY fecha_actualizacion DESC`,
      [usuario_id, searchTerm]
    );
    
    return result.rows.map(row => new Note(row));
  }
}

module.exports = Note;
