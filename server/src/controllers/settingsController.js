/**
 * Site Settings Controller
 * Handles reading and updating key-value site settings
 */
const { query } = require('../config/database');
const { success, error } = require('../utils/responseHandler');

/**
 * GET /api/settings (Public)
 * Returns key-value object of all settings
 */
async function getPublicSettings(req, res, next) {
  try {
    const rows = await query('SELECT setting_key, setting_value, setting_group FROM site_settings');
    const settings = {};
    rows.forEach(row => {
      if (row.setting_key && !row.setting_key.match(/^[0-9]+$/)) {
        settings[row.setting_key] = row.setting_value;
      }
    });
    return success(res, settings);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/settings (Admin)
 * Returns key-value object of all settings
 */
async function getAdminSettings(req, res, next) {
  try {
    const rows = await query('SELECT * FROM site_settings ORDER BY setting_group, id');
    const settingsObj = {};
    rows.forEach(row => {
      if (row.setting_key && !row.setting_key.match(/^[0-9]+$/)) {
        settingsObj[row.setting_key] = row.setting_value;
      }
    });
    return success(res, settingsObj);
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/admin/settings (Admin)
 * Updates settings from key-value object in req.body
 */
async function updateSettings(req, res, next) {
  try {
    const settings = req.body; // e.g. { church_name: '...', phone: '...' }
    
    if (settings && typeof settings === 'object') {
      for (const [key, value] of Object.entries(settings)) {
        // Skip numeric index keys if any slipped in
        if (!key || key.match(/^[0-9]+$/)) continue;

        const valStr = typeof value === 'object' ? JSON.stringify(value) : String(value ?? '');
        
        await query(
          `INSERT INTO site_settings (setting_key, setting_value, setting_group, setting_type)
           VALUES (?, ?, 'general', 'text')
           ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
          [key, valStr]
        );
      }
    }

    return success(res, null, 'Settings updated successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPublicSettings,
  getAdminSettings,
  updateSettings
};
