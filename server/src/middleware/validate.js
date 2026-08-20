/**
 * Joi Validation Middleware
 * Wraps Joi schemas into Express middleware
 */

/**
 * Validate request body against a Joi schema
 * @param {Joi.Schema} schema
 */
function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/"/g, '')
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors
      });
    }

    req.body = value;
    next();
  };
}

/**
 * Validate request query params against a Joi schema
 * @param {Joi.Schema} schema
 */
function validateQuery(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/"/g, '')
      }));

      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters.',
        errors
      });
    }

    req.query = value;
    next();
  };
}

/**
 * Validate request params against a Joi schema
 * @param {Joi.Schema} schema
 */
function validateParams(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request parameters.',
        errors: error.details.map(d => ({ field: d.path.join('.'), message: d.message.replace(/"/g, '') }))
      });
    }

    req.params = value;
    next();
  };
}

module.exports = { validateBody, validateQuery, validateParams };
