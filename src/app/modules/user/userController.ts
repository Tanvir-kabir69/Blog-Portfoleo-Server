import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./userServices";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import AppError from "../../utils/AppError";
import { UpdateFlag } from "./utils/updateUserFlag";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await userService.createUserIntoDB(data);

    if (result?.id && result?.email) {
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User is created successfully",
        data: {
          id: result.id,
          email: result.email,
        },
      });
      return;
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Something went Weong, please try again"
      );
    }
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const query = req.query
    const page = req?.query?.page ? Number(req.query.page) : 1;
    const limit = req?.query?.limit ? Number(req.query.limit) : 10;
    const search = req?.query?.search ? req.query.search : "";
    // const orderOn = req?.query?.orderOn ? req.query.orderOn : "id"
    // const allowedOrderOnFields = ["id", "name", "email","address", "dob", "createdAt"];
    // const orderOn = allowedOrderOnFields.includes(req.query.orderOn as string) ? (req.query.orderOn as string) : "id";
    // const orderBy = (req?.query?.orderBy === "asc" || req?.query?.orderBy === "desc")  ? (req.query.orderBy  as "asc" | "desc") : "asc"
    const allowedOrderOnFields = [
      "id",
      "name",
      "email",
      "address",
      "dob",
      "createdAt",
    ];
    const orderOn = allowedOrderOnFields.includes(req.query.orderOn as string)
      ? (req.query.orderOn as string)
      : "id";
    const orderBy =
      req?.query?.orderBy === "asc" || req?.query?.orderBy === "desc"
        ? (req.query.orderBy as "asc" | "desc")
        : "asc";

    const result = await userService.getAllUsersFromDB(
      search as string,
      page,
      limit,
      orderOn,
      orderBy
    );

    sendResponse(res, {
      success: true,
      message: "Users are retrived Successfully",
      statusCode: httpStatus.OK,
      data: result,
    });
  }
);

const getASingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await userService.getASingleUserFromDB(Number(id));

    if (result?.id && result?.email) {
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User is created successfully",
        data: result,
      });
      return;
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Something went Weong, please try again"
      );
    }
  }
);

const updateASingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const payload = req.body;
    const result = await userService.updateASingleUserIntoDB(id, payload);

    if (result?.id) {
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User is updated successfully",
        data: result,
      });
      return;
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Something went Weong, please try again"
      );
    }
  }
);

const updateUserFlagController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // ✅ Validate the incoming payload
    // const parsedData = updateUserFlagZodSchema.parse(req.body);
    const { id, action, actionValue } = req.body;

    // ✅ Update user based on action type
    const result = await userService.updateUserFlagService(
      id as number,
      action as UpdateFlag,
      actionValue as boolean
    );

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to update user. Please try again."
      );
    }

    // ✅ Success Response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `User ${action} status updated successfully`,
      data: result,
    });
  }
);

export const userController = {
  createUser,
  getAllUsers,
  getASingleUser,
  updateASingleUser,
  updateUserFlagController,
};
