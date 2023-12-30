import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import morgan from 'morgan';
import CategoryRoutes from "./routes/category.js";
import productRoutes from './routes/product.js';
import cors from 'cors';
dotenv.config();
const app = express();
//db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB ERROR=>", err));
//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


  //router middleware
app.use('/api',authRoutes) ;
app.use('/api',CategoryRoutes) ;
app.use('/api',productRoutes) ;
const port = process.env.PORT ||8000;
app.listen(8000, function () {
  console.log(`Node Server is running on port ${port}`);
});
