import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validateRequest =
  (zodSchema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // req.body =JSON.parse(req.body.data || {}) || req.body
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }
      req.body = await zodSchema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };

// import { Request, Response, NextFunction } from "express";
// import { ZodSchema } from "zod";

// export const validateBody =
//   (schema: ZodSchema<any>) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     const result = schema.safeParse(req.body);
//     if (!result.success) {
//       // Map Zod errors to a friendly shape
//       const errors = result.error.format();
//       return res.status(400).json({
//         status: "error",
//         message: "Validation failed",
//         errors,
//       });
//     }
//     // put parsed data back to body so downstream handlers get coerced types
//     req.body = result.data;
//     return next();
//   };
