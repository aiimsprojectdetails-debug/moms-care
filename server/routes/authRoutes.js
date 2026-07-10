import express from "express";

import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
  logoutUser,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================
   Public Routes
========================================== */

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

/* ==========================================
   Protected Routes
========================================== */

// Get Logged-in User Profile
router.get("/profile", protect, getProfile);

// Logout User
router.post("/logout", protect, logoutUser);

export default router;