"use client";

import { useState, useEffect } from "react";

import {
  createAppointment,
  updateAppointment,
} from "@/services/appointmentService";

export default function AppointmentForm({
  patientId,
  onSuccess,
  editAppointment,
}) {
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    purpose: "",
    doctorName: "",
    hospitalName: "",
    department: "Obstetrics & Gynecology",
    status: "Upcoming",
    notes: "",
    prescription: "",
    followUpDate: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editAppointment) {
      setFormData({
        appointmentDate: editAppointment.appointmentDate
          ? editAppointment.appointmentDate.substring(0, 10)
          : "",
        appointmentTime: editAppointment.appointmentTime || "",
        purpose: editAppointment.purpose || "",
        doctorName: editAppointment.doctorName || "",
        hospitalName: editAppointment.hospitalName || "",
        department:
          editAppointment.department ||
          "Obstetrics & Gynecology",
        status:
          editAppointment.status || "Upcoming",
        notes: editAppointment.notes || "",
        prescription:
          editAppointment.prescription || "",
        followUpDate:
          editAppointment.followUpDate
            ? editAppointment.followUpDate.substring(
                0,
                10
              )
            : "",
      });
    }
  }, [editAppointment]);

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

      if (editAppointment) {
        await updateAppointment(
          editAppointment._id,
          formData
        );

        alert(
          "Appointment Updated Successfully"
        );
      } else {
        await createAppointment(
          patientId,
          formData
        );

        alert(
          "Appointment Added Successfully"
        );
      }

      if (onSuccess) {
        onSuccess();
      }

      setFormData({
        appointmentDate: "",
        appointmentTime: "",
        purpose: "",
        doctorName: "",
        hospitalName: "",
        department:
          "Obstetrics & Gynecology",
        status: "Upcoming",
        notes: "",
        prescription: "",
        followUpDate: "",
      });

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to save appointment."
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
        {editAppointment
          ? "Edit Appointment"
          : "Add Appointment"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="time"
          name="appointmentTime"
          value={formData.appointmentTime}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="doctorName"
          placeholder="Doctor Name"
          value={formData.doctorName}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

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
          name="purpose"
          placeholder="Purpose"
          value={formData.purpose}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option>Upcoming</option>
          <option>Completed</option>
          <option>Cancelled</option>
          <option>Missed</option>
        </select>

      </div>

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
          : editAppointment
          ? "Update Appointment"
          : "Save Appointment"}
      </button>
    </form>
  );
}