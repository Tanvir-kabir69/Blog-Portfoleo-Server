import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryConfiguration } from "../cloudinaryConfig/config";

const multerStorage = new CloudinaryStorage({
  cloudinary: cloudinaryConfiguration,
  params: async (req, file) => {
    // Example: take folder name from route parameter or query
    const folderName = req.params.folderName || "default-folder";

    const fileName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\./g, "-")
      .replace(/[^a-z0-9\-\.]/g, "");

    // const extension = file.originalname.split(".").pop();

    const uniqueFileName =
      Math.random().toString(36).substring(2) +
      "-" +
      Date.now() +
      "-" +
      fileName 
      // +
      // "." +
      // extension;

    return {
      folder: folderName, // 🟢 dynamic Cloudinary folder
      public_id: uniqueFileName,
    };
  },
});

export default multerStorage;

// ✅ Result:
//     Sending a file to /upload/projects → stored in Cloudinary folder projects
//     Sending a file to /upload/avatars → stored in Cloudinary folder avatars
// No local folders created. Everything stays in Cloudinary.
