import { Router } from 'express';
import controllers from '../controllers';
import validations from '../validations';
import middlewares from '../middlewares';
const router = Router();

const {  doctorController} = controllers;
const { updateProfileValidator} = validations;
const { validateMiddleware } = middlewares;

router.post(
    '/become-doctor',
    validateMiddleware({
        schema: updateProfileValidator.updateDoctorProfileSchema
    }),
    doctorController.becomeDoctor
);


router.post(
    '/update-profile/doctor',
    validateMiddleware({
        schema: updateProfileValidator.updateDoctorProfileSchema
    }),
    doctorController.updateDoctorProfile
);



export default router;