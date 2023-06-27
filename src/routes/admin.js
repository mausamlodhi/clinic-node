import { Router } from 'express';
import controllers from '../controllers';
import validations from '../validations';
import middlewares from '../middlewares';

const router = Router();

const { doctorController, patientController, clinicController, adminController } = controllers;
const { clinicValidator } = validations;
const { validateMiddleware } = middlewares;

router.get(
  '/admin/dashboard',
  adminController.dashboard
);

router.get(
  '/admin/getDoctorList',
  doctorController.getDoctors,
);

router.get(
  '/admin/specializationList',
  doctorController.specializationList
);

router.get(
  '/admin/getDoctorListCondition',
  doctorController.getDoctorListCondition
);

router.get(
  '/admin/getPatientList',
  patientController.getPatients,
);

router.get(
  '/admin/getList',
  clinicController.getList
);

router.get(
  '/admin/getClinicList',
  clinicController.getClinics
);

router.post(
  "/create-clinic",
  validateMiddleware({
    schema: clinicValidator.uploadClinic
  }),
  clinicController.createClinic
);

router.post(
  "/remove-clinic",
  clinicController.deleteClinic
);

export default router;
