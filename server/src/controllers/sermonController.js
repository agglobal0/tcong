/**
 * Sermon Controller
 * Public & Admin endpoints for sermon management
 */
const { query } = require('../config/database');
const { success, created, paginated, notFound } = require('../utils/responseHandler');
const { parsePagination, buildPaginationMeta } = require('../utils/pagination');
const { extractYouTubeId } = require('../utils/helpers');

/**
 * GET /api/sermons (Public)
 */
async function getPublicSermons(req, res, next) {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { category, speaker, featured } = req.query;

    let whereClause = "WHERE s.status = 'published'";
    const params = [];

    if (category) {
      whereClause += " AND sc.slug = ?";
      params.push(category);
    }
    if (speaker) {
      whereClause += " AND s.speaker LIKE ?";
      params.push(`%${speaker}%`);
    }
    if (featured === 'true' || featured === '1') {
      whereClause += " AND s.is_featured = 1";
    }

    const countResult = await query(
      `SELECT COUNT(*) as total FROM sermons s
       LEFT JOIN sermon_categories sc ON s.category_id = sc.id
       ${whereClause}`,
      params
    );
    const totalItems = countResult[0]?.total || 0;

    const sql = `
      SELECT s.*, sc.name as category_name, sc.slug as category_slug
      FROM sermons s
      LEFT JOIN sermon_categories sc ON s.category_id = sc.id
      ${whereClause}
      ORDER BY s.is_featured DESC, s.sermon_date DESC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `;

    const sermons = await query(sql, params);
    const pagination = buildPaginationMeta(totalItems, page, limit);

    return paginated(res, sermons, pagination);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/sermons (Admin)
 */
async function getAdminSermons(req, res, next) {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { status, search } = req.query;

    let whereClause = "WHERE 1=1";
    const params = [];

    if (status) {
      whereClause += " AND s.status = ?";
      params.push(status);
    }
    if (search) {
      whereClause += " AND (s.title LIKE ? OR s.speaker LIKE ?)";
      const term = `%${search}%`;
      params.push(term, term);
    }

    const countResult = await query(`SELECT COUNT(*) as total FROM sermons s ${whereClause}`, params);
    const totalItems = countResult[0]?.total || 0;

    const sql = `
      SELECT s.*, sc.name as category_name
      FROM sermons s
      LEFT JOIN sermon_categories sc ON s.category_id = sc.id
      ${whereClause}
      ORDER BY s.created_at DESC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `;

    const sermons = await query(sql, params);
    const pagination = buildPaginationMeta(totalItems, page, limit);

    return paginated(res, sermons, pagination);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/sermons (Admin)
 */
async function createSermon(req, res, next) {
  try {
    const { title, description, speaker, youtube_url, sermon_date, category_id, category, is_featured, status } = req.body;

    const video_id = extractYouTubeId(youtube_url) || '';
    const thumbnail = req.file ? req.file.url : (req.body.thumbnail || '');

    let targetCategoryId = category_id || null;
    const catName = (category || '').trim();
    if (!targetCategoryId && catName) {
      const existingCat = await query('SELECT id FROM sermon_categories WHERE name = ? OR slug = ?', [catName, catName.toLowerCase()]);
      if (existingCat.length > 0) {
        targetCategoryId = existingCat[0].id;
      } else {
        const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const newCat = await query('INSERT INTO sermon_categories (name, slug) VALUES (?, ?)', [catName, catSlug || 'sermons']);
        targetCategoryId = newCat.insertId;
      }
    }

    const sermonStatus = status || 'published';

    const result = await query(
      `INSERT INTO sermons (title, description, speaker, thumbnail, youtube_url, video_id,
                            sermon_date, category_id, is_featured, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, description || '', speaker || 'Pastor', thumbnail,
        youtube_url || '', video_id, sermon_date || new Date().toISOString().slice(0, 10),
        targetCategoryId, is_featured ? 1 : 0, sermonStatus
      ]
    );

    return created(res, { id: result.insertId }, 'Sermon added successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/admin/sermons/:id (Admin)
 */
async function updateSermon(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, speaker, youtube_url, sermon_date, category_id, category, is_featured, status } = req.body;

    const video_id = extractYouTubeId(youtube_url) || '';
    const existing = await query('SELECT id, status FROM sermons WHERE id = ?', [id]);
    if (existing.length === 0) {
      return notFound(res, 'Sermon not found');
    }

    let targetCategoryId = category_id || null;
    const catName = (category || '').trim();
    if (!targetCategoryId && catName) {
      const existingCat = await query('SELECT id FROM sermon_categories WHERE name = ? OR slug = ?', [catName, catName.toLowerCase()]);
      if (existingCat.length > 0) {
        targetCategoryId = existingCat[0].id;
      } else {
        const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const newCat = await query('INSERT INTO sermon_categories (name, slug) VALUES (?, ?)', [catName, catSlug || 'sermons']);
        targetCategoryId = newCat.insertId;
      }
    }

    let thumbnailSql = "";
    const sermonStatus = status || existing[0].status || 'published';
    const params = [title, description, speaker, youtube_url, video_id, sermon_date, targetCategoryId, is_featured ? 1 : 0, sermonStatus];

    if (req.file) {
      thumbnailSql = ", thumbnail = ?";
      params.push(req.file.url);
    }

    params.push(id);

    const result = await query(
      `UPDATE sermons SET title = ?, description = ?, speaker = ?, youtube_url = ?,
                          video_id = ?, sermon_date = ?, category_id = ?, is_featured = ?, status = ?
                          ${thumbnailSql}
       WHERE id = ?`,
      params
    );

    if (result.affectedRows === 0) {
      return notFound(res, 'Sermon not found');
    }

    return success(res, { id }, 'Sermon updated successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/admin/sermons/:id (Admin)
 */
async function deleteSermon(req, res, next) {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM sermons WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return notFound(res, 'Sermon not found');
    }
    return success(res, null, 'Sermon deleted successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/sermon-categories (Public)
 */
async function getSermonCategories(req, res, next) {
  try {
    const categories = await query('SELECT * FROM sermon_categories ORDER BY name ASC');
    return success(res, categories);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPublicSermons,
  getAdminSermons,
  createSermon,
  updateSermon,
  deleteSermon,
  getSermonCategories
};
