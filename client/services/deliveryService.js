import API from "./api";

/* ==========================================
   Create Delivery
========================================== */

export const createDelivery = (
  patientId,
  data
) =>
  API.post(
    `/deliveries/${patientId}`,
    data
  );

/* ==========================================
   Get Patient Deliveries
========================================== */

export const getDeliveries = (
  patientId
) =>
  API.get(
    `/deliveries/${patientId}`
  );

/* ==========================================
   Get All Deliveries
========================================== */

export const getAllDeliveries = () =>
  API.get("/deliveries");

/* ==========================================
   Get Single Delivery
========================================== */

export const getDeliveryById = (
  id
) =>
  API.get(
    `/deliveries/details/${id}`
  );

/* ==========================================
   Update Delivery
========================================== */

export const updateDelivery = (
  id,
  data
) =>
  API.put(
    `/deliveries/details/${id}`,
    data
  );

/* ==========================================
   Delete Delivery
========================================== */

export const deleteDelivery = (
  id
) =>
  API.delete(
    `/deliveries/details/${id}`
  );