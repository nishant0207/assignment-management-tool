import React, { useState, useEffect } from "react";
import { getProjects, createProject } from "../services/api";
import { toast } from "react-toastify";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    skillsRequired: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data); // Assuming API returns an array directly
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects.");
    }
  };

  // Handle new project submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createProject({
        title: newProject.title,
        description: newProject.description,
        skillsRequired: newProject.skillsRequired,
      });

      console.log("Project creation response:", response);

      if (response?.data?.project) {
        toast.success("Project added successfully!");
        setProjects((prev) => [...prev, response.data.project]);
      } else {
        toast.error("Project created, but unexpected response format.");
        fetchProjects(); // fallback to refresh full list
      }

      setNewProject({ title: "", description: "", skillsRequired: "" });
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-green-600">Projects</h2>

      {/* Form to Add Project */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mb-6 md:flex-row"
      >
        <input
          type="text"
          placeholder="Title"
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Skills Required (comma-separated)"
          value={newProject.skillsRequired}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              skillsRequired: e.target.value,
            })
          }
          className="p-2 border border-gray-300 rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Add Project
        </button>
      </form>

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-500">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500">No projects available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <li
              key={project._id}
              className="border border-gray-300 p-4 rounded-md shadow-md bg-gray-50"
            >
              <p className="text-gray-700">
                <strong>Title:</strong> {project.title}
              </p>
              <p className="text-gray-700">
                <strong>Description:</strong> {project.description}
              </p>
              <p className="text-gray-700">
                <strong>Skills Required:</strong>{" "}
                {Array.isArray(project.skillsRequired)
                  ? project.skillsRequired.join(", ")
                  : String(project.skillsRequired).split(",").join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Projects;