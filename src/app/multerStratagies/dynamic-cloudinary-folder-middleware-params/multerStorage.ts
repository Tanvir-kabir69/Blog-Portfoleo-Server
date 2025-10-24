import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryConfiguration } from "../cloudinaryConfig/config";

const createMulterStorage = (folderName: string) => {
  return new CloudinaryStorage({
    cloudinary: cloudinaryConfiguration,
    params: async (req, file) => {
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
};

export default createMulterStorage;
