import { Router } from 'express';
import controllers from '../controllers';
const router = Router();

const { accountController,
    doctorController,
    patientController,
     } = controllers;

router.post('/become-doctor', doctorController.becomeDoctor);
router.post('/become-patient', patientController.becomePatient);

router.post('/update-profile', accountController.updateProfile);
router.post('/update-profile/doctor', doctorController.updateDoctorProfile);
router.post('/update-profile/patient', patientController.updatePatientProfile);

export default router;