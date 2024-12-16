import axios from "axios";

// const API_URL = "http://localhost:6002/api";
const API_URL = "https://assignment-management-tool.onrender.com/api";

export const getCandidates = () => axios.get(`${API_URL}/candidates`);
export const createCandidate = (candidate) =>
  axios.post(`${API_URL}/candidates`, candidate);

export const getProjects = () => axios.get(`${API_URL}/projects`);
export const createProject = (project) =>
  axios.post(`${API_URL}/projects`, project);

export const getAssignments = () => axios.get(`${API_URL}/assignments`);
export const createAssignment = (assignment) =>
  axios.post(`${API_URL}/assignments`, assignment);
export const updateAssignmentProgress = (id, progress) =>
  axios.put(`${API_URL}/assignments/${id}/progress`, { progress });