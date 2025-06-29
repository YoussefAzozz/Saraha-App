import { Router } from "express";
import * as messageController from "./controller/Message.js";
import { auth } from "../auth/controller/Middleware.js";
import { validationMethod } from "../../validation/RequestMethodsValidation.js";
import * as messageValidators from "../../validation/Message.Validation.js";


const router = Router();


router.get("/getAllMessages",auth,messageController.getAllMessages);
router.post("/addMessage/:userId",validationMethod(messageValidators.addMessageSchema),auth,messageController.addMessage);
router.delete("/deleteMessage/:messageID",validationMethod(messageValidators.messageUserIDs),auth,messageController.deleteMessage);
router.put("/updateMessage/:messageID",validationMethod(messageValidators.deleteUpdateMessage),auth,messageController.updateMessage);


export default router;