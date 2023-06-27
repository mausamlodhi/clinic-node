import { Router } from "express";
import controllers from "../controllers";
const {doctorClinicController} = controllers;
const router = Router();

router.post("/insertClinic",doctorClinicController.createClinicData);


export default router;