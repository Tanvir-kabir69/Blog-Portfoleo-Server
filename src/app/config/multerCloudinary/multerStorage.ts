import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryConfig } from "./cloudinary";

const createMulterStorage = (folderName: string) => {
  return new CloudinaryStorage({
    cloudinary: cloudinaryConfig,
    params: async (req, file) => {
      const fileName = file.originalname
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/\./g, "-")
        .replace(/[^a-z0-9\-\.]/g, "");

      const uniqueFileName =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        fileName;

      return {
        folder: folderName, // 🟢 dynamic Cloudinary folder
        public_id: uniqueFileName,
      };
    },
  });
};

export default createMulterStorage;
