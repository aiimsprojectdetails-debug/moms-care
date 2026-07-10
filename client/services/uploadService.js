import API from "./api";



/* ==========================================
   Upload Patient Photo
========================================== */

export const uploadPatientPhoto = async (
  patientId,
  file
) => {

  const formData = new FormData();

  formData.append("photo", file);

  const response = await API.post(

    `/upload/patient-photo/${patientId}`,

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }

  );

  return response.data;

};