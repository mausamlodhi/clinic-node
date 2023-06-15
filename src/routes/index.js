import { Router } from 'express';
import user from './account';
const router = Router();
const register = (app) => {
    app.use(router);
    router.use('/api', [
        user,  
    ])
}

export default register;