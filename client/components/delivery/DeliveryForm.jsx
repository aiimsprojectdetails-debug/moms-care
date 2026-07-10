"use client";

import { useState, useEffect } from "react";

import {
  createDelivery,
  updateDelivery,
} from "@/services/deliveryService";

export default function DeliveryForm({
  patientId,
  onSuccess,
  editDelivery,
}) {
  const [formData, setFormData] = useState({
    deliveryDate: "",
    deliveryType: "Normal",
    hospitalName: "",
    doctorName: "",
    babyGender: "Male",
    babyWeight: "",
    babyCondition: "Healthy",
    motherCondition: "Stable",
    deliveryNotes: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editDelivery) {
      setFormData({
        deliveryDate: editDelivery.deliveryDate
          ? editDelivery.deliveryDate.substring(0, 10)
          : "",
        deliveryType:
          editDelivery.deliveryType || "Normal",
        hospitalName:
          editDelivery.hospitalName || "",
        doctorName:
          editDelivery.doctorName || "",
        babyGender:
          editDelivery.babyGender || "Male",
        babyWeight:
          editDelivery.babyWeight || "",
        babyCondition:
          editDelivery.babyCondition || "Healthy",
        motherCondition:
          editDelivery.motherCondition || "Stable",
        deliveryNotes:
          editDelivery.deliveryNotes || "",
      });
    }
  }, [editDelivery]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editDelivery) {
        await updateDelivery(
          editDelivery._id,
          formData
        );

        alert("Delivery Updated Successfully");
      } else {
        await createDelivery(
          patientId,
          formData
        );

        alert("Delivery Added Successfully");
      }

      if (onSuccess) {
        onSuccess();
      }

      setFormData({
        deliveryDate: "",
        deliveryType: "Normal",
        hospitalName: "",
        doctorName: "",
        babyGender: "Male",
        babyWeight: "",
        babyCondition: "Healthy",
        motherCondition: "Stable",
        deliveryNotes: "",
      });

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to save delivery."
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
        {editDelivery
          ? "Edit Delivery"
          : "Add Delivery"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="date"
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <select
          name="deliveryType"
          value={formData.deliveryType}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option>Normal</option>
          <option>C-Section</option>
          <option>Assisted</option>
        </select>

        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          value={formData.hospitalName}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          name="doctorName"
          placeholder="Doctor Name"
          value={formData.doctorName}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <select
          name="babyGender"
          value={formData.babyGender}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          type="number"
          name="babyWeight"
          placeholder="Baby Weight (kg)"
          value={formData.babyWeight}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <select
          name="babyCondition"
          value={formData.babyCondition}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option>Healthy</option>
          <option>NICU</option>
          <option>Critical</option>
        </select>

        <select
          name="motherCondition"
          value={formData.motherCondition}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option>Stable</option>
          <option>Critical</option>
        </select>

      </div>

      <textarea
        name="deliveryNotes"
        placeholder="Delivery Notes"
        value={formData.deliveryNotes}
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
          : editDelivery
          ? "Update Delivery"
          : "Save Delivery"}
      </button>
    </form>
  );
}