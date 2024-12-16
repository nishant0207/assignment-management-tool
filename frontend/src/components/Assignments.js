import React, { useState, useEffect, useCallback } from "react";
import {
  getAssignments,
  createAssignment,
  updateAssignmentProgress,
} from "../services/api";
import { getCandidates, getProjects } from "../services/api";
import { toast } from "react-toastify";
import _ from "lodash"; // Import lodash for debounce

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    fetchAssignments();
    fetchCandidates();
    fetchProjects();
  }, []);

  const fetchAssignments = async () => {
    const response = await getAssignments();
    setAssignments(response.data);
  };

  const fetchCandidates = async () => {
    const response = await getCandidates();
    setCandidates(response.data);
  };

  const fetchProjects = async () => {
    const response = await getProjects();
    setProjects(response.data);
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await createAssignment({
        candidate: selectedCandidate,
        project: selectedProject,
      });
      toast.success("Project assigned successfully!");
      fetchAssignments();
    } catch (error) {
      toast.error("Error assigning project.");
    }
  };

  // Debounced Progress Update Function
  // Debounce ensures the update happens only after user stops sliding for 300ms
  const debouncedUpdateProgress = useCallback(
    _.debounce(async (id, progress) => {
      try {
        await updateAssignmentProgress(id, progress);
        toast.success("Progress updated successfully!");
        fetchAssignments();
      } catch (error) {
        toast.error("Failed to update progress.");
      }
    }, 300),
    []
  );

  const handleProgressChange = (id, progress) => {
    // Update immediately in UI and debounce API call
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment._id === id ? { ...assignment, progress } : assignment
      )
    );
    debouncedUpdateProgress(id, progress);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Assignments</h2>

      {/* Assign Project Form */}
      <form onSubmit={handleAssign} className="mb-6">
        <div className="mb-4">
          <label>Candidate:</label>
          <select
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Candidate</option>
            {candidates.map((candidate) => (
              <option key={candidate._id} value={candidate._id}>
                {candidate.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label>Project:</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Assign Project
        </button>
      </form>

      {/* Display Assignments */}
      <ul className="space-y-4">
        {assignments.map((assignment) => (
          <li key={assignment._id} className="p-4 border rounded-md bg-gray-50">
            <p>
              <strong>Candidate:</strong> {assignment.candidate.name}
            </p>
            <p>
              <strong>Project:</strong> {assignment.project.title}
            </p>
            <div>
              <strong>Progress:</strong>
              <input
                type="range"
                min="0"
                max="100"
                value={assignment.progress}
                onChange={(e) =>
                  handleProgressChange(assignment._id, e.target.value)
                }
              />
              <span>{assignment.progress}%</span>
            </div>
            <p>
              <strong>Score:</strong> {assignment.score}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assignments;