import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";
import projectRoutes from "../routes/projectRoutes.js";
import patientRoutes from "../routes/patientRoutes.js"

import dashboardRoutes from "../routes/dashboardRoutes.js";
import ancVisitRoutes from "../routes/ancVisitRoutes.js";
import appointmentRoutes from "../routes/appointmentRoutes.js";
import medicineRoutes from "../routes/medicineRoutes.js";
import deliveryRoutes from "../routes/deliveryRoutes.js";
import searchRoutes from "../routes/searchRoutes.js";

dotenv.config();

console.log("CLIENT_URL =", process.env.CLIENT_URL);

await connectDB();

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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
    message: "Database Connected",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/patients", patientRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/anc", ancVisitRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/medicines", medicineRoutes);

app.use("/api/deliveries", deliveryRoutes);

app.use("/api/search", searchRoutes);

export default app;