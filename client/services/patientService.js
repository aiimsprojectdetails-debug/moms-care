import API from "./api";

/* ==========================================
   Get All Patients
========================================== */

export const getPatients = (params = {}) =>
  API.get("/patients", {
    params,
  });

/* ==========================================
   Get Single Patient
========================================== */

export const getPatientById = (id) =>
  API.get(`/patients/${id}`);

/* ==========================================
   Create Patient
========================================== */

export const createPatient = (patientData) =>
  API.post("/patients", patientData);

/* ==========================================
   Update Patient
========================================== */

export const updatePatient = (id, patientData) =>
  API.put(`/patients/${id}`, patientData);

/* ==========================================
   Delete Patient
========================================== */

export const deletePatient = (id) =>
  API.delete(`/patients/${id}`);

/* ==========================================
   Search Patients
========================================== */

export const searchPatients = (keyword) =>
  API.get("/patients", {
    params: {
      search: keyword,
    },
  });

/* ==========================================
   Filter Patients
========================================== */

export const filterPatients = ({
  riskLevel,
  status,
  trimester,
}) =>
  API.get("/patients", {
    params: {
      riskLevel,
      status,
      trimester,
    },
  });

/* ==========================================
   Upload File to Cloudinary
========================================== */

export const uploadPatientPhoto = async (file) => {

  const formData = new FormData();

  formData.append("image", file);

  return API.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

};

/* ==========================================
   Upload Patient Report
========================================== */

export const uploadPatientReport = (
  id,
  formData
) =>
  API.post(
    `/patients/${id}/upload-report`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

/* ==========================================
   Get Patient Reports
========================================== */

export const getPatientReports = (id) =>
  API.get(`/patients/${id}/reports`);