import express from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  searchProjects,
  projectStatistics,
} from "../controllers/projectController.js";

import {
  protect,
  doctorOrAdmin,
} from "../middleware/authMiddleware.js";

//import { protect } from "../middleware/authMiddleware.js";
//import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ==========================================
   Project Routes
========================================== */

// Create Project
router.post(
  "/",
  protect,
  doctorOrAdmin,
  createProject
);

// Get All Projects
router.get(
  "/",
  protect,
  getProjects
);

// Search Projects
router.get(
  "/search",
  protect,
  searchProjects
);

// Project Statistics
router.get(
  "/statistics",
  protect,
  projectStatistics
);

// Get Single Project
router.get(
  "/:id",
  protect,
  getProjectById
);

// Update Project
router.put(
  "/:id",
  protect,
  doctorOrAdmin,
  updateProject
);

// Delete Project
router.delete(
  "/:id",
  protect,
  doctorOrAdmin,
  deleteProject
);

export default router;