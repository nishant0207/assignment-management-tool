import express from "express";
const router = express.Router();
import { check } from "express-validator";
import { register, login, registerCandidate } from "../controllers/authController.js";
import { auth, authorize } from "../middleware/auth.js";

// Register Route
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
  ],
  register
);

// Login Route
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

router.post("/register-candidate", auth, authorize(["admin", "manager"]), registerCandidate);

export default router;