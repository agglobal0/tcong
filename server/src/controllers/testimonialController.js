/**
 * Testimonials Controller
 * Approval workflow for church member testimonials
 */
const { query } = require('../config/database');
const { success, created, notFound } = require('../utils/responseHandler');

/**
 * GET /api/testimonials (Public)
 */
async function getPublicTestimonials(req, res, next) {
  try {
    const testimonials = await query(
      `SELECT * FROM testimonials
       WHERE status = 'published'
       ORDER BY is_featured DESC, created_at DESC`
    );
    return success(res, testimonials);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/testimonials (Admin)
 */
async function getAdminTestimonials(req, res, next) {
  try {
    const testimonials = await query('SELECT * FROM testimonials ORDER BY created_at DESC');
    return success(res, testimonials);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/testimonials (Admin)
 */
async function createTestimonial(req, res, next) {
  try {
    const { name, testimonial_text, category, is_featured, status } = req.body;
    const photo = req.file ? req.file.url : (req.body.photo || '');

    const result = await query(
      `INSERT INTO testimonials (name, photo, testimonial_text, category, is_featured, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, photo, testimonial_text, category || 'General', is_featured ? 1 : 0, status || 'draft']
    );

    return created(res, { id: result.insertId }, 'Testimonial added successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/admin/testimonials/:id (Admin)
 */
async function updateTestimonial(req, res, next) {
  try {
    const { id } = req.params;
    const { name, testimonial_text, category, is_featured, status } = req.body;

    let photoSql = "";
    const params = [name, testimonial_text, category, is_featured ? 1 : 0, status];

    if (req.file) {
      photoSql = ", photo = ?";
      params.push(req.file.url);
    }

    params.push(id);

    const result = await query(
      `UPDATE testimonials SET name = ?, testimonial_text = ?, category = ?, is_featured = ?, status = ?
                            ${photoSql}
       WHERE id = ?`,
      params
    );

    if (result.affectedRows === 0) {
      return notFound(res, 'Testimonial not found');
    }

    return success(res, { id }, 'Testimonial updated successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/admin/testimonials/:id (Admin)
 */
async function deleteTestimonial(req, res, next) {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM testimonials WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return notFound(res, 'Testimonial not found');
    }
    return success(res, null, 'Testimonial deleted successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPublicTestimonials,
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
