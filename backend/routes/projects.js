const express = require("express");
const router = express.Router();
const { getAllProjects, addProject } = require("../controllers/projectController");

// Routes
router.get("/", getAllProjects);
router.post("/", addProject);

module.exports = router;