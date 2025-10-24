import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 👇 Pick your dynamic folder name from params, query, or body
    const folderName = req.params.folderName || "default";
    // 🧩 3️⃣ You can also base it on other dynamic data
    // For example:
    //     From req.user.id (if authenticated)
    //     From req.body.folderName
    //     From req.query.folder
    // Just modify this line:
    // const folderName = req.user?.id || req.body.folderName || "default";
    // const folderName = req.params.folderName || req.body.folderName || "default";

    // Construct the folder path
    const uploadPath = path.join(__dirname, "uploads", folderName);

    // Ensure folder exists
    fs.mkdirSync(uploadPath, { recursive: true });

    // Pass folder path to multer
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    // Keep original file name or make it unique
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

export const multerUpload = multer({ storage });

// ✅ Example request:
// POST /upload/profile

// ➡️ File will be stored in:
// /uploads/profile/<timestamp>-filename.ext

// — this setup (with multer.diskStorage) stores files physically inside your project directory.
