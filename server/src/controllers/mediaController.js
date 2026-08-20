/**
 * Media Library Controller
 * Manages media uploads, search, filtering, and metadata
 */
const { query } = require('../config/database');
const { success, created, paginated, notFound } = require('../utils/responseHandler');
const { parsePagination, buildPaginationMeta } = require('../utils/pagination');
const fs = require('fs');
const path = require('path');

async function getMedia(req, res, next) {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { type, search } = req.query; // type = 'image' | 'document'

    let whereClause = "WHERE 1=1";
    const params = [];

    if (type === 'image') {
      whereClause += " AND m.mime_type LIKE 'image/%'";
    } else if (type === 'document') {
      whereClause += " AND m.mime_type NOT LIKE 'image/%'";
    }

    if (search) {
      whereClause += " AND (m.original_name LIKE ? OR m.alt_text LIKE ?)";
      const term = `%${search}%`;
      params.push(term, term);
    }

    const countResult = await query(`SELECT COUNT(*) as total FROM media m ${whereClause}`, params);
    const totalItems = countResult[0]?.total || 0;

    const sql = `
      SELECT m.*, CONCAT(u.first_name, ' ', u.last_name) as uploaded_by_name
      FROM media m
      LEFT JOIN users u ON m.uploaded_by = u.id
      ${whereClause}
      ORDER BY m.created_at DESC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `;

    const mediaList = await query(sql, params);
    const pagination = buildPaginationMeta(totalItems, page, limit);

    return paginated(res, mediaList, pagination);
  } catch (err) {
    next(err);
  }
}

async function uploadMedia(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { alt_text } = req.body;
    const file = req.file;
    const url = `/uploads/${file.filename}`;

    const result = await query(
      `INSERT INTO media (filename, original_name, mime_type, size, path, url, alt_text, uploaded_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [file.filename, file.originalname, file.mimetype, file.size, file.path, url, alt_text || file.originalname, req.user?.id || null]
    );

    return created(res, {
      id: result.insertId,
      filename: file.filename,
      original_name: file.originalname,
      url,
      size: file.size,
      mime_type: file.mimetype
    }, 'Media uploaded successfully');
  } catch (err) {
    next(err);
  }
}

async function deleteMedia(req, res, next) {
  try {
    const { id } = req.params;

    const mediaItems = await query('SELECT * FROM media WHERE id = ?', [id]);
    if (mediaItems.length === 0) {
      return notFound(res, 'Media file not found');
    }

    const media = mediaItems[0];

    // Remove file from disk
    if (media.path && fs.existsSync(media.path)) {
      try {
        fs.unlinkSync(media.path);
      } catch (e) {
        console.error('File delete error:', e.message);
      }
    }

    await query('DELETE FROM media WHERE id = ?', [id]);
    return success(res, null, 'Media deleted successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMedia,
  uploadMedia,
  deleteMedia
};
