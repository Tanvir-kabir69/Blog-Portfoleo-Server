import { IRouter, Router } from "express";
import multerUpload from "./multer";

const router: IRouter = Router();

router.post("/upload/:folderName", multerUpload.single("file"), (req, res) => {
  res.json({ fileUrl: req.file?.path });
});

// ✅ Result:
//     Sending a file to /upload/projects → stored in Cloudinary folder projects
//     Sending a file to /upload/avatars → stored in Cloudinary folder avatars
// No local folders created. Everything stays in Cloudinary.
