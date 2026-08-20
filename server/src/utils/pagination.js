/**
 * Pagination Helper
 * Generates pagination metadata and SQL LIMIT/OFFSET
 */
const { DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT } = require('../config/constants');

/**
 * Parse pagination parameters from query string
 * @param {Object} query - req.query
 * @returns {Object} { page, limit, offset }
 */
function parsePagination(queryParams) {
  let page = parseInt(queryParams.page, 10) || DEFAULT_PAGE;
  let limit = parseInt(queryParams.limit, 10) || DEFAULT_LIMIT;

  if (page < 1) page = 1;
  if (limit < 1) limit = DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

/**
 * Build pagination metadata
 * @param {number} totalItems - Total records in DB
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {Object} Pagination metadata
 */
function buildPaginationMeta(totalItems, page, limit) {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    currentPage: page,
    totalPages,
    totalItems,
    itemsPerPage: limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
}

module.exports = { parsePagination, buildPaginationMeta };
