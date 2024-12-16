const Assignment = require("../models/Assignment");
const mongoose = require("mongoose");

// Get all assignments
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("candidate")
      .populate("project");
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign a project to a candidate
const assignProject = async (req, res) => {
  try {
    const { candidate, project } = req.body;

    if (!candidate || !project) {
      return res.status(400).json({ error: "Candidate and project are required." });
    }

    const assignment = new Assignment({
      candidate,
      project,
      progress: 0,
      score: 0,
      status: "In Progress",
    });

    await assignment.save();

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update progress and calculate score
const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Assignment ID." });
    }

    if (progress < 0 || progress > 100) {
      return res.status(400).json({ error: "Progress must be between 0 and 100." });
    }

    const score = progress * 10;

    const assignment = await Assignment.findByIdAndUpdate(
      id,
      { progress, score },
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found." });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllAssignments, assignProject, updateProgress };