import API from "./api";

// Register
export const registerUser = (userData) =>
  API.post("/auth/register", userData);

// Login
export const loginUser = (loginData) =>
  API.post("/auth/login", loginData);

// Profile
export const getProfile = () =>
  API.get("/auth/profile");

// Forgot Password
export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", email);

// Reset Password
export const resetPassword = (token, password) =>
  API.post(`/auth/reset-password/${token}`, password);

// Logout
export const logoutUser = () =>
  API.post("/auth/logout");