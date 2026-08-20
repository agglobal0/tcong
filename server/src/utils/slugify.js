/**
 * URL Slug Generator
 * Creates SEO-friendly URL slugs from text
 */

/**
 * Generate a URL-safe slug from text
 * @param {string} text - Input text
 * @returns {string} URL-safe slug
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')     // Remove non-word characters
    .replace(/\-\-+/g, '-')      // Replace multiple hyphens with single
    .replace(/^-+/, '')           // Trim leading hyphens
    .replace(/-+$/, '');          // Trim trailing hyphens
}

/**
 * Generate a unique slug by checking the database
 * @param {string} text - Input text
 * @param {string} table - Table name to check against
 * @param {Function} queryFn - Database query function
 * @param {number|null} excludeId - ID to exclude (for updates)
 * @returns {Promise<string>} Unique slug
 */
async function uniqueSlug(text, table, queryFn, excludeId = null) {
  let slug = slugify(text);
  let counter = 0;
  let candidate = slug;

  while (true) {
    let rows;
    if (excludeId) {
      rows = await queryFn(`SELECT id FROM ${table} WHERE slug = ? AND id != ?`, [candidate, excludeId]);
    } else {
      rows = await queryFn(`SELECT id FROM ${table} WHERE slug = ?`, [candidate]);
    }

    if (rows.length === 0) {
      return candidate;
    }

    counter++;
    candidate = `${slug}-${counter}`;
  }
}

module.exports = { slugify, uniqueSlug };
