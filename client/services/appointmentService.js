import API from "./api";

/* ==========================================
   Create Appointment
========================================== */

export const createAppointment = (
  patientId,
  data
) =>
  API.post(
    `/appointments/${patientId}`,
    data
  );

/* ==========================================
   Get Patient Appointments
========================================== */

export const getAppointments = (
  patientId
) =>
  API.get(
    `/appointments/${patientId}`
  );

/* ==========================================
   Get All Appointments
========================================== */

export const getAllAppointments = () =>
  API.get("/appointments");


/* ==========================================
   Get Today's Appointments
========================================== */

export const getTodayAppointments = () =>
  API.get("/appointments/today");

/* ==========================================
   Get Single Appointment
========================================== */

export const getAppointmentById = (
  id
) =>
  API.get(
    `/appointments/details/${id}`
  );

/* ==========================================
   Update Appointment
========================================== */

export const updateAppointment = (
  id,
  data
) =>
  API.put(
    `/appointments/details/${id}`,
    data
  );

/* ==========================================
   Delete Appointment
========================================== */

export const deleteAppointment = (
  id
) =>
  API.delete(
    `/appointments/details/${id}`
  );