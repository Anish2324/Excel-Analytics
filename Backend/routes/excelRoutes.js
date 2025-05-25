import express from "express";
import upload from "../config/multer.js";
import * as excelController from "../controllers/excelController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), excelController.uploadExcel);


export default router;