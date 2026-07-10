import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  globalSearch,
} from "../controllers/searchController.js";

const router = express.Router();

/* ==========================================
   Global Search
   GET /api/search?q=...
========================================== */

router.get(
  "/",
  protect,
  globalSearch
);

export default router;