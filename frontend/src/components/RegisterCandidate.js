import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterCandidate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
  });

  const { name, email, password, skills } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/auth/register-candidate",
        { name, email, password, skills },
        { headers: { "x-auth-token": token } }
      );
      toast.success("Candidate registered successfully!");
      setFormData({ name: "", email: "", password: "", skills: "" });
    } catch (error) {
      console.error("Error registering candidate:", error.response?.data?.msg);
      toast.error(
        error.response?.data?.msg || "Failed to register candidate."
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">
        Register Candidate
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block">Skills (comma-separated):</label>
          <input
            type="text"
            name="skills"
            value={skills}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register Candidate
        </button>
      </form>
    </div>
  );
};

export default RegisterCandidate;