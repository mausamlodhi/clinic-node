import { Router } from 'express';
import account from './account';
import media from './media-routes.js';
import user from "./user";
import admin from './admin';
import HttpStatus from 'http-status';

const router = Router();
const register = (app) => {
    app.use(router);
    router.use('/api', [
        account,
        media,
        user,
        admin,
    ]);

    app.use((error, req, res, next) => {
        let msg = "Internal server";
        const internalError = HttpStatus.INTERNAL_SERVER_ERROR;
        if (error) {
            console.log(error)
        }
        let statusCode = error?.status
            ? HttpStatus.BAD_REQUEST
            : internalError;
        if (error?.status === HttpStatus.UNAUTHORIZED) {
            statusCode = HttpStatus.UNAUTHORIZED;
            msg = "Unauthorized";
        }

        res.status(statusCode).json({
            success: false,
            data: null,
            error,
            message: msg,
        });
    });
}

export default register;
