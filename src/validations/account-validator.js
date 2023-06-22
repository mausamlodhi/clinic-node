import Joi from 'joi';
const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
        .min(6)
        .max(50)
        .messages({
            'string.empty': 'EMAIL_REQUIRED',
            'any.required': 'EMAIL_REQUIRED',
            'string.email': 'VALID_EMAIL_ALLOWED',
            'string.min': 'EMAIL_MIN_VALIDATION',
            'string.max': 'EMAIL_MAX_VALIDATION',
        })
        .required(),
    password: Joi.string()
        .messages({
            'string.empty': 'PASSWORD_REQUIRED',
            'any.required': 'PASSWORD_REQUIRED',
        })
        .required(),
});



const adminForgotPasswordSchema = Joi.object().keys({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
        .min(6)
        .max(50)
        .messages({
            'string.empty': 'EMAIL_REQUIRED',
            'any.required': 'EMAIL_REQUIRED',
            'string.email': 'VALID_EMAIL_ALLOWED',
            'string.min': 'EMAIL_MIN_VALIDATION',
            'string.max': 'EMAIL_MAX_VALIDATION',
        })
        .required(),
});

const userCreateSchema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(20)
      .messages({
        'any.required': 'FIRST_NAME_REQUIRED',
        'string.empty': 'FIRST_NAME_REQUIRED',
        'string.min': 'FIRST_NAME_MIN_VALIDATION',
        'string.max': 'FIRST_NAME_MAX_VALIDATION',
      })
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .min(6)
      .max(50)
      .messages({
        'any.required': 'EMAIL_REQUIRED',
        'string.empty': 'EMAIL_REQUIRED',
        'string.email': 'VALID_EMAIL_ALLOWED',
        'string.min': 'EMAIL_MIN_VALIDATION',
        'string.max': 'EMAIL_MAX_VALIDATION',
      })
      .required(),
    password: Joi.string()
      .min(6)
      .max(12)
      .regex(
        /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{6,}).*$/,
      )
      .messages({
        'string.pattern.base': 'PASSWORD_VALIDATION',
        'string.min': 'PASSWORD_MIN_VALIDATION',
        'string.max': 'PASSWORD_MAX_VALIDATION',
        'string.empty': 'PASSWORD_REQUIRED',
        'any.required': 'PASSWORD_REQUIRED',
      })
      .required(),
      //contact : Joi.string().empty().min(10).max(14).required(),
  });


export default {
    loginSchema,
    adminForgotPasswordSchema,
    userCreateSchema,
}