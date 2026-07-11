import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import ancVisitRoutes from "./routes/ancVisitRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

dotenv.config();

connectDB();

const app = express();

/* -----------------------------
   Middlewares
------------------------------ */

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

/* -----------------------------
   Static Upload Folder
------------------------------ */

app.use("/uploads", express.static("uploads"));

/* -----------------------------
   Test Route
------------------------------ */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Mom's Care Backend API ❤️",
  });
});

/* -----------------------------
   API Routes
------------------------------ */

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/patients", patientRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/anc", ancVisitRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/medicines", medicineRoutes);

app.use("/api/deliveries", deliveryRoutes);

app.use("/api/search", searchRoutes);

/* -----------------------------
   404 Route
------------------------------ */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

/* -----------------------------
   Global Error Handler
------------------------------ */

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* -----------------------------
   Server
------------------------------ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Mom's Care Backend running on http://localhost:${PORT}`);
});
