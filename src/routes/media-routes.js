import { Router, request, response } from "express";
import controllers from "../controllers";
import validations from "../validations";
import middlewares from "../middlewares";
const router = Router();
const {mediaValidations} = validations;
const {validateMiddleware} = middlewares;
const {mediaControllers} = controllers;
router.post('/media/upload/:mediaFor/:mediaType',(request,response,next)=>{
    console.log("Body : "+request.body);
    Object.assign(request.params,{apiName : 'media'});
        next();
    },(request,response,next)=>{
        const {params} = request;
        console.log("Body : "+request.body.image);
        console.log("Param"+params.mediaFor);
        Object.assign(request.body,params);
        next();
    },
    // validateMiddleware({schema : mediaValidations.uploadSchema}),
    mediaControllers.uploadMedia
)
export default router;