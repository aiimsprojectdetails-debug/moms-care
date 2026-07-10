import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  createAppointment,
  getAppointments,
  getAllAppointments,
  getTodayAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";
const router = express.Router();

/* ==========================================
   Create Appointment
   POST /api/appointments/:patientId
========================================== */

router.post(
  "/:patientId",
  protect,
  createAppointment
);

/* ========================================== 
   Get All Appointments
   GET /api/appointments
========================================== */

router.get(
  "/",
  protect,
  getAllAppointments
);

/* ==========================================
   Get Today's Appointments
   GET /api/appointments/today
========================================== */

router.get(
  "/today",
  protect,
  getTodayAppointments
);

/* ==========================================
   Get Patient Appointments
   GET /api/appointments/:patientId
========================================== */

router.get(
  "/:patientId",
  protect,
  getAppointments
);

/* ==========================================
   Get Single Appointment
   GET /api/appointments/details/:id
========================================== */

router.get(
  "/details/:id",
  protect,
  getAppointmentById
);

/* ==========================================
   Update Appointment
   PUT /api/appointments/details/:id
========================================== */

router.put(
  "/details/:id",
  protect,
  updateAppointment
);

/* ==========================================
   Delete Appointment
   DELETE /api/appointments/details/:id
========================================== */

router.delete(
  "/details/:id",
  protect,
  deleteAppointment
);

export default router;