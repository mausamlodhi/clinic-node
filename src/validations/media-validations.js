import Joi from "joi";
const uploadSchema = Joi.object({
    mediaFor : Joi.string().valid('patient','doctor','banners').messages({
        'any.only' : 'MEDIA_IS_REQUIRED'
    }).required(),
    mediaType : Joi.string().valid('image','audio','video','icon','file','media')
    .messages({
        'any.only' : 'MEDIA_TYPE_IS_REQUIRED'
    }).required(),
    apiname : Joi.string().optional().empty().allow(''),
});
export default {
    uploadSchema,
}