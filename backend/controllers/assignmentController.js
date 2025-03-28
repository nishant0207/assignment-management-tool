import Assignment from "../models/Assignment.js";
import mongoose from "mongoose";

// Get all assignments
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("candidate", "name email")
      .populate("project", "title description");
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign a project to a candidate
const assignProject = async (req, res) => {
  try {
    const { candidate, project } = req.body;

    // Validate input
    if (!candidate || !project) {
      return res.status(400).json({ error: "Candidate and project are required." });
    }

    // Check if candidate exists
    const candidateExists = await Candidate.findById(candidate);
    if (!candidateExists) {
      return res.status(404).json({ error: "Candidate not found." });
    }

    // Check if project exists
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ error: "Project not found." });
    }

    // Check if the project is already assigned
    if (projectExists.status === "Assigned") {
      return res.status(400).json({ error: "Project is already assigned." });
    }

    // Create the assignment
    const assignment = new Assignment({
      candidate,
      project,
      progress: 0,
      score: 0,
      status: "Pending",
    });

    // Save the assignment
    await assignment.save();

    // Update the project's status to "Assigned"
    projectExists.status = "Assigned";
    await projectExists.save();

    res.status(201).json({
      msg: "Assignment created successfully",
      assignment: await assignment
        .populate("candidate", "name email skills")
        .populate("project", "title description skillsRequired")
        .execPopulate(),
    });
  } catch (error) {
    console.error("Error assigning project:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Update Assignment Status (Accept/Deny) - Candidate Action
const updateAssignmentStatus = async (req, res) => {
  try {
    const { id } = req.params; // Assignment ID
    const { status } = req.body; // "Accepted" or "Denied"

    if (!["Accepted", "Denied"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const assignment = await Assignment.findOneAndUpdate(
      { _id: id, candidate: req.user.id }, // Ensure the candidate owns this assignment
      { status },
      { new: true }
    )
      .populate("candidate", "name email")
      .populate("project", "title description");

    if (!assignment) {
      return res.status(404).json({ msg: "Assignment not found" });
    }

    res.json({ msg: `Assignment status updated to ${status}`, assignment });
  } catch (error) {
    console.error("Error updating assignment status:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update Progress and Calculate Score
const updateAssignmentProgress = async (req, res) => {
  try {
    const { id } = req.params; // Assignment ID
    const { progress } = req.body;

    if (progress < 0 || progress > 100) {
      return res.status(400).json({ msg: "Progress must be between 0 and 100" });
    }

    const score = Math.floor(progress * 10); // Calculate score dynamically

    const assignment = await Assignment.findOneAndUpdate(
      { _id: id, candidate: req.user.id }, // Ensure the candidate owns this assignment
      { progress, score },
      { new: true }
    )
      .populate("candidate", "name email")
      .populate("project", "title description");

    if (!assignment) {
      return res.status(404).json({ msg: "Assignment not found" });
    }

    res.json({ msg: "Progress updated successfully", assignment });
  } catch (error) {
    console.error("Error updating progress:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get assignments for a candidate
const getAssignmentsForCandidate = async (req, res) => {
  try {
    const assignments = await Assignment.find({ candidate: req.user.id })
      .populate("candidate", "name email")
      .populate("project", "title description skillsRequired");

    res.status(200).json(assignments);
  } catch (error) {
    console.error("Error fetching assignments for candidate:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Export Controllers
export {
  getAllAssignments,
  assignProject,
  updateAssignmentStatus,
  updateAssignmentProgress,
  getAssignmentsForCandidate,
};