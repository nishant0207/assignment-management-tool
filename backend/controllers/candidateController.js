import Candidate from "../models/Candidate.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Get all candidates
const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new candidate
const addCandidate = async (req, res) => {
  try {
    const { name, email, skills } = req.body;

    // Check for required fields
    if (!name || !email || !skills) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const candidate = new Candidate({ name, email, skills });
    await candidate.save();

    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllCandidates, addCandidate };