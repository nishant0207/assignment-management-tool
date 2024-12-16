const express = require("express");
const router = express.Router();
const {
  getAllAssignments,
  assignProject,
  updateProgress,
} = require("../controllers/assignmentController");

// Routes
router.get("/", getAllAssignments);
router.post("/", assignProject);
router.put("/:id/progress", updateProgress);

module.exports = router;