import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import assignmentRoutes from "./routes/assignments.js";
import candidateRoutes from "./routes/candidates.js";
import projectRoutes from "./routes/projects.js";
import authRoutes from "./routes/auth.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
import csrf from "csurf";

dotenv.config();

// Connect to Database
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // replace with your frontend URL
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Endpoint to provide CSRF token to frontend
app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Routes
app.use("/api/assignments", assignmentRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 6002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }
  next(err);
});