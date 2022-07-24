import express  from "express"
import { changePassword, deleteUser, getUser, signIn, signUp, updateUser, userDetail } from "../controllers/user";

const routeAuth = express.Router();

routeAuth.post('/signup',signUp);
routeAuth.post('/signin',signIn);
routeAuth.get('/users/:id',userDetail);
routeAuth.get('/users',getUser);
routeAuth.put('/users/:id',updateUser);
routeAuth.delete('/users/:id',deleteUser);


export default routeAuth;
