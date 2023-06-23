import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

const { doctorController ,patientController,clinicController} = controllers;


router.get(
  '/getDoctorList',
  doctorController.getDoctors,
);

router.get(
    '/getPatientList',
  patientController.getPatients,
);

export default router;
