const express = require("express");
const router = express.Router();
const { getAllCandidates, addCandidate } = require("../controllers/candidateController");

// Routes
router.get("/", getAllCandidates);
router.post("/", addCandidate);

module.exports = router;