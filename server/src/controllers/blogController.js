/**
 * Blog Controller
 * Public & Admin endpoints for blog management
 */
const { query } = require('../config/database');
const { success, created, paginated, notFound } = require('../utils/responseHandler');
const { parsePagination, buildPaginationMeta } = require('../utils/pagination');
const { uniqueSlug } = require('../utils/slugify');

/**
 * GET /api/blogs (Public)
 */
async function getPublicBlogs(req, res, next) {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { category, search, featured } = req.query;

    let whereClause = "WHERE b.status = 'published'";
    const params = [];

    if (category) {
      whereClause += " AND bc.slug = ?";
      params.push(category);
    }
    if (featured === 'true' || featured === '1') {
      whereClause += " AND b.is_featured = 1";
    }
    if (search) {
      whereClause += " AND (b.title LIKE ? OR b.content LIKE ? OR b.excerpt LIKE ?)";
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Count query
    const countResult = await query(
      `SELECT COUNT(*) as total FROM blogs b
       LEFT JOIN blog_categories bc ON b.category_id = bc.id
       ${whereClause}`,
      params
    );
    const totalItems = countResult[0]?.total || 0;

    // Data query
    const sql = `
      SELECT b.id, b.title, b.slug, b.excerpt, b.featured_image, b.is_featured,
             b.view_count, b.published_at, b.created_at,
             bc.name as category_name, bc.slug as category_slug,
             CONCAT(u.first_name, ' ', u.last_name) as author_name
      FROM blogs b
      LEFT JOIN blog_categories bc ON b.category_id = bc.id
      LEFT JOIN users u ON b.author_id = u.id
      ${whereClause}
      ORDER BY b.is_featured DESC, b.published_at DESC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `;

    const blogs = await query(sql, params);
    const pagination = buildPaginationMeta(totalItems, page, limit);

    return paginated(res, blogs, pagination);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/blogs/:slug (Public)
 */
async function getBlogBySlug(req, res, next) {
  try {
    const { slug } = req.params;

    const blogs = await query(
      `SELECT b.*, bc.name as category_name, bc.slug as category_slug,
              CONCAT(u.first_name, ' ', u.last_name) as author_name, u.avatar as author_avatar
       FROM blogs b
       LEFT JOIN blog_categories bc ON b.category_id = bc.id
       LEFT JOIN users u ON b.author_id = u.id
       WHERE b.slug = ? AND b.status = 'published'`,
      [slug]
    );

    if (blogs.length === 0) {
      return notFound(res, 'Blog post not found');
    }

    // Increment view count
    await query('UPDATE blogs SET view_count = view_count + 1 WHERE id = ?', [blogs[0].id]);

    return success(res, blogs[0]);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/blogs (Admin)
 */
async function getAdminBlogs(req, res, next) {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { status, search } = req.query;

    let whereClause = "WHERE 1=1";
    const params = [];

    if (status) {
      whereClause += " AND b.status = ?";
      params.push(status);
    }
    if (search) {
      whereClause += " AND (b.title LIKE ? OR b.excerpt LIKE ?)";
      const term = `%${search}%`;
      params.push(term, term);
    }

    const countResult = await query(`SELECT COUNT(*) as total FROM blogs b ${whereClause}`, params);
    const totalItems = countResult[0]?.total || 0;

    const sql = `
      SELECT b.*, bc.name as category_name,
             CONCAT(u.first_name, ' ', u.last_name) as author_name
      FROM blogs b
      LEFT JOIN blog_categories bc ON b.category_id = bc.id
      LEFT JOIN users u ON b.author_id = u.id
      ${whereClause}
      ORDER BY b.created_at DESC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `;

    const blogs = await query(sql, params);
    const pagination = buildPaginationMeta(totalItems, page, limit);

    return paginated(res, blogs, pagination);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/blogs (Admin)
 */
async function createBlog(req, res, next) {
  try {
    const { title, content, excerpt, category_id, category, status, is_featured, meta_title, meta_description } = req.body;

    const slug = await uniqueSlug(title, 'blogs', query);
    const featured_image = req.file ? req.file.url : (req.body.featured_image || '');

    let targetCategoryId = category_id || null;
    const catName = (category || '').trim();
    if (!targetCategoryId && catName) {
      const existingCat = await query('SELECT id FROM blog_categories WHERE name = ? OR slug = ?', [catName, catName.toLowerCase()]);
      if (existingCat.length > 0) {
        targetCategoryId = existingCat[0].id;
      } else {
        const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const newCat = await query('INSERT INTO blog_categories (name, slug) VALUES (?, ?)', [catName, catSlug || 'general']);
        targetCategoryId = newCat.insertId;
      }
    }

    const blogStatus = status || 'published';
    const blogExcerpt = excerpt || (content ? content.replace(/<[^>]*>?/gm, '').substring(0, 160) : '');
    const featuredVal = (is_featured === true || is_featured === 1 || is_featured === '1' || is_featured === 'true') ? 1 : 0;

    const result = await query(
      `INSERT INTO blogs (title, slug, content, excerpt, featured_image, author_id, category_id,
                          meta_title, meta_description, status, is_featured, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, IF(? = 'published', NOW(), NULL))`,
      [
        title, slug, content, blogExcerpt, featured_image,
        req.user?.id || null, targetCategoryId,
        meta_title || title, meta_description || blogExcerpt,
        blogStatus, featuredVal, blogStatus
      ]
    );

    return created(res, { id: result.insertId, slug }, 'Blog post created successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/admin/blogs/:id (Admin)
 */
async function updateBlog(req, res, next) {
  try {
    const { id } = req.params;
    const { title, content, excerpt, category_id, category, status, is_featured, meta_title, meta_description } = req.body;

    const existing = await query('SELECT id, slug, status, is_featured FROM blogs WHERE id = ?', [id]);
    if (existing.length === 0) {
      return notFound(res, 'Blog post not found');
    }

    let slug = existing[0].slug;
    if (title) {
      slug = await uniqueSlug(title, 'blogs', query, id);
    }

    let targetCategoryId = category_id || null;
    const catName = (category || '').trim();
    if (!targetCategoryId && catName) {
      const existingCat = await query('SELECT id FROM blog_categories WHERE name = ? OR slug = ?', [catName, catName.toLowerCase()]);
      if (existingCat.length > 0) {
        targetCategoryId = existingCat[0].id;
      } else {
        const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const newCat = await query('INSERT INTO blog_categories (name, slug) VALUES (?, ?)', [catName, catSlug || 'general']);
        targetCategoryId = newCat.insertId;
      }
    }

    let imageSql = "";
    const blogStatus = status || existing[0].status || 'published';
    const featuredVal = (is_featured === true || is_featured === 1 || is_featured === '1' || is_featured === 'true') ? 1 : 0;
    const params = [title, slug, content, excerpt, targetCategoryId, meta_title, meta_description, blogStatus, featuredVal];

    if (req.file) {
      imageSql = ", featured_image = ?";
      params.push(req.file.url);
    }

    params.push(id);

    await query(
      `UPDATE blogs SET title = ?, slug = ?, content = ?, excerpt = ?, category_id = ?,
                        meta_title = ?, meta_description = ?, status = ?, is_featured = ?
                        ${imageSql}
                        ${blogStatus === 'published' && existing[0].status !== 'published' ? ', published_at = NOW()' : ''}
       WHERE id = ?`,
      params
    );

    return success(res, { id, slug }, 'Blog post updated successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/admin/blogs/:id (Admin)
 */
async function deleteBlog(req, res, next) {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM blogs WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return notFound(res, 'Blog post not found');
    }
    return success(res, null, 'Blog post deleted successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/blog-categories (Public)
 */
async function getBlogCategories(req, res, next) {
  try {
    const categories = await query('SELECT * FROM blog_categories ORDER BY name ASC');
    return success(res, categories);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPublicBlogs,
  getBlogBySlug,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogCategories
};
