import express from "express";

import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  searchPatients,
  patientStatistics,
  upcomingAppointments,
  highRiskPatients,
} from "../controllers/patientController.js";

import {
  protect,
  doctorOrAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================
   Patient Routes
========================================== */

// Create Patient
router.post(
  "/",
  protect,
  doctorOrAdmin,
  createPatient
);

// Get All Patients
router.get(
  "/",
  protect,
  getPatients
);

// Search Patients
router.get(
  "/search",
  protect,
  searchPatients
);

// Patient Statistics
router.get(
  "/statistics",
  protect,
  patientStatistics
);

// Upcoming Appointments
router.get(
  "/upcoming-appointments",
  protect,
  upcomingAppointments
);

// High Risk Patients
router.get(
  "/high-risk",
  protect,
  highRiskPatients
);

// Get Patient By ID
router.get(
  "/:id",
  protect,
  getPatientById
);

// Update Patient
router.put(
  "/:id",
  protect,
  doctorOrAdmin,
  updatePatient
);

// Delete Patient
router.delete(
  "/:id",
  protect,
  doctorOrAdmin,
  deletePatient
);

export default router;