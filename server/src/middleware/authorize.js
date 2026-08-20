/**
 * Authorization Middleware — Role & Permission Based Access Control
 * Checks both role and granular permissions in the database
 */
const { query } = require('../config/database');
const { ROLES } = require('../config/constants');

/**
 * Require specific roles
 * @param  {...string} allowedRoles - Role slugs that are allowed
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    // Super admin bypasses all role checks
    if (req.user.role_slug === ROLES.SUPER_ADMIN) {
      return next();
    }

    if (!allowedRoles.includes(req.user.role_slug)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action.'
      });
    }

    next();
  };
}

/**
 * Require specific permission
 * @param {string} permissionSlug - e.g. 'blogs.create', 'prayer_requests.manage'
 */
function requirePermission(permissionSlug) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    // Super admin bypasses all permission checks
    if (req.user.role_slug === ROLES.SUPER_ADMIN) {
      return next();
    }

    try {
      const permissions = await query(
        `SELECT p.slug FROM permissions p
         JOIN role_permissions rp ON p.id = rp.permission_id
         WHERE rp.role_id = ? AND p.slug = ?`,
        [req.user.role_id, permissionSlug]
      );

      if (permissions.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to perform this action.'
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Require any of the given permissions
 * @param  {...string} permissionSlugs
 */
function requireAnyPermission(...permissionSlugs) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    if (req.user.role_slug === ROLES.SUPER_ADMIN) {
      return next();
    }

    try {
      const placeholders = permissionSlugs.map(() => '?').join(',');
      const permissions = await query(
        `SELECT p.slug FROM permissions p
         JOIN role_permissions rp ON p.id = rp.permission_id
         WHERE rp.role_id = ? AND p.slug IN (${placeholders})`,
        [req.user.role_id, ...permissionSlugs]
      );

      if (permissions.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to perform this action.'
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { requireRole, requirePermission, requireAnyPermission };
