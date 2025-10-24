import { IRouter, Request, Response, Router } from "express";
import multerUpload from "./multer";

const multerRouter: IRouter = Router();

multerRouter.post(
  "/test-multer-with-single-file",
  multerUpload.single("file"),
  (req: Request, res: Response) => {
    console.log(req.file); // can get the file link
  }
);

multerRouter.post(
  "/test-multer-with-single-image",
  multerUpload.single("image"),
  (req: Request, res: Response) => {
    console.log(req.file); // can get the image link
  }
);

multerRouter.post(
  "/test-multer-with-multiple-images",
  multerUpload.array("images"),
  (req: Request, res: Response) => {
    console.log(req.files); // can get the images link array
  }
);

export default multerRouter;
