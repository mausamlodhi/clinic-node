import { Router } from 'express';
import account from './account';
import media from './media-routes.js';
import user from "./user";
import admin from './admin';
import clinics from "./clinic"
import clinicDoctor from "./doctorClinic-routes";
import userrole from "./userRoles";

const router = Router();
const register = (app) => {
    app.use(router);
    router.use('/api', [
        account,  
        media,
        user,
        admin,
        clinics,
        clinicDoctor,
        userrole,

    ])
}

export default register;
