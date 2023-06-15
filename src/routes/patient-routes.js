import { Router } from "express";
import validations from "../validations";
import controllers from "../controllers";
import middlewares from "../middlewares";
const router = Router();
console.log("Index routes");
const {patientValidations} = validations;
const {patientController} = controllers;
const {validateMiddleware} = middlewares;
router.post("/signUp",validateMiddleware({schema:patientValidations.patientProfileSchema}),patientController.patientSignUp);

router.post("/signIn",validateMiddleware({schema:patientValidations.logInSchema}),patientController.patientLogIn)



export default router;