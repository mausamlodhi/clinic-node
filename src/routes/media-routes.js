import { Router, request, response } from "express";
import controllers from "../controllers";
import validations from "../validations";
import middlewares from "../middlewares";
const router = Router();
const { mediaValidator } = validations;
const { validateMiddleware } = middlewares;
const { mediaControllers } = controllers;

router.post(
    '/media/upload/:mediaFor/:mediaType', (request, response, next) => {
        Object.assign(request.params, { apiName: 'media' });
        next();
    }, (request, response, next) => {
        const { params } = request;
        Object.assign(request.body, params);
        next();
    },
    validateMiddleware({
        schema: mediaValidator.uploadSchema
    }),
    mediaControllers.uploadMedia
)
export default router;