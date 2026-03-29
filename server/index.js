import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import profileRoutes from "./routes/profileRoutes.js";

import offlinePlansRoutes from "./routes/offlinePlans.js";

import bookingRoutes from "./routes/bookingRoutes.js"
import router from "./routes/userRoutes.js";
import admin from "./routes/adminRoutes.js";
import planRoutes from "./routes/planRoutes.js";



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/api/profile", profileRoutes);
app.use("/user", router);
app.use("/admin", admin);
app.use("/plans", planRoutes);
app.use("/bookings", bookingRoutes);
app.use("/api/offline-plans", offlinePlansRoutes);


mongoose.connect('mongodb://mongodb:27017/Project').then(() => {
    console.log(" MongoDB connected successfully to Project");})
    .catch((error) => {
        console.error(" MongoDB connection failed:", error);
    });



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});