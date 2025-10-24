import express from "express";
import { multerUpload } from "./multer";

const router = express.Router();

router.post(
  "/create",
  multerUpload("blog-portfolio/projects").array("images", 5)
);

// 🧩 1️⃣ If you use multer.single(fieldname)
router.post(
  "/upload",
  multerUpload("blog-portfolio/avaters").single("avatar"),
  (req, res) => {
    console.log(req.file); // single file object
  }
);
// ➡️ In your frontend FormData:
// const formData = new FormData();
// formData.append('avatar', fileInput.files[0]);

// 🧩 2️⃣ If you use multer.array(fieldname, maxCount)
router.post(
  "/upload",
  multerUpload("blog-portfolio/images").array("images", 5),
  (req, res) => {
    console.log(req.files); // array of file objects
  }
);
// ➡️ FormData:
// formData.append('images', file1);
// formData.append('images', file2);

// 🧩 3️⃣ If you use multer.fields([{ name: 'field1', maxCount: n }, ...])
const upload = multerUpload("blog-portfolio/different-fields").fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
  { name: 'gallery', maxCount: 5 }
]);
router.post('/upload', upload, (req, res) => {
  // console.log(req.files?.avatar);  // array of 1 file
  // console.log(req.files?.gallery); // array of multiple files
});
// ➡️ FormData:
// formData.append('avatar', avatarFile);
// formData.append('cover', coverFile);
// formData.append('gallery', file1);
// formData.append('gallery', file2);

// 🧩 4️⃣ Dynamically specifying fields
// If you don’t know which fields you’ll receive, you can use .any():
router.post('/upload', multerUpload("blog-portfolio/any").any(), (req, res) => {
  console.log(req.files); // array of all uploaded files
});


export default router;
