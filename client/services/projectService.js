import API from "./api";

// Create Project
export const createProject = (data) =>
  API.post("/projects", data);

// Get All Projects
export const getProjects = () =>
  API.get("/projects");

// Get Project By ID
export const getProject = (id) =>
  API.get(`/projects/${id}`);

// Update Project
export const updateProject = (id, data) =>
  API.put(`/projects/${id}`, data);

// Delete Project
export const deleteProject = (id) =>
  API.delete(`/projects/${id}`);