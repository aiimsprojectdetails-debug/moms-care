import API from "./api";

/* ==========================================
   Create Medicine
========================================== */

export const createMedicine = (
  patientId,
  data
) =>
  API.post(
    `/medicines/${patientId}`,
    data
  );

/* ==========================================
   Get Patient Medicines
========================================== */

export const getMedicines = (
  patientId
) =>
  API.get(
    `/medicines/${patientId}`
  );

/* ==========================================
   Get All Medicines
========================================== */

export const getAllMedicines = () =>
  API.get("/medicines");

/* ==========================================
   Get Single Medicine
========================================== */

export const getMedicineById = (
  id
) =>
  API.get(
    `/medicines/details/${id}`
  );

/* ==========================================
   Update Medicine
========================================== */

export const updateMedicine = (
  id,
  data
) =>
  API.put(
    `/medicines/details/${id}`,
    data
  );

/* ==========================================
   Delete Medicine
========================================== */

export const deleteMedicine = (
  id
) =>
  API.delete(
    `/medicines/details/${id}`
  );