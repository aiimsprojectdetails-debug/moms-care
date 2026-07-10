import express from "express";

import {
  dashboardOverview,
  dashboardStatistics,
  recentPatients,
  recentProjects,
  dashboardUpcomingAppointments,
  dashboardHighRiskPatients,
  monthlyAnalytics,
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================
   Dashboard Routes
========================================== */

// Dashboard Overview
router.get(
  "/",
  protect,
  dashboardOverview
);

// Dashboard Statistics
router.get(
  "/statistics",
  protect,
  dashboardStatistics
);

// Recent Patients
router.get(
  "/recent-patients",
  protect,
  recentPatients
);

// Recent Projects
router.get(
  "/recent-projects",
  protect,
  recentProjects
);

// Upcoming Appointments
router.get(
  "/upcoming-appointments",
  protect,
  dashboardUpcomingAppointments
);

// High Risk Patients
router.get(
  "/high-risk-patients",
  protect,
  dashboardHighRiskPatients
);

// Monthly Analytics
router.get(
  "/monthly-analytics",
  protect,
  monthlyAnalytics
);

export default router;