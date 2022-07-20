import express from "express";
import { addMail } from "../controllers/sendMail";
import { changePassword, userByEmail, userById } from "../controllers/user";


const routerEmail = express.Router()

routerEmail.post("/sendMail", userByEmail, addMail)
routerEmail.put('/newPassword/:id',changePassword);

export default routerEmail