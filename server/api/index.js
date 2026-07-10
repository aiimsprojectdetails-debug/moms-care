import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/db.js";

import authRoutes from "../routes/authRoutes.js";

dotenv.config();

await connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Database Connected",
  });
});

app.use("/api/auth", authRoutes);

export default app;