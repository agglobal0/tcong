/**
 * User & Role Controller (Admin)
 * Manages admin users, roles, and permissions
 */
const bcrypt = require('bcryptjs');
const { query } = require('../config/database');
const { success, created, notFound, error } = require('../utils/responseHandler');

async function getUsers(req, res, next) {
  try {
    const users = await query(
      `SELECT u.id, u.email, u.first_name, u.last_name, u.phone, u.avatar, u.role_id,
              u.is_active, u.last_login, u.created_at,
              r.name as role_name, r.slug as role_slug
       FROM users u
       JOIN roles r ON u.role_id = r.id
       ORDER BY u.created_at DESC`
    );
    return success(res, users);
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const { email, password, first_name, last_name, phone, role_id } = req.body;

    const existing = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return error(res, 'User with this email already exists', 409);
    }

    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash(password, salt);

    const result = await query(
      `INSERT INTO users (email, password_hash, first_name, last_name, phone, role_id, is_active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [email, password_hash, first_name, last_name, phone || null, role_id]
    );

    return created(res, { id: result.insertId, email }, 'User created successfully');
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { email, first_name, last_name, phone, role_id, is_active, password } = req.body;

    const existing = await query('SELECT id FROM users WHERE id = ?', [id]);
    if (existing.length === 0) {
      return notFound(res, 'User not found');
    }

    let passwordSql = "";
    const params = [email, first_name, last_name, phone, role_id, is_active ? 1 : 0];

    if (password && password.trim().length >= 8) {
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(password.trim(), salt);
      passwordSql = ", password_hash = ?";
      params.push(hash);
    }

    params.push(id);

    await query(
      `UPDATE users SET email = ?, first_name = ?, last_name = ?, phone = ?, role_id = ?, is_active = ?
                        ${passwordSql}
       WHERE id = ?`,
      params
    );

    return success(res, { id }, 'User updated successfully');
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    // Prevent deleting self
    if (parseInt(id) === req.user.id) {
      return error(res, 'You cannot delete your own admin account', 400);
    }

    const result = await query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return notFound(res, 'User not found');
    }
    return success(res, null, 'User deleted successfully');
  } catch (err) {
    next(err);
  }
}

async function getRoles(req, res, next) {
  try {
    const roles = await query('SELECT * FROM roles ORDER BY id ASC');
    return success(res, roles);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getRoles
};
