import { Router } from "express";
import controllers from "../controllers";
import validations from "../validations";
const {scheduleController}=controllers;
const router = Router();

router.post("/create-schedule",scheduleController.getCreateSchedulee);
router.post("/all-schedules",scheduleController.getAllScheduleList);
export default router;