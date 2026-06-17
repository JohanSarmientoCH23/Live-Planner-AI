const db = require('../config/database');

class Finance {
  constructor(data) {
    this.id = data.id;
    this.usuario_id = data.usuario_id;
    this.tipo = data.tipo;
    this.categoria = data.categoria;
    this.monto = data.monto;
    this.fecha = data.fecha;
    this.descripcion = data.descripcion;
    this.metodo_pago = data.metodo_pago;
    this.recurrente = data.recurrente;
    this.periodo_recurrencia = data.periodo_recurrencia;
  }

  static async create(financeData) {
    const {
      usuario_id,
      tipo,
      categoria,
      monto,
      fecha,
      descripcion = null,
      metodo_pago = null,
      recurrente = false,
      periodo_recurrencia = null
    } = financeData;
    
    const result = await db.query(
      `INSERT INTO finances (usuario_id, tipo, categoria, monto, fecha, descripcion, metodo_pago, recurrente, periodo_recurrencia)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        usuario_id,
        tipo,
        categoria,
        monto,
        fecha,
        descripcion,
        metodo_pago,
        recurrente,
        periodo_recurrencia
      ]
    );
    
    return new Finance(result.rows[0]);
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM finances WHERE id = $1', [id]);
    return result.rows.length > 0 ? new Finance(result.rows[0]) : null;
  }

  static async findByUser(usuario_id, filters = {}) {
    let query = 'SELECT * FROM finances WHERE usuario_id = $1';
    const params = [usuario_id];
    
    if (filters.fecha_inicio) {
      query += ' AND fecha >= $2';
      params.push(filters.fecha_inicio);
    }
    
    if (filters.fecha_fin) {
      query += ' AND fecha <= $3';
      params.push(filters.fecha_fin);
    }
    
    if (filters.tipo) {
      query += ' AND tipo = $4';
      params.push(filters.tipo);
    }
    
    if (filters.categoria) {
      query += ' AND categoria = $5';
      params.push(filters.categoria);
    }
    
    query += ' ORDER BY fecha DESC';
    
    const result = await db.query(query, params);
    return result.rows.map(row => new Finance(row));
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    const result = await db.query(
      `UPDATE finances SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    
    return result.rows.length > 0 ? new Finance(result.rows[0]) : null;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM finances WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }

  static async getFinanceStats(usuario_id, fechaInicio, fechaFin) {
    const result = await db.query(
      `SELECT 
        tipo,
        categoria,
        SUM(monto) as total,
        COUNT(*) as count
       FROM finances 
       WHERE usuario_id = $1 AND fecha BETWEEN $2 AND $3
       GROUP BY tipo, categoria
       ORDER BY tipo, total DESC`,
      [usuario_id, fechaInicio, fechaFin]
    );
    
    return result.rows;
  }

  static async getMonthlySummary(usuario_id, mes, anio) {
    const fechaInicio = `${anio}-${mes.padStart(2, '0')}-01`;
    const fechaFin = new Date(anio, mes, 0).toISOString().split('T')[0];
    
    const result = await db.query(
      `SELECT 
        tipo,
        SUM(monto) as total
       FROM finances 
       WHERE usuario_id = $1 AND fecha BETWEEN $2 AND $3
       GROUP BY tipo`,
      [usuario_id, fechaInicio, fechaFin]
    );
    
    return result.rows;
  }
}

module.exports = Finance;
