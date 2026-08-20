/**
 * Gallery Controller
 * Manages photo albums and gallery images
 */
const { query } = require('../config/database');
const { success, created, notFound } = require('../utils/responseHandler');

/**
 * GET /api/gallery (Public)
 */
async function getPublicAlbums(req, res, next) {
  try {
    const albums = await query(
      `SELECT a.*, COUNT(i.id) as image_count
       FROM gallery_albums a
       LEFT JOIN gallery_images i ON a.id = i.album_id
       WHERE a.is_published = 1
       GROUP BY a.id
       ORDER BY a.sort_order ASC, a.album_date DESC`
    );
    return success(res, albums);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/gallery/:albumId (Public)
 */
async function getAlbumImages(req, res, next) {
  try {
    const { albumId } = req.params;

    const albums = await query('SELECT * FROM gallery_albums WHERE id = ? AND is_published = 1', [albumId]);
    if (albums.length === 0) {
      return notFound(res, 'Album not found');
    }

    const images = await query(
      'SELECT * FROM gallery_images WHERE album_id = ? ORDER BY sort_order ASC, created_at DESC',
      [albumId]
    );

    return success(res, {
      album: albums[0],
      images
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/gallery (Admin)
 */
async function getAdminAlbums(req, res, next) {
  try {
    const albums = await query(
      `SELECT a.*, COUNT(i.id) as image_count
       FROM gallery_albums a
       LEFT JOIN gallery_images i ON a.id = i.album_id
       GROUP BY a.id
       ORDER BY a.created_at DESC`
    );
    return success(res, albums);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/gallery (Admin)
 */
async function createAlbum(req, res, next) {
  try {
    const { title, description, album_date, is_published, sort_order } = req.body;
    const cover_image = req.file ? req.file.url : (req.body.cover_image || '');

    const result = await query(
      `INSERT INTO gallery_albums (title, description, cover_image, album_date, is_published, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description || '', cover_image, album_date || new Date().toISOString().slice(0, 10), is_published ? 1 : 0, sort_order || 0]
    );

    return created(res, { id: result.insertId }, 'Album created successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/gallery/:albumId/images (Admin)
 */
async function uploadAlbumImages(req, res, next) {
  try {
    const { albumId } = req.params;
    const { caption } = req.body;

    const existing = await query('SELECT id FROM gallery_albums WHERE id = ?', [albumId]);
    if (existing.length === 0) {
      return notFound(res, 'Album not found');
    }

    const files = req.files || (req.file ? [req.file] : []);
    const insertedImages = [];

    for (const file of files) {
      const url = file.url || `/uploads/${file.filename}`;
      const result = await query(
        'INSERT INTO gallery_images (album_id, image_url, caption) VALUES (?, ?, ?)',
        [albumId, url, caption || file.originalname]
      );
      insertedImages.push({ id: result.insertId, image_url: url });
    }

    // Set first image as cover image if cover image is empty
    const album = await query('SELECT cover_image FROM gallery_albums WHERE id = ?', [albumId]);
    if (insertedImages.length > 0 && (!album[0]?.cover_image || album[0]?.cover_image === '')) {
      await query('UPDATE gallery_albums SET cover_image = ? WHERE id = ?', [insertedImages[0].image_url, albumId]);
    }

    return created(res, insertedImages, `${insertedImages.length} image(s) uploaded successfully`);
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/admin/gallery/images/:imageId (Admin)
 */
async function deleteGalleryImage(req, res, next) {
  try {
    const { imageId } = req.params;
    const result = await query('DELETE FROM gallery_images WHERE id = ?', [imageId]);
    if (result.affectedRows === 0) {
      return notFound(res, 'Image not found');
    }
    return success(res, null, 'Image deleted successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/admin/gallery/:id (Admin)
 */
async function deleteAlbum(req, res, next) {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM gallery_albums WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return notFound(res, 'Album not found');
    }
    return success(res, null, 'Album deleted successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPublicAlbums,
  getAlbumImages,
  getAdminAlbums,
  createAlbum,
  uploadAlbumImages,
  deleteGalleryImage,
  deleteAlbum
};
