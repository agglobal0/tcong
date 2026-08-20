/**
 * File Upload Middleware
 * Wraps multer with error handling and media library recording
 */
const { imageUpload, upload } = require('../config/multer');
const { query } = require('../config/database');
const path = require('path');

/**
 * Handle single image upload and record in media library
 * @param {string} fieldName - Form field name (default: 'image')
 */
function uploadSingleImage(fieldName = 'image') {
  return (req, res, next) => {
    imageUpload.single(fieldName)(req, res, (err) => {
      if (err) {
        return next(err);
      }
      // If file was uploaded, build the URL
      if (req.file) {
        req.file.url = `/uploads/${req.file.filename}`;
      }
      next();
    });
  };
}

/**
 * Handle multiple image uploads
 * @param {string} fieldName
 * @param {number} maxCount
 */
function uploadMultipleImages(fieldName = 'images', maxCount = 10) {
  return (req, res, next) => {
    imageUpload.array(fieldName, maxCount)(req, res, (err) => {
      if (err) {
        return next(err);
      }
      if (req.files) {
        req.files.forEach(file => {
          file.url = `/uploads/${file.filename}`;
        });
      }
      next();
    });
  };
}

/**
 * Handle general file upload (images + documents)
 * @param {string} fieldName
 */
function uploadSingleFile(fieldName = 'file') {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        return next(err);
      }
      if (req.file) {
        req.file.url = `/uploads/${req.file.filename}`;
      }
      next();
    });
  };
}

/**
 * Record uploaded file in the media library
 */
async function recordMedia(req, res, next) {
  if (req.file) {
    try {
      await query(
        `INSERT INTO media (filename, original_name, mime_type, size, path, url, uploaded_by)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          req.file.filename,
          req.file.originalname,
          req.file.mimetype,
          req.file.size,
          req.file.path,
          req.file.url,
          req.user?.id || null
        ]
      );
    } catch (error) {
      console.error('Media record error:', error.message);
    }
  }
  next();
}

module.exports = { uploadSingleImage, uploadMultipleImages, uploadSingleFile, recordMedia };
