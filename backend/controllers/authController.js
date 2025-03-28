import Candidate from "../models/Candidate.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// User Registration Controller
export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, email, password, role, username } = req.body;
  
    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
  
      // Create a new user instance
      user = new User({
        name,
        email,
        password,
        role,
        username: username || null, // Ensure username is not undefined
      });
  
      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save the user to the database
      await user.save();
  
      // Generate JWT Token
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error("Error during registration:", err.message);
      res.status(500).send("Server error");
    }
};

// User Login Controller
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
  
    try {
      // Find user by email
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
  
      console.log("User logged in successfully:", email);
  
      // Create payload for JWT with user ID and role
      const payload = {
        user: {
          id: user.id,
          role: user.role, // Ensure role is included
        },
      };
  
      // Sign JWT Token
      jwt.sign(
        payload,
        process.env.JWT_SECRET, // Ensure JWT_SECRET is set in .env
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.error("Error generating token:", err.message);
            return res.status(500).json({ msg: "Failed to generate token" });
          }
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
      );
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ msg: "Server Error" });
    }
};

export const registerCandidate = async (req, res) => {
    const { name, email, password, skills } = req.body;
  
    try {
      // Validate inputs
      if (!name || !email || !password || !skills) {
        return res.status(400).json({ msg: "All fields are required" });
      }
  
      // Check if candidate already exists
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "Candidate with this email already exists" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a user instance
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: "candidate",
      });
      await user.save();
  
      // Create a candidate instance
      const candidate = new Candidate({
        name,
        email,
        skills: skills.split(",").map((skill) => skill.trim()), // Convert skills to array
      });
      await candidate.save();
  
      res.status(201).json({ msg: "Candidate registered successfully" });
    } catch (err) {
      console.error("Error registering candidate:", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
};