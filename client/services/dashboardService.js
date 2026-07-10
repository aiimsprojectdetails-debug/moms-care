import API from "./api";

// Dashboard Overview
export const getDashboardOverview = () =>
  API.get("/dashboard");

// Dashboard Statistics
export const getDashboardStatistics = () =>
  API.get("/dashboard/statistics");

// Recent Patients
export const getRecentPatients = () =>
  API.get("/dashboard/recent-patients");

// Recent Projects
export const getRecentProjects = () =>
  API.get("/dashboard/recent-projects");

// Upcoming Appointments
export const getUpcomingAppointments = () =>
  API.get("/dashboard/upcoming-appointments");

// High Risk Patients
export const getHighRiskPatients = () =>
  API.get("/dashboard/high-risk-patients");

// Monthly Analytics
export const getMonthlyAnalytics = () =>
  API.get("/dashboard/monthly-analytics");