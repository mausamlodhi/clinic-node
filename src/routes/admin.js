import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

const { doctorController ,patientController,clinicController,adminController} = controllers;

router.get('/dashboard',adminController.dashboard)

router.get(
  '/getDoctorList',
  doctorController.getDoctors,
);

router.get(
    '/getPatientList',
  patientController.getPatients,
);

router.get
(
    '/getClinicList',
    clinicController.getClinics,
)

export default router;
