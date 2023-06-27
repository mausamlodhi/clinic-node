import { Router } from 'express';
import controllers from '../controllers';
import validations from '../validations';
import middlewares from '../middlewares';
const router = Router();
const { accountController } = controllers;
const { accountValidator } = validations;
const { validateMiddleware } = middlewares;

router.post(
  "/signup",
  validateMiddleware({
    schema: accountValidator.userCreateSchema
  }),
  accountController.signup
);

router.post(
  "/login",
  validateMiddleware({
    schema: accountValidator.loginSchema
  })
  , accountController.login
);

router.post(
  '/admin/login',
  validateMiddleware({
    schema: accountValidator.loginSchema
  }),
  accountController.adminLogin,
);

router.post(
  '/account/forgot-password',
  accountController.forgotPassword
);

router.post(
'/account/reset-password/:id',
 accountController.resetPassword
 );
export default router;