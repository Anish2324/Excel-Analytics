import mongoose from "mongoose";

const excelRowSchema = new mongoose.Schema({
  data: { type: Object }, // one object per row
  fileRef: { type: mongoose.Schema.Types.ObjectId, ref: "ExcelFile" },
});

const ExcelData = mongoose.model("ExcelData", excelRowSchema);

export default ExcelData;