import { Router } from 'express';
import account from './account';
import media from './media-routes.js';
import user from "./user";
import admin from './admin';

const router = Router();
const register = (app) => {
    app.use(router);
    router.use('/api', [
        account,  
        media,
        user,
        admin
    ])
}

export default register;
