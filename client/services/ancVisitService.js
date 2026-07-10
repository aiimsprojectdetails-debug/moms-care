import API from "./api";

/* ==========================================
   Create ANC Visit
========================================== */

export const createAncVisit = (
  patientId,
  data
) =>
  API.post(
    `/anc/${patientId}`,
    data
  );

/* ==========================================
   Get Patient ANC Visits
========================================== */

export const getAncVisits = (
  patientId
) =>
  API.get(
    `/anc/${patientId}`
  );

/* ==========================================
   Get All ANC Visits
========================================== */

export const getAllAncVisits = () =>
  API.get("/anc");

/* ==========================================
   Get Single ANC Visit
========================================== */

export const getAncVisitById = (
  id
) =>
  API.get(
    `/anc/visit/${id}`
  );

/* ==========================================
   Update ANC Visit
========================================== */

export const updateAncVisit = (
  id,
  data
) =>
  API.put(
    `/anc/visit/${id}`,
    data
  );

/* ==========================================
   Delete ANC Visit
========================================== */

export const deleteAncVisit = (
  id
) =>
  API.delete(
    `/anc/visit/${id}`
  );