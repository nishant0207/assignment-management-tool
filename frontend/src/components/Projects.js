import React, { useState, useEffect } from "react";
import { getProjects, createProject } from "../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    skillsRequired: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await getProjects();
    setProjects(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      ...newProject,
      skillsRequired: newProject.skillsRequired.split(",").map((skill) => skill.trim()),
    };
    await createProject(projectData);
    setNewProject({ title: "", description: "", skillsRequired: "" });
    fetchProjects();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-green-600">Projects</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6 md:flex-row">
        <input
          type="text"
          placeholder="Title"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          className="p-2 border rounded-md flex-1"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          className="p-2 border rounded-md flex-1"
          required
        />
        <input
          type="text"
          placeholder="Skills Required (comma-separated)"
          value={newProject.skillsRequired}
          onChange={(e) => setNewProject({ ...newProject, skillsRequired: e.target.value })}
          className="p-2 border rounded-md flex-1"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Add Project
        </button>
      </form>

      {/* Projects List */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <li key={project._id} className="border p-4 rounded-md shadow bg-gray-50">
            <p>
              <strong>Title:</strong> {project.title}
            </p>
            <p>
              <strong>Description:</strong> {project.description}
            </p>
            <p>
              <strong>Skills Required:</strong> {project.skillsRequired.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;