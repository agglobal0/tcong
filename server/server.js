/**
 * Server Entry Point
 * Loads environment, connects to DB, and starts listening
 */
require('dotenv').config();

const app = require('./src/app');
const { testConnection } = require('./src/config/database');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

async function startServer() {
  // Test database connection
  const dbConnected = await testConnection();

  if (!dbConnected) {
    console.error('⚠️  Server starting without database connection.');
    console.error('   Make sure MySQL is running and .env is configured.');
  } else {
    try {
      const { pool } = require('./src/config/database');
      const [tables] = await pool.query("SHOW TABLES LIKE 'users'");
      if (tables.length === 0) {
        console.log('🔄 No database tables found in current database. Running automatic migrations...');
        const { runMigrations } = require('./migrations/run');
        await runMigrations();
        console.log('🌱 Seeding initial database data...');
        const { runSeeders } = require('./seeders/run');
        await runSeeders();
      }
    } catch (err) {
      console.error('⚠️ Auto-migration check error:', err.message);
    }
  }

  app.listen(PORT, () => {
    const hostUrl = process.env.RENDER_EXTERNAL_URL || process.env.CLIENT_URL || `http://localhost:${PORT}`;
    console.log(`
╔══════════════════════════════════════════════╗
║                                              ║
║   🏛️  The Church of New Generation           ║
║   Server running on port ${PORT}               ║
║   Environment: ${process.env.NODE_ENV || 'development'}              ║
║                                              ║
║   URL:   ${hostUrl}
║   Admin: ${hostUrl}/admin
║   API:   ${hostUrl}/api
║                                              ║
╚══════════════════════════════════════════════╝
    `);
  });
}

startServer();
