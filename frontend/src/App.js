import React, { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Candidates from "./components/Candidates";
import Projects from "./components/Projects";
import Assignments from "./components/Assignments";
import Users from "./components/Users"; // Added
import Login from "./components/Login";
import RegisterCandidate from "./components/RegisterCandidate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

window.axios = axios;

// PrivateRoute Component for Role-Based Access Control
const PrivateRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  // Check if the user's role matches the allowed roles
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

// Unauthorized Access Component
const Unauthorized = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-3xl text-red-600 font-bold mb-4">Unauthorized Access</h2>
      <p className="text-gray-700">You do not have permission to view this page.</p>
      <a href="/" className="text-blue-500 underline">
        Go to Home
      </a>
    </div>
  );
};

const App = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await axios.get("http://localhost:6002/api/csrf-token", {
          withCredentials: true,
        });
        axios.defaults.headers.common["X-CSRF-Token"] = response.data.csrfToken;
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };

    fetchCSRFToken();
  }, []);

  return (
    <Router>
      {user && <Navbar />}
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route
          path="/assignments"
          element={
            <PrivateRoute roles={["admin", "manager", "candidate"]}>
              <Assignments />
            </PrivateRoute>
          }
        />
        <Route
          path="/candidates"
          element={
            <PrivateRoute roles={["admin", "manager"]}>
              <Candidates />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute roles={["admin", "manager"]}>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="/register-candidate"
          element={
            <PrivateRoute roles={["admin", "manager"]}>
              <RegisterCandidate />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute roles={["admin"]}>
              <Users />
            </PrivateRoute>
          }
        />

        {/* Unauthorized Access */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Redirect Unknown Routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;