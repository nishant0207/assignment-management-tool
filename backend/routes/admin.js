import express from "express";
const router = express.Router();
import { auth, authorize } from "../middleware/auth.js";
import { getAllUsers, updateUserRole, deleteUser } from "../controllers/adminController.js";

// Admin Routes
router.get("/users", auth, authorize(["admin"]), getAllUsers);
router.put("/users/:id", auth, authorize(["admin"]), updateUserRole);
router.delete("/users/:id", auth, authorize(["admin"]), deleteUser);

export default router;