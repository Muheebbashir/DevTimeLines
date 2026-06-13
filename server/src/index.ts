import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from "./config/db.js";
import { connectCloudinary } from "./utils/cloudinary.js"; // Import connectCloudinary
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import timelineRoutes from './routes/timeline.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import projectRoutes from "./routes/project.routes";

const app=express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/projects", projectRoutes);

connectDB();
connectCloudinary(); // Call it here

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`);
});