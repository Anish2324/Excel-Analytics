import ExcelFile from "../model/ExcelFile.js";
import ExcelData from "../model/ExcelData.js";
import xlsx from "xlsx";
import path from "path";

export const uploadExcel = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const excelFile = new ExcelFile({
      filename: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    });
    const savedFile = await excelFile.save();

    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const rowPromises = data.map((row) =>
      new ExcelData({ data: row, fileRef: savedFile._id }).save()
    );
    await Promise.all(rowPromises);

    res.status(201).json({ message: "File uploaded and parsed", file: savedFile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};