import { Router } from "express";
import middlewares from "../../middlewares";
import validations from "../../validations";
import controllers from "../../controllers";
const router = Router();
const {clinicValidations} = validations;
const {clinicControllers} = controllers;
const {validateMiddleware} = middlewares;

router.post("/create-clinic",validateMiddleware({schema:clinicValidations.uploadClinic}),clinicControllers.createClinic);
router.get("/clinic-list",clinicControllers.getAllClinic);
router.post("/remove-clinic",clinicControllers.deleteClinic);
router.post("/update-clinic",validateMiddleware({schema:clinicValidations.updateClinic}),clinicControllers.updateClinic);


export default router;