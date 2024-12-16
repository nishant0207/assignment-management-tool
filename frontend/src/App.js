import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Candidates from "./components/Candidates";
import Projects from "./components/Projects";
import Assignments from "./components/Assignments";

const App = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
    </Router>
  );
};

export default App;