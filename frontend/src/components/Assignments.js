import React, { useState, useEffect, useContext } from "react";
import {
  getAssignments,
  createAssignment,
  updateAssignmentProgress,
  updateAssignmentStatus,
} from "../services/api";
import { getCandidates, getProjects } from "../services/api";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import _ from "lodash";

const Assignments = () => {
  const { user } = useContext(AuthContext); // Access logged-in user
  const [assignments, setAssignments] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssignments();
    if (user.role !== "candidate") {
      fetchCandidates();
      fetchProjects();
    }
  }, [user]);

  // Fetch assignments based on role
  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const data = await getAssignments();
      if (user.role === "candidate") {
        setAssignments(data.filter((a) => a.candidate._id === user.id));
      } else {
        setAssignments(data);
      }
    } catch (error) {
      toast.error("Failed to fetch assignments.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch candidates (for Admin/Manager)
  const fetchCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data);
    } catch (error) {
      toast.error("Failed to fetch candidates.");
    }
  };

  // Fetch projects (for Admin/Manager)
  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to fetch projects.");
    }
  };

  // Handle assigning a project
  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedCandidate || !selectedProject) {
      toast.error("Candidate and Project are required.");
      return;
    }

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

  // Update progress using debounce
  const debouncedUpdateProgress = _.debounce(async (id, progress) => {
    try {
      await updateAssignmentProgress(id, progress);
      toast.success("Progress updated successfully!");
      fetchAssignments();
    } catch (error) {
      toast.error("Failed to update progress.");
    }
  }, 300);

  const handleProgressChange = (id, progress) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a._id === id ? { ...a, progress, score: Math.floor(progress * 10) } : a
      )
    );
    debouncedUpdateProgress(id, progress);
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateAssignmentStatus(id, status);
      toast.success(`Assignment ${status.toLowerCase()} successfully!`);
      fetchAssignments();
    } catch (error) {
      toast.error("Failed to update assignment status.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Assignments</h2>

      {/* Show Assign Form for Admin/Manager */}
      {user.role !== "candidate" && (
        <form onSubmit={handleAssign} className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Assign Project</h3>
          <div className="mb-4">
            <label className="block font-medium">Candidate:</label>
            <select
              value={selectedCandidate}
              onChange={(e) => setSelectedCandidate(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Select Candidate</option>
              {candidates.map((candidate) => (
                <option key={candidate._id} value={candidate._id}>
                  {candidate.name} ({candidate.email})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium">Project:</label>
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
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Assign Project
          </button>
        </form>
      )}

      {/* Loading State */}
      {loading ? (
        <p>Loading assignments...</p>
      ) : (
        <ul className="space-y-4">
          {assignments.map((assignment) => (
            <li
              key={assignment._id}
              className="p-4 border rounded-md bg-gray-50 shadow-md"
            >
              <p>
                <strong>Candidate:</strong> {assignment.candidate.name} (
                {assignment.candidate.email})
              </p>
              <p>
                <strong>Project:</strong> {assignment.project.title}
              </p>
              <p>
                <strong>Progress:</strong>{" "}
                <span className="font-bold">{assignment.progress}%</span>
              </p>
              <p>
                <strong>Score:</strong>{" "}
                <span className="font-bold">{assignment.score}</span>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-bold ${
                    assignment.status === "Accepted"
                      ? "text-green-500"
                      : assignment.status === "Denied"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {assignment.status}
                </span>
              </p>

              {/* Progress Slider */}
              {user.role === "candidate" && assignment.status === "Accepted" && (
                <div className="mt-2">
                  <label className="block font-medium">Update Progress:</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={assignment.progress}
                    onChange={(e) =>
                      handleProgressChange(
                        assignment._id,
                        Number(e.target.value)
                      )
                    }
                    className="w-full"
                  />
                  <span>{assignment.progress}%</span>
                </div>
              )}

              {/* Accept/Deny Buttons */}
              {user.role === "candidate" && assignment.status === "Pending" && (
                <div className="mt-2">
                  <button
                    onClick={() =>
                      handleUpdateStatus(assignment._id, "Accepted")
                    }
                    className="bg-green-500 text-white px-4 py-1 rounded-md mr-2 hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateStatus(assignment._id, "Denied")
                    }
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                  >
                    Deny
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Assignments;