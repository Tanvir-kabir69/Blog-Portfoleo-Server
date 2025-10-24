import multer from "multer";
import createMulterStorage from "./multerStorage";

export const multerUpload = (folderName: string) => {
  const storage = createMulterStorage(folderName);
  return multer({ storage });
};