/**
 * Standardized API Response Handler
 */

function success(res, data = null, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

function created(res, data = null, message = 'Created successfully') {
  return res.status(201).json({
    success: true,
    message,
    data
  });
}

function paginated(res, data, pagination, message = 'Success') {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination
  });
}

function error(res, message = 'Something went wrong', statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    message
  });
}

function notFound(res, message = 'Resource not found') {
  return res.status(404).json({
    success: false,
    message
  });
}

function unauthorized(res, message = 'Unauthorized') {
  return res.status(401).json({
    success: false,
    message
  });
}

function forbidden(res, message = 'Forbidden') {
  return res.status(403).json({
    success: false,
    message
  });
}

function validationError(res, errors, message = 'Validation failed') {
  return res.status(400).json({
    success: false,
    message,
    errors
  });
}

module.exports = { success, created, paginated, error, notFound, unauthorized, forbidden, validationError };
