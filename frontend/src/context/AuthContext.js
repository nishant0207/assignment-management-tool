import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(); // Create the context

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      const { token, user: userData } = response.data;

      // Store token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", userData.role);

      // Update user state
      setUser({ token, role: userData.role });
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setUser({ token, role }); // Restore user state
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;