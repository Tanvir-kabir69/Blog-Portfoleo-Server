import { IRouter, Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserSchema, updateUserFlagSchema, updateUserValidationSchema } from "./userValidation";
import { userController } from "./userController";

const userRouter: IRouter = Router();

userRouter.post("/", validateRequest(createUserSchema), userController.createUser)
userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getASingleUser)
userRouter.put("/update/:id", validateRequest(updateUserValidationSchema), userController.updateASingleUser)
userRouter.put('/update-user-status', validateRequest(updateUserFlagSchema), userController.updateUserFlagController)

export default userRouter;
