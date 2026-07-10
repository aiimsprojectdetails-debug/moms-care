import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  createAncVisit,
  getAncVisits,
  getAllAncVisits,
  getAncVisitById,
  updateAncVisit,
  deleteAncVisit,
} from "../controllers/ancVisitController.js";

const router = express.Router();

/* ==========================================
   Create ANC Visit
   POST /api/anc/:patientId
========================================== */

router.post(
  "/:patientId",
  protect,
  createAncVisit
);

/* ==========================================
   Get All ANC Visits
   GET /api/anc
========================================== */

router.get(
  "/",
  protect,
  getAllAncVisits
);

/* ==========================================
   Get All ANC Visits
   GET /api/anc/:patientId
========================================== */

router.get(
  "/:patientId",
  protect,
  getAncVisits
);

/* ==========================================
   Get Single ANC Visit
   GET /api/anc/visit/:id
========================================== */

router.get(
  "/visit/:id",
  protect,
  getAncVisitById
);

/* ==========================================
   Update ANC Visit
   PUT /api/anc/visit/:id
========================================== */

router.put(
  "/visit/:id",
  protect,
  updateAncVisit
);

/* ==========================================
   Delete ANC Visit
   DELETE /api/anc/visit/:id
========================================== */

router.delete(
  "/visit/:id",
  protect,
  deleteAncVisit
);

export default router;