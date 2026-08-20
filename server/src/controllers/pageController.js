/**
 * Pages, Services & Ministries Controller
 * Manages static/CMS pages, church service times, and ministries
 */
const { query } = require('../config/database');
const { success, created, notFound } = require('../utils/responseHandler');
const { uniqueSlug } = require('../utils/slugify');

// ═══════════════════════════════════════
// PAGES CMS
// ═══════════════════════════════════════

async function getPageBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const pages = await query('SELECT * FROM pages WHERE slug = ? AND status = "published"', [slug]);
    if (pages.length === 0) {
      return notFound(res, 'Page not found');
    }
    return success(res, pages[0]);
  } catch (err) {
    next(err);
  }
}

async function getAdminPages(req, res, next) {
  try {
    const pages = await query(
      `SELECT p.*, CONCAT(u.first_name, ' ', u.last_name) as author_name
       FROM pages p
       LEFT JOIN users u ON p.author_id = u.id
       ORDER BY p.sort_order ASC, p.created_at DESC`
    );
    return success(res, pages);
  } catch (err) {
    next(err);
  }
}

async function createPage(req, res, next) {
  try {
    const { title, content, meta_title, meta_description, status, sort_order } = req.body;
    const slug = await uniqueSlug(title, 'pages', query);

    const result = await query(
      `INSERT INTO pages (title, slug, content, meta_title, meta_description, status, author_id, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, content || '', meta_title || title, meta_description || '', status || 'draft', req.user?.id || null, sort_order || 0]
    );

    return created(res, { id: result.insertId, slug }, 'Page created successfully');
  } catch (err) {
    next(err);
  }
}

async function updatePage(req, res, next) {
  try {
    const { id } = req.params;
    const { title, content, meta_title, meta_description, status, sort_order } = req.body;

    const existing = await query('SELECT id, slug FROM pages WHERE id = ?', [id]);
    if (existing.length === 0) {
      return notFound(res, 'Page not found');
    }

    let slug = existing[0].slug;
    if (title) {
      slug = await uniqueSlug(title, 'pages', query, id);
    }

    await query(
      `UPDATE pages SET title = ?, slug = ?, content = ?, meta_title = ?, meta_description = ?, status = ?, sort_order = ?
       WHERE id = ?`,
      [title, slug, content, meta_title, meta_description, status, sort_order || 0, id]
    );

    return success(res, { id, slug }, 'Page updated successfully');
  } catch (err) {
    next(err);
  }
}

async function deletePage(req, res, next) {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM pages WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return notFound(res, 'Page not found');
    }
    return success(res, null, 'Page deleted successfully');
  } catch (err) {
    next(err);
  }
}

// ═══════════════════════════════════════
// CHURCH SERVICES
// ═══════════════════════════════════════

async function getPublicServices(req, res, next) {
  try {
    const services = await query('SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC, id ASC');
    return success(res, services);
  } catch (err) {
    next(err);
  }
}

async function getAdminServices(req, res, next) {
  try {
    const services = await query('SELECT * FROM services ORDER BY sort_order ASC, id ASC');
    return success(res, services);
  } catch (err) {
    next(err);
  }
}

async function createService(req, res, next) {
  try {
    const { name, description, day_of_week, start_time, end_time, location, is_active, sort_order } = req.body;

    const result = await query(
      `INSERT INTO services (name, description, day_of_week, start_time, end_time, location, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, description || '', day_of_week || 'Sunday', start_time, end_time, location || '', is_active ? 1 : 0, sort_order || 0]
    );

    return created(res, { id: result.insertId }, 'Service added successfully');
  } catch (err) {
    next(err);
  }
}

async function updateService(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description, day_of_week, start_time, end_time, location, is_active, sort_order } = req.body;

    const result = await query(
      `UPDATE services SET name = ?, description = ?, day_of_week = ?, start_time = ?, end_time = ?,
                          location = ?, is_active = ?, sort_order = ?
       WHERE id = ?`,
      [name, description, day_of_week, start_time, end_time, location, is_active ? 1 : 0, sort_order || 0, id]
    );

    if (result.affectedRows === 0) {
      return notFound(res, 'Service not found');
    }

    return success(res, { id }, 'Service updated successfully');
  } catch (err) {
    next(err);
  }
}

async function deleteService(req, res, next) {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM services WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return notFound(res, 'Service not found');
    }
    return success(res, null, 'Service deleted successfully');
  } catch (err) {
    next(err);
  }
}

// ═══════════════════════════════════════
// MINISTRIES
// ═══════════════════════════════════════

async function getPublicMinistries(req, res, next) {
  try {
    const ministries = await query('SELECT * FROM ministries WHERE is_active = 1 ORDER BY sort_order ASC, id ASC');
    return success(res, ministries);
  } catch (err) {
    next(err);
  }
}

async function getAdminMinistries(req, res, next) {
  try {
    const ministries = await query('SELECT * FROM ministries ORDER BY sort_order ASC, id ASC');
    return success(res, ministries);
  } catch (err) {
    next(err);
  }
}

async function createMinistry(req, res, next) {
  try {
    const { name, description, leader, is_active, sort_order } = req.body;
    const slug = await uniqueSlug(name, 'ministries', query);
    const image = req.file ? req.file.url : (req.body.image || '');

    const result = await query(
      `INSERT INTO ministries (name, slug, description, image, leader, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, slug, description || '', image, leader || '', is_active ? 1 : 0, sort_order || 0]
    );

    return created(res, { id: result.insertId, slug }, 'Ministry added successfully');
  } catch (err) {
    next(err);
  }
}

async function updateMinistry(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description, leader, is_active, sort_order } = req.body;

    const existing = await query('SELECT id, slug FROM ministries WHERE id = ?', [id]);
    if (existing.length === 0) {
      return notFound(res, 'Ministry not found');
    }

    let slug = existing[0].slug;
    if (name) {
      slug = await uniqueSlug(name, 'ministries', query, id);
    }

    let imageSql = "";
    const params = [name, slug, description, leader, is_active ? 1 : 0, sort_order || 0];

    if (req.file) {
      imageSql = ", image = ?";
      params.push(req.file.url);
    }

    params.push(id);

    await query(
      `UPDATE ministries SET name = ?, slug = ?, description = ?, leader = ?, is_active = ?, sort_order = ?
                          ${imageSql}
       WHERE id = ?`,
      params
    );

    return success(res, { id, slug }, 'Ministry updated successfully');
  } catch (err) {
    next(err);
  }
}

async function deleteMinistry(req, res, next) {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM ministries WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return notFound(res, 'Ministry not found');
    }
    return success(res, null, 'Ministry deleted successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPageBySlug,
  getAdminPages,
  createPage,
  updatePage,
  deletePage,

  getPublicServices,
  getAdminServices,
  createService,
  updateService,
  deleteService,

  getPublicMinistries,
  getAdminMinistries,
  createMinistry,
  updateMinistry,
  deleteMinistry
};
