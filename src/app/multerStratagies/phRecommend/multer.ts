import multer from "multer";
import multerStorage from "./multerStorage";

const multerUpload = multer({ storage: multerStorage });

export default multerUpload;