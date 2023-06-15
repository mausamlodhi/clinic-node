import patientRoute from "./patient-routes.js";
import media from './media-routes.js';
import { Router } from "express";
const router = Router();
const register = (app)=>{
    app.use(router);
    router.use("/api",[
        media,
        patientRoute,

    ]);
};
export default register; 