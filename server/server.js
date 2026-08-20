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
  }

  app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════╗
║                                              ║
║   🏛️  The Church of New Generation           ║
║   Server running on port ${PORT}               ║
║   Environment: ${process.env.NODE_ENV || 'development'}              ║
║                                              ║
║   Client: http://localhost:${PORT}              ║
║   Admin:  http://localhost:${PORT}/admin        ║
║   API:    http://localhost:${PORT}/api          ║
║                                              ║
╚══════════════════════════════════════════════╝
    `);
  });
}

startServer();
