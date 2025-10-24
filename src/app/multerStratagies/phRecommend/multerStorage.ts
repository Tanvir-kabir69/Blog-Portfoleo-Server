import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryConfiguration } from "../cloudinaryConfig/config";

const multerStorage = new CloudinaryStorage({
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
      folder: "uploads", // ✅ static folder
      public_id: uniqueFileName,
      resource_type: "auto",
    };
  },
});

export default multerStorage;
