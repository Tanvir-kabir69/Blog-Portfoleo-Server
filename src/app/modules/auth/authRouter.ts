import { IRouter, Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { loginSchema } from "./authValidation";
import { authController } from "./authController";

const authRouter: IRouter = Router()

authRouter.post('/login', validateRequest(loginSchema), authController.loginUser);
authRouter.post('/new-access-token', authController.newAccessToken);
authRouter.post('/logout', authController.logOut);

export default authRouter

// if isActive and isDelete is true, then, log out them. And when they try to log in redirect them to   reActive and reAdd page
// in case of isBlocked true, also try to implement this kind of functionality must be implemented