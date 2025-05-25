import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("spreadsheetml") || file.mimetype.includes("excel")) cb(null, true);
  else cb(new Error("Only Excel files allowed"), false);
};

const upload = multer({ storage, fileFilter });

export default upload;