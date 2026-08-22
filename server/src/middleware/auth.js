/**
 * JWT Authentication Middleware
 * Verifies the JWT token from httpOnly cookie or Authorization header
 */
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

/**
 * Authenticate user — attaches req.user on success
 */
async function authenticate(req, res, next) {
  try {
    // Get token from cookie or Authorization header
    let token = req.cookies?.token;

    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in.'
      });
    }

    // Verify token
    const secret = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production';
    const decoded = jwt.verify(token, secret);

    // Fetch user from DB to ensure they still exist and are active
    const users = await query(
      `SELECT u.id, u.email, u.first_name, u.last_name, u.role_id, u.is_active,
              r.slug as role_slug, r.name as role_name
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.id = ? AND u.is_active = 1`,
      [decoded.id]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'User not found or account deactivated.'
      });
    }

    req.user = users[0];
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.'
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token.'
      });
    }
    next(error);
  }
}

/**
 * Optional authentication — doesn't fail if no token
 */
async function optionalAuth(req, res, next) {
  try {
    let token = req.cookies?.token;
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const users = await query(
        'SELECT id, email, first_name, last_name, role_id FROM users WHERE id = ? AND is_active = 1',
        [decoded.id]
      );
      if (users.length > 0) {
        req.user = users[0];
      }
    }
  } catch (e) {
    // Silently ignore — auth is optional
  }
  next();
}

module.exports = { authenticate, optionalAuth };
