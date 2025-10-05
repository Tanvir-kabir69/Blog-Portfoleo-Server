import { IRouter, Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserSchema } from "./userValidation";
import { userController } from "./userController";

const userRouter: IRouter = Router();

userRouter.post("/", validateRequest(createUserSchema), userController.createUser)
userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getASingleUser)

export default userRouter;
