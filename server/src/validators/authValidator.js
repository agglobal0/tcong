/**
 * Authentication Validators (Joi Schemas)
 */
const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required'
  })
});

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters'
  }),
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).required(),
  phone: Joi.string().max(20).allow('', null),
  role_id: Joi.number().integer().required()
});

const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  first_name: Joi.string().max(100),
  last_name: Joi.string().max(100),
  phone: Joi.string().max(20).allow('', null),
  role_id: Joi.number().integer(),
  is_active: Joi.boolean()
});

const changePasswordSchema = Joi.object({
  current_password: Joi.string().required(),
  new_password: Joi.string().min(8).required().messages({
    'string.min': 'New password must be at least 8 characters'
  })
});

module.exports = {
  loginSchema,
  createUserSchema,
  updateUserSchema,
  changePasswordSchema
};
