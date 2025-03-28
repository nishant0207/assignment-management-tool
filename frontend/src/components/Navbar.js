import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Project Manager</Link>
        </div>
        {user && (
          <ul className="flex space-x-6 text-white text-lg">
            <li>
              <Link to="/register-candidate" className="hover:text-blue-300">
                Register Candidate
              </Link>
            </li>
            <li>
              <Link to="/candidates" className="hover:text-blue-300">
                Candidates
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-blue-300">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/assignments" className="hover:text-blue-300">
                Assignments
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="text-red-300">
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;