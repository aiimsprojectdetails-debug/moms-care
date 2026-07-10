"use client";

import Link from "next/link";

import toast from "react-hot-toast";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPhoneAlt,
  FaBirthdayCake,
} from "react-icons/fa";

import { deletePatient } from "@/services/patientService";

export default function PatientCard({
  patient,

  onRefresh,
}) {
  /* ===========================
        Delete Patient
  =========================== */

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?",
    );

    if (!confirmDelete) return;

    try {
      await deletePatient(patient._id);

      toast.success("Patient deleted successfully");

      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Unable to delete patient.");
    }
  };

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-5
        border
        border-pink-100
      "
    >
      {/* ===========================
            Header
      =========================== */}

      <div className="flex items-center gap-4">

  {patient.patientPhoto ? (

    <img
      src={`http://localhost:5000${patient.patientPhoto}`}
      alt={patient.fullName}
      className="w-16 h-16 rounded-full object-cover border"
    />

  ) : (

    <div className="w-16 h-16 rounded-full bg-pink-600 flex items-center justify-center text-white text-xl font-bold">

      {patient.fullName?.charAt(0).toUpperCase()}

    </div>

  )}

  <div>

    <h2 className="font-bold text-lg">

      {patient.fullName}

    </h2>

    <p className="text-gray-500">

      {patient.mobile}

    </p>

  </div>

</div>

      {/* ===========================
            Basic Info
      =========================== */}

      <div className="mt-5 space-y-3">
        {/* Age */}

        <div className="flex items-center gap-3">
          <FaBirthdayCake className="text-pink-500" />

          <span className="text-gray-700">
            <strong>Age :</strong> {patient.age} Years
          </span>
        </div>

        {/* Mobile */}

        <div className="flex items-center gap-3">
          <FaPhoneAlt className="text-pink-500" />

          <span className="text-gray-700">
            <strong>Mobile :</strong> {patient.mobile}
          </span>
        </div>

        {/* Blood Group */}

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-600">Blood Group</span>

          <span className="font-semibold text-pink-600">
            {patient.bloodGroup || "N/A"}
          </span>
        </div>

        {/* Pregnancy Weeks */}

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-600">Pregnancy Weeks</span>

          <span className="font-semibold text-gray-700">
            {patient.pregnancyWeeks || "N/A"}
          </span>
        </div>

        {/* Trimester */}

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-600">Trimester</span>

          <span className="font-semibold text-gray-700">
            {patient.trimester || "N/A"}
          </span>
        </div>

        {/* ===========================
              Risk Level
        =========================== */}

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-600">Risk Level</span>

          <span
            className={`
              px-3
              py-1
              rounded-full
              text-sm
              font-semibold

              ${
                patient.riskLevel === "High"
                  ? "bg-red-100 text-red-700"
                  : patient.riskLevel === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
              }
            `}
          >
            {patient.riskLevel}
          </span>
        </div>

        {/* ===========================
              Status
        =========================== */}

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-600">Status</span>

          <span
            className={`
              px-3
              py-1
              rounded-full
              text-sm
              font-semibold

              ${
                patient.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700"
              }
            `}
          >
            {patient.status}
          </span>
        </div>
      </div>

      {/* ===========================
            Action Buttons
      =========================== */}

      <div className="grid grid-cols-3 gap-3 mt-6">
        {/* ===========================
              View Button
        =========================== */}

        <Link
          href={`/patients/${patient._id}`}
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-blue-100
            hover:bg-blue-200
            text-blue-600
            rounded-xl
            py-3
            transition-all
            duration-300
          "
        >
          <FaEye />

          <span className="hidden sm:inline">View</span>
        </Link>

        {/* ===========================
              Edit Button
        =========================== */}

        <Link
          href={`/patients/edit/${patient._id}`}
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-yellow-100
            hover:bg-yellow-200
            text-yellow-700
            rounded-xl
            py-3
            transition-all
            duration-300
          "
        >
          <FaEdit />

          <span className="hidden sm:inline">Edit</span>
        </Link>

        {/* ===========================
              Delete Button
        =========================== */}

        <button
          onClick={handleDelete}
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-red-100
            hover:bg-red-200
            text-red-600
            rounded-xl
            py-3
            transition-all
            duration-300
          "
        >
          <FaTrash />

          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  );
}
