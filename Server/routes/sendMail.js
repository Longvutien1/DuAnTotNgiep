import express from "express";

import { changeOTP, loginEmail } from "../controllers/otpEmail";
import { changePassword, userByEmail, userById } from "../controllers/user";


const routerEmail = express.Router()

// routerEmail.post("/sendMail", userByEmail, addMail)
routerEmail.put('/newPassword',changePassword);
routerEmail.post('/sendMail',userByEmail, loginEmail);
routerEmail.post('/changeOTP',changeOTP);

export default routerEmail