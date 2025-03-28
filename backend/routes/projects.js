import express from "express";
const router = express.Router();
import { auth, authorize } from "../middleware/auth.js";
import { getAllProjects, addProject } from "../controllers/projectController.js";

// Routes
router.get("/", auth, authorize(["admin", "manager"]), getAllProjects);
router.post("/", auth, authorize(["admin", "manager"]), addProject);

export default router;