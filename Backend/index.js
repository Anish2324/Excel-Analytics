import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { connectDB } from './lib/db.js';
import adminRoute from './routes/adminRoute.js'
import excelRoutes from './routes/excelRoutes.js'
import fs from 'fs';
import path from 'path';


const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/admin", adminRoute);
app.use("/excel", excelRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("mongoDB is connected to port : " + PORT);
  });
});