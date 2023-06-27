import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

const { accountController} = controllers;

router.post(
    '/update-profile',
    accountController.updateProfile
);




export default router;