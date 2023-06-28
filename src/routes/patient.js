import { Router } from "express";
import controllers from "../controllers";
import validations from "../validations";
import middlewares from "../middlewares";
const router = Router();

const { patientController } = controllers;
const { updateProfileValidator } = validations;
const { validateMiddleware } = middlewares;

router.post(
  "/become-patient",
  // validateMiddleware({
  //   schema: updateProfileValidator.updatePatientProfileSchema,
  // }),
  patientController.becomePatient
);

router.post(
  "/update-profile/patient",
  // validateMiddleware({
  //   schema: updateProfileValidator.updatePatientProfileSchema,
  // }),
  patientController.updatePatientProfile
);

export default router;
