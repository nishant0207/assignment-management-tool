import Project from "../models/Project.js";

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new project
const addProject = async (req, res) => {
  try {
    const { title, description, skillsRequired } = req.body;

    if (!title || !description || !skillsRequired) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const project = new Project({
      title,
      description,
      skillsRequired: skillsRequired.split(",").map((skill) => skill.trim()),
    });

    await project.save();
    res.status(201).json({ msg: "Project created successfully", project });
  } catch (error) {
    console.error("Error creating project:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export { getAllProjects, addProject };