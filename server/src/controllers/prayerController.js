/**
 * Prayer Request Controller
 * Handles secure submission and role-restricted prayer request management
 */
const { query } = require('../config/database');
const { success, created, paginated, notFound } = require('../utils/responseHandler');
const { parsePagination, buildPaginationMeta } = require('../utils/pagination');

// Ensure 'type' column exists in prayer_requests table
(async () => {
  try {
    await query(`ALTER TABLE prayer_requests ADD COLUMN type VARCHAR(50) DEFAULT 'prayer_request' AFTER category`);
  } catch (e) {
    // Column already exists or table not yet created
  }
})();

/**
 * POST /api/prayer-requests (Public)
 * Submits a new prayer request. Never exposes existing requests.
 */
async function submitPrayerRequest(req, res, next) {
  try {
    const { name, email, phone, request_text, category, is_anonymous, consent, type, request_type } = req.body;
    
    const allowedCategories = ['family', 'career', 'education', 'spiritual', 'financial', 'relationships', 'health', 'other'];
    const validCategory = (category && allowedCategories.includes(String(category).toLowerCase())) 
      ? String(category).toLowerCase() 
      : 'other';

    const reqType = (type === 'lay_hand' || request_type === 'lay_hand' || (request_text && String(request_text).includes('[LAYING ON OF HANDS REQUEST]')))
      ? 'lay_hand'
      : 'prayer_request';

    let result;
    try {
      result = await query(
        `INSERT INTO prayer_requests (name, email, phone, request_text, category, is_anonymous, consent, status, priority, type)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'new', 'medium', ?)`,
        [
          is_anonymous ? 'Anonymous' : (name || 'Anonymous User'),
          email || null,
          phone || null,
          request_text,
          validCategory,
          is_anonymous ? 1 : 0,
          consent ? 1 : 0,
          reqType
        ]
      );
    } catch (insertErr) {
      // Fallback if 'type' column does not exist
      if (insertErr.code === 'ER_BAD_FIELD_ERROR' || (insertErr.message && insertErr.message.includes("Unknown column 'type'"))) {
        result = await query(
          `INSERT INTO prayer_requests (name, email, phone, request_text, category, is_anonymous, consent, status, priority)
           VALUES (?, ?, ?, ?, ?, ?, ?, 'new', 'medium')`,
          [
            is_anonymous ? 'Anonymous' : (name || 'Anonymous User'),
            email || null,
            phone || null,
            request_text,
            validCategory,
            is_anonymous ? 1 : 0,
            consent ? 1 : 0
          ]
        );
      } else {
        throw insertErr;
      }
    }

    // Create in-app notification for admin
    try {
      const isLayHand = reqType === 'lay_hand';
      await query(
        `INSERT INTO notifications (type, title, message, data)
         VALUES (?, ?, ?, ?)`,
        [
          isLayHand ? 'lay_hand_request' : 'prayer_request',
          isLayHand ? 'New Lay Hand Prayer Request' : 'New Prayer Request',
          `New ${isLayHand ? 'laying on of hands prayer request' : 'prayer request'} from ${is_anonymous ? 'Anonymous' : name} (${validCategory})`,
          JSON.stringify({ prayer_request_id: result.insertId, category: validCategory, type: reqType })
        ]
      );
    } catch (e) {
      console.error('Notification error:', e.message);
    }

    return created(res, { id: result.insertId }, 'Your prayer request has been received. Thank you for sharing it with us.');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/prayer-requests (Admin — Authorized Only)
 */
async function getAdminPrayerRequests(req, res, next) {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { status, category, priority, search, type } = req.query;

    let whereClause = "WHERE 1=1";
    const params = [];

    // Check if 'type' column exists in prayer_requests table
    let hasTypeCol = false;
    try {
      const colCheck = await query(
        "SELECT COUNT(*) as cnt FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'prayer_requests' AND column_name = 'type'"
      );
      hasTypeCol = colCheck[0]?.cnt > 0;
    } catch (e) {
      hasTypeCol = false;
    }

    // Filter by type: lay_hand vs prayer_request
    if (type === 'lay_hand') {
      if (hasTypeCol) {
        whereClause += " AND (pr.type = 'lay_hand' OR pr.request_text LIKE '%LAYING ON OF HANDS%' OR pr.request_text LIKE '%Attendance:%')";
      } else {
        whereClause += " AND (pr.request_text LIKE '%LAYING ON OF HANDS%' OR pr.request_text LIKE '%Attendance:%')";
      }
    } else if (type === 'prayer_request' || type === 'general') {
      if (hasTypeCol) {
        whereClause += " AND (pr.type IS NULL OR pr.type != 'lay_hand') AND (pr.request_text NOT LIKE '%LAYING ON OF HANDS%' AND pr.request_text NOT LIKE '%Attendance:%')";
      } else {
        whereClause += " AND (pr.request_text NOT LIKE '%LAYING ON OF HANDS%' AND pr.request_text NOT LIKE '%Attendance:%')";
      }
    }

    if (status) {
      whereClause += " AND pr.status = ?";
      params.push(status);
    }
    if (category) {
      whereClause += " AND pr.category = ?";
      params.push(category);
    }
    if (priority) {
      whereClause += " AND pr.priority = ?";
      params.push(priority);
    }
    if (search) {
      whereClause += " AND (pr.name LIKE ? OR pr.request_text LIKE ? OR pr.email LIKE ? OR pr.phone LIKE ?)";
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    const countResult = await query(`SELECT COUNT(*) as total FROM prayer_requests pr ${whereClause}`, params);
    const totalItems = countResult[0]?.total || 0;

    const sql = `
      SELECT pr.*, CONCAT(u.first_name, ' ', u.last_name) as assigned_to_name
      FROM prayer_requests pr
      LEFT JOIN users u ON pr.assigned_to = u.id
      ${whereClause}
      ORDER BY FIELD(pr.priority, 'urgent', 'high', 'medium', 'low'), pr.created_at DESC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `;

    const requests = await query(sql, params);
    const pagination = buildPaginationMeta(totalItems, page, limit);

    return paginated(res, requests, pagination);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/prayer-requests/:id (Admin — Authorized Only)
 */
async function getAdminPrayerRequestById(req, res, next) {
  try {
    const { id } = req.params;

    const requests = await query(
      `SELECT pr.*, CONCAT(u.first_name, ' ', u.last_name) as assigned_to_name
       FROM prayer_requests pr
       LEFT JOIN users u ON pr.assigned_to = u.id
       WHERE pr.id = ?`,
      [id]
    );

    if (requests.length === 0) {
      return notFound(res, 'Prayer request not found');
    }

    // Get internal notes
    const notes = await query(
      `SELECT prn.*, CONCAT(u.first_name, ' ', u.last_name) as author_name
       FROM prayer_request_notes prn
       LEFT JOIN users u ON prn.user_id = u.id
       WHERE prn.prayer_request_id = ?
       ORDER BY prn.created_at DESC`,
      [id]
    );

    return success(res, {
      ...requests[0],
      notes
    });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/admin/prayer-requests/:id (Admin — Authorized Only)
 * Update status, priority, assigned team member
 */
async function updateAdminPrayerRequest(req, res, next) {
  try {
    const { id } = req.params;
    const { status, priority, assigned_to } = req.body;

    const existing = await query('SELECT id FROM prayer_requests WHERE id = ?', [id]);
    if (existing.length === 0) {
      return notFound(res, 'Prayer request not found');
    }

    const updates = [];
    const params = [];

    if (status) {
      updates.push('status = ?');
      params.push(status);
    }
    if (priority) {
      updates.push('priority = ?');
      params.push(priority);
    }
    if (assigned_to !== undefined) {
      updates.push('assigned_to = ?');
      params.push(assigned_to || null);
    }

    if (updates.length > 0) {
      params.push(id);
      await query(`UPDATE prayer_requests SET ${updates.join(', ')} WHERE id = ?`, params);
    }

    return success(res, { id }, 'Prayer request updated successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/admin/prayer-requests/:id (Admin — Authorized Only)
 */
async function deleteAdminPrayerRequest(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await query('SELECT id FROM prayer_requests WHERE id = ?', [id]);
    if (existing.length === 0) {
      return notFound(res, 'Prayer request not found');
    }

    await query('DELETE FROM prayer_requests WHERE id = ?', [id]);
    return success(res, { id }, 'Prayer request deleted successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/prayer-requests/:id/notes (Admin — Authorized Only)
 * Add internal note to a prayer request
 */
async function addPrayerRequestNote(req, res, next) {
  try {
    const { id } = req.params;
    const { note } = req.body;

    if (!note || !note.trim()) {
      return res.status(400).json({ success: false, message: 'Note text is required' });
    }

    const result = await query(
      `INSERT INTO prayer_request_notes (prayer_request_id, user_id, note)
       VALUES (?, ?, ?)`,
      [id, req.user.id, note.trim()]
    );

    return created(res, { id: result.insertId }, 'Internal note added');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  submitPrayerRequest,
  getAdminPrayerRequests,
  getAdminPrayerRequestById,
  updateAdminPrayerRequest,
  deleteAdminPrayerRequest,
  addPrayerRequestNote
};
