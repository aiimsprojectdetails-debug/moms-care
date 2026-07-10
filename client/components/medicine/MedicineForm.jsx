"use client";

import { useState, useEffect } from "react";

import {
  createMedicine,
  updateMedicine,
} from "@/services/medicineService";

export default function MedicineForm({
  patientId,
  onSuccess,
  editMedicine,
}) {
  const [formData, setFormData] = useState({
    medicineName: "",
    medicineType: "Tablet",
    dosage: "",
    frequency: "Once Daily",

    morning: false,
    afternoon: false,
    evening: false,
    night: false,

    beforeFood: false,
    afterFood: true,

    startDate: "",
    endDate: "",

    purpose: "",
    prescribedBy: "",
    notes: "",

    status: "Ongoing",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMedicine) {
      setFormData({
        medicineName: editMedicine.medicineName || "",
        medicineType: editMedicine.medicineType || "Tablet",
        dosage: editMedicine.dosage || "",
        frequency: editMedicine.frequency || "Once Daily",

        morning: editMedicine.morning || false,
        afternoon: editMedicine.afternoon || false,
        evening: editMedicine.evening || false,
        night: editMedicine.night || false,

        beforeFood: editMedicine.beforeFood || false,
        afterFood: editMedicine.afterFood ?? true,

        startDate: editMedicine.startDate
          ? editMedicine.startDate.substring(0, 10)
          : "",

        endDate: editMedicine.endDate
          ? editMedicine.endDate.substring(0, 10)
          : "",

        purpose: editMedicine.purpose || "",
        prescribedBy: editMedicine.prescribedBy || "",
        notes: editMedicine.notes || "",

        status: editMedicine.status || "Ongoing",
      });
    }
  }, [editMedicine]);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

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

      if (editMedicine) {
        await updateMedicine(
          editMedicine._id,
          formData
        );

        alert(
          "Medicine Updated Successfully"
        );
      } else {
        await createMedicine(
          patientId,
          formData
        );

        alert(
          "Medicine Added Successfully"
        );
      }

      if (onSuccess) {
        onSuccess();
      }

      setFormData({
        medicineName: "",
        medicineType: "Tablet",
        dosage: "",
        frequency: "Once Daily",

        morning: false,
        afternoon: false,
        evening: false,
        night: false,

        beforeFood: false,
        afterFood: true,

        startDate: "",
        endDate: "",

        purpose: "",
        prescribedBy: "",
        notes: "",

        status: "Ongoing",
      });

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to save medicine."
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
        {editMedicine
          ? "Edit Medicine"
          : "Add Medicine"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="medicineName"
          placeholder="Medicine Name"
          value={formData.medicineName}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <select
          name="medicineType"
          value={formData.medicineType}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option>Tablet</option>
          <option>Capsule</option>
          <option>Syrup</option>
          <option>Injection</option>
          <option>Drops</option>
          <option>Powder</option>
          <option>Other</option>
        </select>

        <input
          type="text"
          name="dosage"
          placeholder="Dosage"
          value={formData.dosage}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option>Once Daily</option>
          <option>Twice Daily</option>
          <option>Three Times Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>As Needed</option>
        </select>

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="prescribedBy"
          placeholder="Prescribed By"
          value={formData.prescribedBy}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option>Ongoing</option>
          <option>Completed</option>
          <option>Stopped</option>
        </select>

      </div>

      <textarea
        name="purpose"
        placeholder="Purpose"
        value={formData.purpose}
        onChange={handleChange}
        className="border rounded-lg p-3 w-full"
      />

      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
        className="border rounded-lg p-3 w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
      >
        {loading
          ? "Saving..."
          : editMedicine
          ? "Update Medicine"
          : "Save Medicine"}
      </button>
    </form>
  );
}