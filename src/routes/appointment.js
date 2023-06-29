import validations from "../validations";
import controllers from "../controllers";
import { Router } from "express";
import middleware from "../middlewares";
const router = Router();
const {appointmentController}=controllers;
router.post("/check-appointment",appointmentController.checkAppointment);
router.post("/create-appointment",appointmentController.makeAnAppointment);
export default router;