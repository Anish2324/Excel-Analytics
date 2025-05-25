import mongoose from "mongoose";

const excelFileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true }, // local or cloud path
  mimetype: { type: String, required: true },
  size: { type: Number },
  uploadedAt: { type: Date, default: Date.now },
});

const ExcelFile = mongoose.model("ExcelFile", excelFileSchema);

export default ExcelFile;