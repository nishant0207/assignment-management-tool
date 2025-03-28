import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "manager", // Default role
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      toast.success("Login successful!");
      navigate("/assignments");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={credentials.role}
          onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
          className="p-2 border rounded-md"
        >
          <option value="manager">Manager</option>
          <option value="candidate">Candidate</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          className="p-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="p-2 border rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;