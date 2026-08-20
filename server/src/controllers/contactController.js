/**
 * Contact & Communication Controller
 * Handles contact messages and newsletter subscriptions
 */
const { query } = require('../config/database');
const { success, created, paginated, notFound } = require('../utils/responseHandler');
const { parsePagination, buildPaginationMeta } = require('../utils/pagination');

/**
 * POST /api/contact (Public)
 */
async function submitContactMessage(req, res, next) {
  try {
    const { name, email, phone, subject, message } = req.body;

    const result = await query(
      `INSERT INTO contact_messages (name, email, phone, subject, message, is_read, is_archived)
       VALUES (?, ?, ?, ?, ?, 0, 0)`,
      [name, email, phone || null, subject || 'General Inquiry', message]
    );

    // Create admin notification
    try {
      await query(
        `INSERT INTO notifications (type, title, message, data)
         VALUES ('contact_message', 'New Contact Message', ?, ?)`,
        [
          `New message from ${name}: "${subject || 'General Inquiry'}"`,
          JSON.stringify({ message_id: result.insertId, email })
        ]
      );
    } catch (e) {}

    return created(res, { id: result.insertId }, 'Thank you for reaching out. We have received your message.');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/messages (Admin)
 */
async function getAdminContactMessages(req, res, next) {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { status, search } = req.query; // status = 'unread' | 'read' | 'archived'

    let whereClause = "WHERE 1=1";
    const params = [];

    if (status === 'unread') {
      whereClause += " AND cm.is_read = 0 AND cm.is_archived = 0";
    } else if (status === 'read') {
      whereClause += " AND cm.is_read = 1 AND cm.is_archived = 0";
    } else if (status === 'archived') {
      whereClause += " AND cm.is_archived = 1";
    } else {
      whereClause += " AND cm.is_archived = 0";
    }

    if (search) {
      whereClause += " AND (cm.name LIKE ? OR cm.email LIKE ? OR cm.subject LIKE ?)";
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    const countResult = await query(`SELECT COUNT(*) as total FROM contact_messages cm ${whereClause}`, params);
    const totalItems = countResult[0]?.total || 0;

    const sql = `
      SELECT cm.* FROM contact_messages cm
      ${whereClause}
      ORDER BY cm.is_read ASC, cm.created_at DESC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `;

    const messages = await query(sql, params);
    const pagination = buildPaginationMeta(totalItems, page, limit);

    return paginated(res, messages, pagination);
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/admin/messages/:id (Admin)
 */
async function updateContactMessage(req, res, next) {
  try {
    const { id } = req.params;
    const { is_read, is_archived } = req.body;

    const updates = [];
    const params = [];

    if (is_read !== undefined) {
      updates.push('is_read = ?');
      params.push(is_read ? 1 : 0);
    }
    if (is_archived !== undefined) {
      updates.push('is_archived = ?');
      params.push(is_archived ? 1 : 0);
    }

    if (updates.length > 0) {
      params.push(id);
      await query(`UPDATE contact_messages SET ${updates.join(', ')} WHERE id = ?`, params);
    }

    return success(res, { id }, 'Message updated');
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/admin/messages/:id (Admin)
 */
async function deleteContactMessage(req, res, next) {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM contact_messages WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return notFound(res, 'Message not found');
    }
    return success(res, null, 'Message deleted');
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/newsletter (Public)
 */
async function subscribeNewsletter(req, res, next) {
  try {
    const { email, name } = req.body;

    await query(
      `INSERT INTO newsletter_subscribers (email, name, is_active)
       VALUES (?, ?, 1)
       ON DUPLICATE KEY UPDATE is_active = 1, unsubscribed_at = NULL`,
      [email, name || null]
    );

    return success(res, null, 'Thank you for subscribing to our newsletter!');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/subscribers (Admin)
 */
async function getAdminSubscribers(req, res, next) {
  try {
    const subscribers = await query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC');
    return success(res, subscribers);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  submitContactMessage,
  getAdminContactMessages,
  updateContactMessage,
  deleteContactMessage,
  subscribeNewsletter,
  getAdminSubscribers
};
