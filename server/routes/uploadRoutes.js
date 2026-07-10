import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", protect, (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Upload Middleware Error:");
      console.error(err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    next();
  });
}, uploadImage);

export default router;