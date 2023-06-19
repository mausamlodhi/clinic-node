import { Router } from 'express';
import controllers from '../controllers';
import validations from '../validations';
import middlewares from '../middlewares';
const router = Router();
const { accountController } = controllers;
const { accountValidator } = validations;
const {validateMiddleware} = middlewares;
router.post("/doctor/signup",accountController.signup);
router.post('/patient/signup',
validateMiddleware({ schema: accountValidator.userCreateSchema }),
 accountController.signup); 
router.post("/doctor/login", 
validateMiddleware({ schema: accountValidator.loginSchema })
,accountController.login);
router.post(
    '/patient/login',
    validateMiddleware({ schema: accountValidator.loginSchema }),
    accountController.login,
  );
router.post(
    '/admin/login',
    validateMiddleware({ schema: accountValidator.loginSchema }),
    accountController.adminLogin,
  );
router.post("/logout",accountController.logout);
router.post('/doctor/forgot-password', accountController.doctorForgotPassword);
router.post('/doctor/reset-password', accountController.resetDoctorPassword);
router.post('/update-profile',accountController.updateProfile);
export default router;