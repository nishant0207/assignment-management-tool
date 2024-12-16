import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Project Manager</Link>
        </div>
        <ul className="flex space-x-6 text-white text-lg">
          <li>
            <Link to="/candidates" className="hover:text-blue-300 transition">
              Candidates
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:text-blue-300 transition">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/assignments" className="hover:text-blue-300 transition">
              Assignments
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;