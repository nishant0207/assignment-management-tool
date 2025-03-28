import axios from "axios";
axios.defaults.withCredentials = true;

// Set CSRF token from backend once on load
export const setCSRFToken = async () => {
  try {
    const response = await axios.get("http://localhost:6002/api/csrf-token", {
      withCredentials: true,
    });
    axios.defaults.headers.common["X-CSRF-Token"] = response.data.csrfToken;
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
};

// API Base URL: Use localhost during development, and production URL for deployment
const API_URL = "http://localhost:6002/api";
// const API_URL = "https://assignment-management-tool.onrender.com/api";

// Function to attach the Authorization token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. Please log in again.");
  }
  return {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token, // Authorization token
    },
  };
};

// Handle API Errors
const handleApiError = (error) => {
  const raw = error.response?.data;

  // Check for CSRF errors even if it's an HTML error page
  const isCSRFError =
    error.response?.status === 403 &&
    (typeof raw === "string" && raw.toLowerCase().includes("csrf"));

  if (isCSRFError) {
    alert("⚠️ Session expired or invalid request. Please refresh the page.");
  }

  console.error("API Error:", raw || error.message);
  throw error;
};

// Auth APIs
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Candidate APIs
export const getCandidates = async () => {
  try {
    const response = await axios.get(`${API_URL}/candidates`, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createCandidate = async (candidate) => {
  try {
    const response = await axios.post(
      `${API_URL}/candidates`,
      candidate,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Project APIs
export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createProject = async (project) => {
  try {
    const response = await axios.post(
      `${API_URL}/projects`,
      project,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Assignment APIs
export const getAssignments = async () => {
  try {
    const response = await axios.get(`${API_URL}/assignments`, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createAssignment = async (assignment) => {
  try {
    const response = await axios.post(
      `${API_URL}/assignments`,
      assignment,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateAssignmentProgress = async (id, progress) => {
  try {
    const response = await axios.put(
      `${API_URL}/assignments/${id}/progress`,
      { progress },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateAssignmentStatus = async (id, status) => {
  try {
    const response = await axios.put(
      `${API_URL}/assignments/${id}/accept`,
      { status },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};