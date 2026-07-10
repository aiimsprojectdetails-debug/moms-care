import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "../config/db.js";

import authRoutes from "../routes/authRoutes.js";
import projectRoutes from "../routes/projectRoutes.js";
import patientRoutes from "../routes/patientRoutes.js";
import dashboardRoutes from "../routes/dashboardRoutes.js";
import uploadRoutes from "../routes/uploadRoutes.js";
import ancVisitRoutes from "../routes/ancVisitRoutes.js";
import appointmentRoutes from "../routes/appointmentRoutes.js";
import medicineRoutes from "../routes/medicineRoutes.js";
import deliveryRoutes from "../routes/deliveryRoutes.js";
import searchRoutes from "../routes/searchRoutes.js";

dotenv.config();

await connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Mom's Care Backend Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/anc", ancVisitRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/search", searchRoutes);

export default app;