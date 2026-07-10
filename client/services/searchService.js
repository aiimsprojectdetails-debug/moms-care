import API from "./api";

/* ==========================================
   Global Search
========================================== */

export const globalSearch = (query) =>
  API.get("/search", {
    params: {
      q: query,
    },
  });