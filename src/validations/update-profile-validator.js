import Joi from "joi";

const updateDoctorProfileSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .min(6)
    .max(50)
    .messages({
      "any.required": "EMAIL IS REQUIRED",
    })
    .required(),

  dateOfBirth: Joi.date().messages({
    "date.format": "date format is invalid",
    "any.required": "DATE is required",
  }),
  // .required()
  address: Joi.string().required(),
  experience: Joi.string().required(),
  specializationId: Joi.number().integer().required(),
});

const becomePatientProfileSchema = Joi.object({
  dateOfBirth: Joi.date().iso(),
  address: Joi.string(),
  insurance: Joi.string(),
  diabitic: Joi.string(),
});
const updatePatientProfileSchema = Joi.object({
  dateOfBirth: Joi.date().iso(),
  address: Joi.string(),
  insurance: Joi.string(),
  diabitic: Joi.string(),
});

export default {
  updateDoctorProfileSchema,
  updatePatientProfileSchema,
  becomePatientProfileSchema,
};
