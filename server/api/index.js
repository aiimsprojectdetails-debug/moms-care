import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Working ✅",
  });
});

export default app;