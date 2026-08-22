/**
 * MySQL Database Connection Pool
 * Uses mysql2 with promise support for async/await queries
 */
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tcong_db',
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  // Return rows as plain objects
  typeCast: true,
  // Timezone
  timezone: '+00:00',
  // Support multiple statements for migrations
  multipleStatements: false,
  // SSL support for cloud databases (Aiven, Railway, etc.)
  ssl: (process.env.DB_SSL === 'true' || process.env.NODE_ENV === 'production' || (process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1'))
    ? { rejectUnauthorized: false }
    : undefined
});

/**
 * Execute a parameterized query
 * @param {string} sql - SQL query with ? placeholders
 * @param {Array} params - Parameters to bind
 * @returns {Promise<Array>} Query results
 */
async function query(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

/**
 * Get a single connection from the pool (for transactions)
 * @returns {Promise<Connection>}
 */
async function getConnection() {
  return pool.getConnection();
}

/**
 * Test database connectivity
 */
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL connected successfully');
    connection.release();
    return true;
  } catch (error) {
    const details = error.message || error.code || error;
    console.error(`❌ MySQL connection failed: ${details} (${error.code || 'UNKNOWN'})`);
    return false;
  }
}

module.exports = { pool, query, getConnection, testConnection };
