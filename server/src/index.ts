import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import cors from "cors";

dotenv.config();

const app=express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/users", userRoutes);

connectDB();

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`);
})