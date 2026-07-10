import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  createMedicine,
  getMedicines,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicineController.js";

const router = express.Router();

/* ==========================================
   Create Medicine
   POST /api/medicines/:patientId
========================================== */

router.post(
  "/:patientId",
  protect,
  createMedicine
);

/* ==========================================
   Get All Medicines
   GET /api/medicines
========================================== */

router.get(
  "/",
  protect,
  getAllMedicines
);

/* ==========================================
   Get All Medicines
   GET /api/medicines/:patientId
========================================== */

router.get(
  "/:patientId",
  protect,
  getMedicines
);

/* ==========================================
   Get Single Medicine
   GET /api/medicines/details/:id
========================================== */

router.get(
  "/details/:id",
  protect,
  getMedicineById
);

/* ==========================================
   Update Medicine
   PUT /api/medicines/details/:id
========================================== */

router.put(
  "/details/:id",
  protect,
  updateMedicine
);

/* ==========================================
   Delete Medicine
   DELETE /api/medicines/details/:id
========================================== */

router.delete(
  "/details/:id",
  protect,
  deleteMedicine
);

export default router;