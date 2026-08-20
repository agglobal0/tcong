/**
 * Activity Logger Middleware
 * Logs admin actions to the activity_logs table for audit trail
 */
const { query } = require('../config/database');

/**
 * Log an activity
 * @param {number} userId - User performing the action
 * @param {string} action - e.g. 'created', 'updated', 'deleted', 'login'
 * @param {string} entityType - e.g. 'blog', 'event', 'prayer_request'
 * @param {number|null} entityId - ID of the affected record
 * @param {string|null} details - Additional details
 * @param {string|null} ipAddress - Client IP
 */
async function logActivity(userId, action, entityType, entityId = null, details = null, ipAddress = null) {
  try {
    await query(
      `INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details, ip_address)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, action, entityType, entityId, details, ipAddress]
    );
  } catch (error) {
    // Don't throw — logging failure shouldn't break the request
    console.error('Activity log error:', error.message);
  }
}

/**
 * Express middleware that auto-logs after successful write operations
 */
function activityLoggerMiddleware(action, entityType) {
  return (req, res, next) => {
    // Store original json method
    const originalJson = res.json.bind(res);

    res.json = function (data) {
      // Log only on success responses for write operations
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        const entityId = data?.data?.id || req.params?.id || null;
        const ip = req.ip || req.connection?.remoteAddress;
        logActivity(req.user.id, action, entityType, entityId, null, ip);
      }
      return originalJson(data);
    };

    next();
  };
}

module.exports = { logActivity, activityLoggerMiddleware };
