import Joi from "joi";
console.log("Yaha pe aa gya 1");
const patientProfileSchema = Joi.object({
    name : Joi.string().min(3).max(30).messages({
        "any.require" : "NAME_REQUIRED",
        "string.empty" : "NAME_REQUIRED",
        "string.min" : "NAME_MIN_VALIDAITON",
        "string.max" : "NAME_MAX_VALIDATION"
    }).required(),
    email : Joi.string().email({
        minDomainSegments : 2, tlds:{allow : false}
    }).min(6).max(50).messages({
        "any.required" : "EMAIL_REQUIRED",
        "string.empty" : "EMAIL_REQUIRED",
        "string.email" : "VALID_EMAIL_ALLOWED",
        "string.min" : "EMAIL_MIN_VALIDATION",
        "string.max" : "EMAIL_MAX_VALIDATION"
    }),
    password : Joi.string().messages({
        "string.empty" : "PASSWORD_REQUIRED",
        "string.require" : "PASSWORD_REQUIRED"
    }),
    contact : Joi.string().regex(/^[0-9]{10,15}$/).messages({
        "string.pattern.base" : "ONLY_NUMERIC_ALLOWED",
        "string.length" : "CONTACT_MAX_VALIDATION"
    }),
    profileImage : Joi.string().optional().empty().allow(""),
    gender : Joi.string().valid("male","female","other").required(),
    dateOfBirth : Joi.date().required().messages({
        "date.formate" : "DATE_OF_BIRTH_FORMATE",
        "any.required" : "DATE_OF_BIRTH_REQUIRED"
    })
});
const logInSchema = Joi.object({
    email : Joi.string().email({
        minDomainSegments : 2, tlds:{allow : false}
    }).min(6).max(50).messages({
        "any.required" : "EMAIL_REQUIRED",
        "string.empty" : "EMAIL_REQUIRED",
        "string.email" : "VALID_EMAIL_ALLOWED",
        "string.min" : "EMAIL_MIN_VALIDATION",
        "string.max" : "EMAIL_MAX_VALIDATION"
    }),
    password : Joi.string().messages({
        "string.empty" : "PASSWORD_REQUIRED",
        "string.require" : "PASSWORD_REQUIRED"
    })
})
export default {
    patientProfileSchema,
    logInSchema
}