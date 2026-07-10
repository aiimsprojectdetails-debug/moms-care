import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  createDelivery,
  getDeliveries,
  getAllDeliveries,
  getDeliveryById,
  updateDelivery,
  deleteDelivery,
} from "../controllers/deliveryController.js";

const router = express.Router();

/* ==========================================
   Create Delivery
========================================== */

router.post(
  "/:patientId",
  protect,
  createDelivery
);

/* ==========================================
   Get All Deliveries
   GET /api/deliveries
========================================== */

router.get(
  "/",
  protect,
  getAllDeliveries
);

/* ==========================================
   Get All Deliveries
========================================== */

router.get(
  "/:patientId",
  protect,
  getDeliveries
);

/* ==========================================
   Get Single Delivery
========================================== */

router.get(
  "/details/:id",
  protect,
  getDeliveryById
);

/* ==========================================
   Update Delivery
========================================== */

router.put(
  "/details/:id",
  protect,
  updateDelivery
);

/* ==========================================
   Delete Delivery
========================================== */

router.delete(
  "/details/:id",
  protect,
  deleteDelivery
);

export default router;