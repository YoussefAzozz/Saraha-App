import * as authController from "./controller/Authentication.js";
import * as validators from "../../validation/SchemaValidation.js";
import { Router } from "express";
import { validationMethod } from "../../validation/RequestMethodsValidation.js";
import { auth } from "./controller/Middleware.js";

const router = Router();

router.post("/signup",validationMethod(validators.signupSchema),authController.signup);
router.post("/login",validationMethod(validators.loginSchema),authController.login);
router.post("/signupwithgmail",authController.signupgmail);
router.get("/verify",auth,authController.confirmEmail);
router.get("/logout",auth,authController.logOut);

export default router;