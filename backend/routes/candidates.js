import express from "express";
const router = express.Router();
import { getAllCandidates, addCandidate } from "../controllers/candidateController.js";

// Routes
router.get("/", getAllCandidates);
router.post("/", addCandidate);

export default router;