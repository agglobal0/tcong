/**
 * Express Application Setup
 * Configures all middleware, routes, and error handling
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const { apiLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ========================
// Security Middleware
// ========================
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false // Disable for dev — enable in production
}));

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ========================
// Body Parsing
// ========================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ========================
// Rate Limiting
// ========================
app.use('/api/', apiLimiter);

// ========================
// Static Files
// ========================
// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve client files (dist if built, otherwise client root)
const distPath = path.join(__dirname, '../../client/dist');
const clientPath = path.join(__dirname, '../../client');
if (require('fs').existsSync(distPath)) {
  app.use(express.static(distPath));
} else {
  app.use(express.static(clientPath));
}

// ========================
// API Routes
// ========================
const authRoutes = require('./routes/authRoutes');

// Auth
app.use('/api/auth', authRoutes);

// Public API routes
app.use('/api/blogs', require('./routes/public/blogRoutes'));
app.use('/api/events', require('./routes/public/eventRoutes'));
app.use('/api/sermons', require('./routes/public/sermonRoutes'));
app.use('/api/prayer-requests', require('./routes/public/prayerRoutes'));
app.use('/api/donations', require('./routes/public/donationRoutes'));
app.use('/api/contact', require('./routes/public/contactRoutes'));
app.use('/api/pages', require('./routes/public/pageRoutes'));
app.use('/api', require('./routes/public/settingsRoutes'));

// Admin API routes
app.use('/api/admin', require('./routes/admin/dashboardRoutes'));
app.use('/api/admin/blogs', require('./routes/admin/blogRoutes'));
app.use('/api/admin/events', require('./routes/admin/eventRoutes'));
app.use('/api/admin/sermons', require('./routes/admin/sermonRoutes'));
app.use('/api/admin/prayer-requests', require('./routes/admin/prayerRoutes'));
app.use('/api/admin/donations', require('./routes/admin/donationRoutes'));
app.use('/api/admin', require('./routes/admin/galleryRoutes'));
app.use('/api/admin', require('./routes/admin/contactRoutes'));
app.use('/api/admin', require('./routes/admin/pageRoutes'));
app.use('/api/admin', require('./routes/admin/settingsRoutes'));

// ========================
// Client-Side SPA Fallback Routing
// ========================
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'API endpoint not found' });
  }
  if (require('fs').existsSync(path.join(distPath, 'index.html'))) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    res.sendFile(path.join(clientPath, 'index.html'));
  }
});

// ========================
// Error Handler (must be last)
// ========================
app.use(errorHandler);

module.exports = app;
