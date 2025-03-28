import express from "express";
const router = express.Router();
import { auth, authorize } from "../middleware/auth.js";
import {
  getAllAssignments,
  assignProject,
  updateAssignmentProgress,
  updateAssignmentStatus,
} from "../controllers/assignmentController.js";

// Routes
router.get("/", auth, getAllAssignments);
router.post("/", auth, authorize(["admin", "manager"]), assignProject);
router.put("/:id/progress", auth, authorize(["candidate"]), updateAssignmentProgress);
router.put("/:id/status", auth, authorize(["candidate"]), updateAssignmentStatus);

export default router;