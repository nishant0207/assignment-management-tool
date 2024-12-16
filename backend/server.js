const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const assignmentRoutes = require("./routes/assignments");
const candidateRoutes = require("./routes/candidates");
const projectRoutes = require("./routes/projects");
const cors = require('cors')

dotenv.config();

// Connect to Database
connectDB();

const app = express();

app.use(cors({origin:"*"}))

// Middleware
app.use(express.json());

// Routes
app.use("/api/assignments", assignmentRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 6002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});