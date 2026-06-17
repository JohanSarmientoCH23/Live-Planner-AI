const db = require('../config/database');

class Task {
  constructor(data) {
    this.id = data.id;
    this.usuario_id = data.usuario_id;
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.fecha_vencimiento = data.fecha_vencimiento;
    this.completada = data.completada;
    this.fecha_completada = data.fecha_completada;
    this.prioridad = data.prioridad;
    this.categoria = data.categoria;
    this.etiquetas = data.etiquetas;
    this.asignada_a = data.asignada_a;
    this.archivado = data.archivado;
    this.creado_por_ia = data.creado_por_ia;
    this.fecha_creacion = data.fecha_creacion;
  }

  static async create(taskData) {
    const {
      usuario_id,
      titulo,
      descripcion,
      fecha_vencimiento,
      completada = false,
      fecha_completada = null,
      prioridad = 'media',
      categoria = null,
      etiquetas = null,
      asignada_a = null,
      archivado = false,
      creado_por_ia = false,
      fecha_creacion = new Date()
    } = taskData;
    
    const result = await db.query(
      `INSERT INTO tasks (usuario_id, titulo, descripcion, fecha_vencimiento, completada, fecha_completada, prioridad, categoria, etiquetas, asignada_a, archivado, creado_por_ia, fecha_creacion)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        usuario_id,
        titulo,
        descripcion,
        fecha_vencimiento,
        completada,
        fecha_completada,
        prioridad,
        categoria,
        etiquetas,
        asignada_a,
        archivado,
        creado_por_ia,
        fecha_creacion
      ]
    );
    
    return new Task(result.rows[0]);
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows.length > 0 ? new Task(result.rows[0]) : null;
  }

  static async findByUser(usuario_id, filters = {}) {
    let query = 'SELECT * FROM tasks WHERE usuario_id = $1';
    const params = [usuario_id];
    
    if (filters.completada !== undefined) {
      query += ' AND completada = $2';
      params.push(filters.completada);
    }
    
    if (filters.archivado !== undefined) {
      query += ' AND archivado = $3';
      params.push(filters.archivado);
    }
    
    if (filters.fecha_vencimiento) {
      query += ' AND fecha_vencimiento <= $4';
      params.push(filters.fecha_vencimiento);
    }
    
    if (filters.prioridad) {
      query += ' AND prioridad = $5';
      params.push(filters.prioridad);
    }
    
    if (filters.categoria) {
      query += ' AND categoria = $6';
      params.push(filters.categoria);
    }
    
    query += ' ORDER BY fecha_vencimiento ASC, prioridad DESC';
    
    const result = await db.query(query, params);
    return result.rows.map(row => new Task(row));
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    const result = await db.query(
      `UPDATE tasks SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    
    return result.rows.length > 0 ? new Task(result.rows[0]) : null;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }

  static async complete(id) {
    const result = await db.query(
      'UPDATE tasks SET completada = TRUE, fecha_completada = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows.length > 0 ? new Task(result.rows[0]) : null;
  }

  static async getTasksByPriority(usuario_id, prioridad) {
    const result = await db.query(
      'SELECT * FROM tasks WHERE usuario_id = $1 AND prioridad = $2 AND completada = FALSE ORDER BY fecha_vencimiento ASC',
      [usuario_id, prioridad]
    );
    return result.rows.map(row => new Task(row));
  }
}

module.exports = Task;
