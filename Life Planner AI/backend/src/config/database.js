const { Pool } = require('pg');
const logger = require('./logger');

const poolConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'life_planner_ai',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};

const pool = new Pool(poolConfig);

pool.on('connect', () => {
  logger.info('Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  logger.error('Error en la conexión de PostgreSQL:', err);
});

const query = async (text, params) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug('Consulta ejecutada', { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    logger.error('Error en la consulta:', { text, error: error.message });
    throw error;
  }
};

const transaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  query,
  transaction,
  pool,
};
