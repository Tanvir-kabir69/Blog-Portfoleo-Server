import { IRouter, Router } from "express";
import { multerUpload } from "./multer";

const router: IRouter = Router();

// Upload to "projects" folder
router.post(
  "/upload/projects",
  multerUpload("projects").single("file"),
  (req, res) => {
    res.json({ url: req.file?.path });
  }
);

// Upload to "avatars" folder
router.post(
  "/upload/avatars",
  multerUpload("avatars").single("file"),
  (req, res) => {
    res.json({ url: req.file?.path });
  }
);
