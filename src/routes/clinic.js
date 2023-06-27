import { Router } from 'express';
import controllers from '../controllers';
import validations from '../validations';
import middlewares from '../middlewares';
const router = Router();

const { clinicController} = controllers;
const { clinicValidator } = validations;
const { validateMiddleware } = middlewares;

router.post(
    "/update-clinic",
    validateMiddleware({
        schema: clinicValidator.updateClinic
    }),
    clinicController.updateClinic
);

export default router;