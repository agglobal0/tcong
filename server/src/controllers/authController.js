/**
 * Authentication Controller
 * Handles login, logout, and current user
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');
const { success, error, unauthorized } = require('../utils/responseHandler');
const { logActivity } = require('../middleware/activityLogger');
const { getClientIp } = require('../utils/helpers');

/**
 * POST /api/auth/login
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Find user with role
    const users = await query(
      `SELECT u.*, r.slug as role_slug, r.name as role_name
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.email = ?`,
      [email]
    );

    if (users.length === 0) {
      return unauthorized(res, 'Invalid email or password.');
    }

    const user = users[0];

    // Check if account is active
    if (!user.is_active) {
      return unauthorized(res, 'Your account has been deactivated. Contact an administrator.');
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return unauthorized(res, 'Invalid email or password.');
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role_slug },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Update last login
    await query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

    // Log activity
    logActivity(user.id, 'login', 'user', user.id, null, getClientIp(req));

    // Set httpOnly cookie
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge
    });

    return success(res, {
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
        role: user.role_slug,
        role_name: user.role_name
      },
      token
    }, 'Login successful');

  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/auth/logout
 */
async function logout(req, res) {
  if (req.user) {
    logActivity(req.user.id, 'logout', 'user', req.user.id, null, getClientIp(req));
  }

  res.clearCookie('token');
  return success(res, null, 'Logged out successfully');
}

/**
 * GET /api/auth/me
 */
async function getMe(req, res, next) {
  try {
    const users = await query(
      `SELECT u.id, u.email, u.first_name, u.last_name, u.phone, u.avatar, u.role_id,
              u.is_active, u.last_login, u.created_at,
              r.slug as role_slug, r.name as role_name
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.id = ?`,
      [req.user.id]
    );

    if (users.length === 0) {
      return unauthorized(res, 'User not found.');
    }

    const user = users[0];

    // Get user permissions
    const permissions = await query(
      `SELECT p.slug, p.module FROM permissions p
       JOIN role_permissions rp ON p.id = rp.permission_id
       WHERE rp.role_id = ?`,
      [user.role_id]
    );

    return success(res, {
      ...user,
      permissions: permissions.map(p => p.slug)
    });

  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/auth/change-password
 */
async function changePassword(req, res, next) {
  try {
    const { current_password, new_password } = req.body;

    const users = await query('SELECT password_hash FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) {
      return unauthorized(res, 'User not found.');
    }

    const isMatch = await bcrypt.compare(current_password, users[0].password_hash);
    if (!isMatch) {
      return error(res, 'Current password is incorrect.', 400);
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(new_password, salt);

    await query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, req.user.id]);

    logActivity(req.user.id, 'changed_password', 'user', req.user.id, null, getClientIp(req));

    return success(res, null, 'Password changed successfully.');

  } catch (err) {
    next(err);
  }
}

module.exports = { login, logout, getMe, changePassword };
