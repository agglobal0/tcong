/**
 * Database Migration Runner
 * Executes SQL migration files against the database
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function runMigrations() {
  console.log('🔄 Running database migrations...\n');

  let dbUri = process.env.MYSQL_URL || process.env.DATABASE_URL || process.env.JAWSDB_URL || process.env.CLEARDB_DATABASE_URL;
  if (dbUri) dbUri = dbUri.replace(/[\?&]ssl-mode=[^&]+/gi, '');
  const sslOption = (
    process.env.DB_SSL === 'true' ||
    process.env.NODE_ENV === 'production' ||
    !!dbUri ||
    (process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1')
  ) ? { rejectUnauthorized: false } : undefined;

  // Auto-create target database if it doesn't exist
  try {
    let initConfig;
    let targetDbName = process.env.DB_NAME || 'tcong';
    if (dbUri) {
      const parsed = new URL(dbUri);
      if (parsed.pathname && parsed.pathname.length > 1) {
        targetDbName = parsed.pathname.substring(1);
      }
      parsed.pathname = '/defaultdb';
      initConfig = { uri: parsed.toString(), ssl: sslOption };
    } else {
      initConfig = {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        ssl: sslOption
      };
    }
    const initConn = await mysql.createConnection(initConfig);
    await initConn.query(`CREATE DATABASE IF NOT EXISTS \`${targetDbName}\`;`);
    await initConn.end();
    console.log(`✅ Verified database \`${targetDbName}\` exists.`);
  } catch (err) {
    console.log('ℹ️ Database pre-creation notice:', err.message);
  }

  const connConfig = dbUri
    ? { uri: dbUri, multipleStatements: true, ssl: sslOption }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'tcong',
        multipleStatements: true,
        ssl: sslOption
      };

  const connection = await mysql.createConnection(connConfig);

  try {
    const migrationsDir = __dirname;
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    for (const file of files) {
      console.log(`📄 Executing: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await connection.query(sql);
      console.log(`✅ Completed: ${file}\n`);
    }

    console.log('🎉 All migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

if (require.main === module) {
  runMigrations().catch(() => process.exit(1));
}

module.exports = { runMigrations };
