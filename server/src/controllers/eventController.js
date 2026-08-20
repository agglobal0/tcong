/**
 * Event Controller
 * Public & Admin endpoints for event management
 */
const { query } = require('../config/database');
const { success, created, paginated, notFound } = require('../utils/responseHandler');
const { parsePagination, buildPaginationMeta } = require('../utils/pagination');
const { uniqueSlug } = require('../utils/slugify');

/**
 * GET /api/events (Public)
 */
async function getPublicEvents(req, res, next) {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { category, type, featured } = req.query; // type = 'upcoming' | 'past'

    let whereClause = "WHERE e.status = 'published'";
    const params = [];

    if (type === 'upcoming') {
      whereClause += " AND e.event_date >= CURDATE()";
    } else if (type === 'past') {
      whereClause += " AND e.event_date < CURDATE()";
    }

    if (category) {
      whereClause += " AND ec.slug = ?";
      params.push(category);
    }
    if (featured === 'true' || featured === '1') {
      whereClause += " AND e.is_featured = 1";
    }

    const countResult = await query(
      `SELECT COUNT(*) as total FROM events e
       LEFT JOIN event_categories ec ON e.category_id = ec.id
       ${whereClause}`,
      params
    );
    const totalItems = countResult[0]?.total || 0;

    const sql = `
      SELECT e.*, ec.name as category_name, ec.slug as category_slug
      FROM events e
      LEFT JOIN event_categories ec ON e.category_id = ec.id
      ${whereClause}
      ORDER BY e.is_featured DESC, e.event_date ASC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `;

    const events = await query(sql, params);
    const pagination = buildPaginationMeta(totalItems, page, limit);

    return paginated(res, events, pagination);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/events/:id or :slug (Public)
 */
async function getEventById(req, res, next) {
  try {
    const { id } = req.params;
    const isId = /^\d+$/.test(id);

    const sql = `
      SELECT e.*, ec.name as category_name, ec.slug as category_slug
      FROM events e
      LEFT JOIN event_categories ec ON e.category_id = ec.id
      WHERE ${isId ? 'e.id = ?' : 'e.slug = ?'} AND e.status = 'published'
    `;

    const events = await query(sql, [id]);
    if (events.length === 0) {
      return notFound(res, 'Event not found');
    }

    return success(res, events[0]);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/events (Admin)
 */
async function getAdminEvents(req, res, next) {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { status, search } = req.query;

    let whereClause = "WHERE 1=1";
    const params = [];

    if (status) {
      whereClause += " AND e.status = ?";
      params.push(status);
    }
    if (search) {
      whereClause += " AND (e.title LIKE ? OR e.location LIKE ?)";
      const term = `%${search}%`;
      params.push(term, term);
    }

    const countResult = await query(`SELECT COUNT(*) as total FROM events e ${whereClause}`, params);
    const totalItems = countResult[0]?.total || 0;

    const sql = `
      SELECT e.*, ec.name as category_name
      FROM events e
      LEFT JOIN event_categories ec ON e.category_id = ec.id
      ${whereClause}
      ORDER BY e.event_date DESC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `;

    const events = await query(sql, params);
    const pagination = buildPaginationMeta(totalItems, page, limit);

    return paginated(res, events, pagination);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/events (Admin)
 */
async function createEvent(req, res, next) {
  try {
    const {
      title, description, event_date, start_time, end_time, location,
      maps_link, registration_link, livestream_link, category_id, category, status, is_featured
    } = req.body;

    const slug = await uniqueSlug(title, 'events', query);
    const featured_image = req.file ? req.file.url : (req.body.featured_image || '');

    let targetCategoryId = category_id || null;
    const catName = (category || '').trim();
    if (!targetCategoryId && catName) {
      const existingCat = await query('SELECT id FROM event_categories WHERE name = ? OR slug = ?', [catName, catName.toLowerCase()]);
      if (existingCat.length > 0) {
        targetCategoryId = existingCat[0].id;
      } else {
        const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const newCat = await query('INSERT INTO event_categories (name, slug) VALUES (?, ?)', [catName, catSlug || 'events']);
        targetCategoryId = newCat.insertId;
      }
    }

    const eventStatus = status || 'published';

    const result = await query(
      `INSERT INTO events (title, slug, description, featured_image, event_date, start_time, end_time,
                           location, maps_link, registration_link, livestream_link, category_id, status, is_featured, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, IF(? = 'published', NOW(), NULL))`,
      [
        title, slug, description || '', featured_image, event_date || new Date().toISOString().slice(0, 10),
        start_time || null, end_time || null, location || '',
        maps_link || '', registration_link || '', livestream_link || '',
        targetCategoryId, eventStatus, is_featured ? 1 : 0, eventStatus
      ]
    );

    return created(res, { id: result.insertId, slug }, 'Event created successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/admin/events/:id (Admin)
 */
async function updateEvent(req, res, next) {
  try {
    const { id } = req.params;
    const {
      title, description, event_date, start_time, end_time, location,
      maps_link, registration_link, livestream_link, category_id, category, status, is_featured
    } = req.body;

    const existing = await query('SELECT id, slug, status FROM events WHERE id = ?', [id]);
    if (existing.length === 0) {
      return notFound(res, 'Event not found');
    }

    let slug = existing[0].slug;
    if (title) {
      slug = await uniqueSlug(title, 'events', query, id);
    }

    let targetCategoryId = category_id || null;
    const catName = (category || '').trim();
    if (!targetCategoryId && catName) {
      const existingCat = await query('SELECT id FROM event_categories WHERE name = ? OR slug = ?', [catName, catName.toLowerCase()]);
      if (existingCat.length > 0) {
        targetCategoryId = existingCat[0].id;
      } else {
        const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const newCat = await query('INSERT INTO event_categories (name, slug) VALUES (?, ?)', [catName, catSlug || 'events']);
        targetCategoryId = newCat.insertId;
      }
    }

    let imageSql = "";
    const eventStatus = status || existing[0].status || 'published';
    const params = [
      title, slug, description, event_date, start_time, end_time,
      location, maps_link, registration_link, livestream_link, targetCategoryId, eventStatus, is_featured ? 1 : 0
    ];

    if (req.file) {
      imageSql = ", featured_image = ?";
      params.push(req.file.url);
    }

    params.push(id);

    await query(
      `UPDATE events SET title = ?, slug = ?, description = ?, event_date = ?, start_time = ?,
                        end_time = ?, location = ?, maps_link = ?, registration_link = ?,
                        livestream_link = ?, category_id = ?, status = ?, is_featured = ?
                        ${imageSql}
                        ${eventStatus === 'published' && existing[0].status !== 'published' ? ', published_at = NOW()' : ''}
       WHERE id = ?`,
      params
    );

    return success(res, { id, slug }, 'Event updated successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/admin/events/:id (Admin)
 */
async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM events WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return notFound(res, 'Event not found');
    }
    return success(res, null, 'Event deleted successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/event-categories (Public)
 */
async function getEventCategories(req, res, next) {
  try {
    const categories = await query('SELECT * FROM event_categories ORDER BY name ASC');
    return success(res, categories);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPublicEvents,
  getEventById,
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventCategories
};
