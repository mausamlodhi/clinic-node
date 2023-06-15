import { Router } from 'express';
import controllers from '../controllers';
import validations from '../validations';
import middlewares from '../middlewares';
const router = Router();

const { accountController } = controllers;
const { accountValidator } = validations;
const {validateMiddleware} = middlewares;
  
router.post("/doctor/signup",
validateMiddleware({ schema: accountValidator.userCreateSchema }),
accountController.signup);
router.post('/patient/signup', accountController.signup); 

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
    accountController.login,
  );

// router.post('/doctor/forgot-password', doctorController.doctorForgotPassword);

//router.post('/doctor/reset-password', doctorController.resetDoctorPassword);
export default router;