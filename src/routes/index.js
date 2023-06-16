import { Router } from 'express';
import user from './account';
import media from './media-routes.js';

const router = Router();
const register = (app) => {
    app.use(router);
    router.use('/api', [
        user,  
        media,
    ])
}

export default register;
