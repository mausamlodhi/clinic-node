import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

const { doctorController ,patientController,clinicController,adminController} = controllers;

router.get('/admin/dashboard',adminController.dashboard)

router.get(
  '/admin/getDoctorList',
  doctorController.getDoctors,
);
router.get('/admin/specializationList',doctorController.specializationList);

router.get('/admin/getDoctorListCondition',doctorController.getDoctorListCondition);

router.get(
    '/admin/getPatientList',
  patientController.getPatients,
);

router.get
(
    '/admin/getList',
    clinicController.getList,
)

router.get( '/admin/getClinicList',
clinicController.getClinics,)

export default router;
