import multer from "multer";
import { v1 as uuidv1 } from 'uuid';
export default multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "./file/images");
    },
    filename(req, file, cb) {
      cb(null, uuidv1() + "." + file.originalname.split(".")[1]);
    },
  }),
});
