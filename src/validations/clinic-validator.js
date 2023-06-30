import Joi from "joi";
const uploadClinic = Joi.object({
    name : Joi.string().required().messages({
        'any.string' : "CLINIC_NAME_REQUIRED",
        "any.require" : "CLINIC_NAME_REQUIRED",
    }),
    address : Joi.string().required().min(20).messages({
        "any.string" : "CLINIC_ADDRESS_REQUIRED",
        "any.require" : "CLINIC_ADDRESS_REQUIRED",
        "string.min" : "CLINIC_MINIMUM_VALIDATION_ERROR",
        "string.empty" : "CLINIC_ADDRESS_REQUIRED"
    }),
    contact : Joi.string().regex(/^[0-9]{10,15}$/).messages({
        "string.pattern.base" : "ONLY_NUMERIC_ALLOWED",
        "string.length" : "CONTACT_MAX_VALIDATION"
    }),
    image : Joi.string().required().messages({
        "string.empty" : "CLINIC_IMAGE_REQUIRED",
        "any.string" : "CLINIC_IMAGE_REQUIRED"
    }),
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
      .required(),email : Joi.string().required().email().messages({
        "stirng.empty":"EMAIL_REQUIRED",
    })
});
const updateClinic = Joi.object({
    name : Joi.string().required().messages({
        'any.string' : "CLINIC_NAME_REQUIRED",
        "any.require" : "CLINIC_NAME_REQUIRED",
    }).optional(),
    address : Joi.string().required().min(20).messages({
        "any.string" : "CLINIC_ADDRESS_REQUIRED",
        "any.require" : "CLINIC_ADDRESS_REQUIRED",
        "string.min" : "CLINIC_MINIMUM_VALIDATION_ERROR",
        "string.empty" : "CLINIC_ADDRESS_REQUIRED"
    }).optional(),
    contact : Joi.string().optional().regex(/^[0-9]{10,15}$/).messages({
        "string.pattern.base" : "ONLY_NUMERIC_ALLOWED",
        "string.length" : "CONTACT_MAX_VALIDATION"
    }),
    image : Joi.string().optional().messages({
        "string.empty" : "CLINIC_IMAGE_REQUIRED",
        "any.string" : "CLINIC_IMAGE_REQUIRED"
    })
});
export default{
    uploadClinic,
    updateClinic
}