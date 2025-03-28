import React, { useState, useEffect } from "react";
import { getCandidates, createCandidate } from "../services/api";
import { toast } from "react-toastify";
import axios from "axios";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    skills: "",
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Fetch Candidates
  const fetchCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch candidates");
    }
  };

  // Add New Candidate
  const handleSubmit = async (e) => {
    e.preventDefault();
    const candidateData = {
      ...newCandidate,
      skills: newCandidate.skills.split(",").map((skill) => skill.trim()),
    };

    try {
      await createCandidate(candidateData);
      toast.success("Candidate added successfully!");
      setNewCandidate({ name: "", email: "", skills: "" });
      fetchCandidates();
    } catch (error) {
      console.error("Error adding candidate:", error);
      toast.error("Failed to add candidate.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">Candidates</h2>

      {/* Form to Add Candidate */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mb-6 md:flex-row"
      >
        <input
          type="text"
          placeholder="Name"
          value={newCandidate.name}
          onChange={(e) =>
            setNewCandidate({ ...newCandidate, name: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newCandidate.email}
          onChange={(e) =>
            setNewCandidate({ ...newCandidate, email: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Skills (comma-separated)"
          value={newCandidate.skills}
          onChange={(e) =>
            setNewCandidate({ ...newCandidate, skills: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Candidate
        </button>
      </form>

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-500">Loading candidates...</p>
      ) : candidates.length === 0 ? (
        <p className="text-gray-500">No candidates available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidates.map((candidate) => (
            <li
              key={candidate._id}
              className="border border-gray-300 p-4 rounded-md shadow-md bg-gray-50"
            >
              <p className="text-gray-700">
                <strong>Name:</strong> {candidate.name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {candidate.email}
              </p>
              <p className="text-gray-700">
                <strong>Skills:</strong>{" "}
                {candidate.skills && candidate.skills.length > 0
                  ? candidate.skills.join(", ")
                  : "N/A"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Candidates;