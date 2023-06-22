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
    })
});
export default{
    uploadClinic
}