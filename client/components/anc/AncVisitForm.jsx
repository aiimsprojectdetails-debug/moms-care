"use client";

import { useState, useEffect } from "react";

import {
  createAncVisit,
  updateAncVisit,
} from "@/services/ancVisitService";
export default function AncVisitForm({
  patientId,
  onSuccess,
  editVisit,
}) {
  const [formData, setFormData] = useState({
    pregnancyWeek: "",
    trimester: "1st Trimester",
    weight: "",
    height: "",
    bmi: "",
    bloodPressure: "",
    pulseRate: "",
    temperature: "",
    hemoglobin: "",
    bloodSugar: "",
    urineProtein: "",
    urineSugar: "",
    fetalHeartRate: "",
    fetalMovement: "",
    fetalPosition: "",
    ironTablets: false,
    calciumTablets: false,
    folicAcid: false,
    ttInjection: false,
    vitaminD: false,
    diagnosis: "",
    doctorRemarks: "",
    nextVisitDate: "",
  });

  useEffect(() => {
  if (editVisit) {
    setFormData({
      pregnancyWeek: editVisit.pregnancyWeek || "",
      trimester: editVisit.trimester || "1st Trimester",
      weight: editVisit.weight || "",
      height: editVisit.height || "",
      bmi: editVisit.bmi || "",
      bloodPressure: editVisit.bloodPressure || "",
      pulseRate: editVisit.pulseRate || "",
      temperature: editVisit.temperature || "",
      hemoglobin: editVisit.hemoglobin || "",
      bloodSugar: editVisit.bloodSugar || "",
      urineProtein: editVisit.urineProtein || "",
      urineSugar: editVisit.urineSugar || "",
      fetalHeartRate: editVisit.fetalHeartRate || "",
      fetalMovement: editVisit.fetalMovement || "",
      fetalPosition: editVisit.fetalPosition || "",
      ironTablets: editVisit.ironTablets || false,
      calciumTablets: editVisit.calciumTablets || false,
      folicAcid: editVisit.folicAcid || false,
      ttInjection: editVisit.ttInjection || false,
      vitaminD: editVisit.vitaminD || false,
      diagnosis: editVisit.diagnosis || "",
      doctorRemarks: editVisit.doctorRemarks || "",
      nextVisitDate: editVisit.nextVisitDate
        ? editVisit.nextVisitDate.substring(0, 10)
        : "",
    });
  }
}, [editVisit]);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editVisit) {
  await updateAncVisit(editVisit._id, formData);
} else {
  await createAncVisit(patientId, formData);
}

      alert(
        "ANC Visit Added Successfully"
      );

      if (onSuccess) {
        onSuccess();
      }

      setFormData({
        pregnancyWeek: "",
        trimester: "1st Trimester",
        weight: "",
        height: "",
        bmi: "",
        bloodPressure: "",
        pulseRate: "",
        temperature: "",
        hemoglobin: "",
        bloodSugar: "",
        urineProtein: "",
        urineSugar: "",
        fetalHeartRate: "",
        fetalMovement: "",
        fetalPosition: "",
        ironTablets: false,
        calciumTablets: false,
        folicAcid: false,
        ttInjection: false,
        vitaminD: false,
        diagnosis: "",
        doctorRemarks: "",
        nextVisitDate: "",
      });

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to save ANC Visit."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold text-pink-600">
  {editVisit ? "Edit ANC Visit" : "Add ANC Visit"}
</h2>
      <div className="grid md:grid-cols-2 gap-4">

        <input
          name="pregnancyWeek"
          type="number"
          placeholder="Pregnancy Week"
          value={formData.pregnancyWeek}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <select
          name="trimester"
          value={formData.trimester}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option>1st Trimester</option>
          <option>2nd Trimester</option>
          <option>3rd Trimester</option>
        </select>

        <input
          name="weight"
          type="number"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="bloodPressure"
          placeholder="Blood Pressure"
          value={formData.bloodPressure}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="hemoglobin"
          type="number"
          placeholder="Hemoglobin"
          value={formData.hemoglobin}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="bloodSugar"
          type="number"
          placeholder="Blood Sugar"
          value={formData.bloodSugar}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

      </div>

      <textarea
        name="doctorRemarks"
        placeholder="Doctor Remarks"
        value={formData.doctorRemarks}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
      >
        {loading
  ? "Saving..."
  : editVisit
    ? "Update ANC Visit"
    : "Save ANC Visit"}
      </button>

    </form>
  );
}