import { Router } from "express";
import controllers from "../controllers";
const router = Router();
const {userRoles} = controllers;
router.post("/assignRole",userRoles.assignRole);

export default router;