import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import connectDB from "../config/db.js";

import authRoutes from "../routes/authRoutes.js";

dotenv.config();

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

export default app;