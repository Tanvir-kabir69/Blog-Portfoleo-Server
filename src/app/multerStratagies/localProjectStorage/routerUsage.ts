import { IRouter, Router } from "express";
import { multerUpload } from "./multerDiskStorage";

const router: IRouter = Router();

// Route example
router.post("/upload/:folderName", multerUpload.single("file"), (req, res) => {
  console.log(req.file); // Uploaded file info
  res.json({
    success: true,
    message: "File uploaded successfully!",
    path: req.file?.path,
  });
});

// ✅ Example request:
// POST /upload/profile

// ➡️ File will be stored in:
// /uploads/profile/<timestamp>-filename.ext

// — this setup (with multer.diskStorage) stores files physically inside your project directory.
