"use client";

import Link from "next/link";

import toast from "react-hot-toast";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaHeartbeat,
  FaCalendarAlt,
  FaPills,
  FaBaby,
} from "react-icons/fa";

import { deletePatient } from "@/services/patientService";

export default function PatientTable({
  patients,

  onRefresh,
}) {
  /* ===========================
        Delete Patient
  =========================== */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?",
    );

    if (!confirmDelete) return;

    try {
      await deletePatient(id);

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
    <div className="overflow-x-auto rounded-2xl">
      <table className="min-w-full">
        {/* ===========================
              Table Header
        =========================== */}

        <thead>
          <tr className="bg-pink-600 text-white">
            <th className="px-6 py-4 text-left">Patient</th>

            <th className="px-6 py-4 text-left">Age</th>

            <th className="px-6 py-4 text-left">Mobile</th>

            <th className="px-6 py-4 text-left">Risk</th>

            <th className="px-6 py-4 text-left">Status</th>

            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient._id}
              className="border-b hover:bg-pink-50 transition"
            >
              {/* ===========================
                    Patient
              =========================== */}

              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  {patient.patientPhoto ? (
                    <img
                      src={`http://localhost:5000${patient.patientPhoto}`}
                      alt={patient.fullName}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
                      {patient.fullName?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold">{patient.fullName}</h3>

                    <p className="text-sm text-gray-500">{patient.mobile}</p>
                  </div>
                </div>
              </td>

              {/* Age */}

              <td className="px-6 py-5">{patient.age}</td>

              {/* Mobile */}

              <td className="px-6 py-5">{patient.mobile}</td>

              {/* ===========================
                    Risk Level
              =========================== */}

              <td className="px-6 py-5">
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
              </td>

              {/* ===========================
                    Status
              =========================== */}

              <td className="px-6 py-5">
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
              </td>

              {/* ===========================
                    Actions
              =========================== */}

              <td className="px-6 py-5">
                <div className="flex justify-center gap-3">
                  {/* View */}

                  <Link
                    href={`/patients/${patient._id}`}
                    className="
                      p-3
                      rounded-lg
                      bg-blue-100
                      text-blue-600
                      hover:bg-blue-200
                      transition
                    "
                  >
                    <FaEye />
                  </Link>

                  {/* Edit */}

                  {/* <Link
                    href={`/patients/edit/${patient._id}`}
                    className="
                      p-3
                      rounded-lg
                      bg-yellow-100
                      text-yellow-700
                      hover:bg-yellow-200
                      transition
                    "
                  >
                    <FaEdit />
                  </Link> */}

                  {/* ANC Visits */}

                  <Link
                    href={`/patients/${patient._id}/anc`}
                    className="
    p-3
    rounded-lg
    bg-pink-100
    text-pink-600
    hover:bg-pink-200
    transition
    flex
    items-center
    justify-center
  "
                    title="Manage ANC Visits"
                  >
                    <FaHeartbeat />
                  </Link>

                  <Link
                    href={`/patients/${patient._id}/appointments`}
                    className="
    p-3
    rounded-lg
    bg-green-100
    text-green-600
    hover:bg-green-200
    transition
    flex
    items-center
    justify-center
  "
                    title="Appointments"
                  >
                    <FaCalendarAlt />
                  </Link>

                  <Link
                    href={`/patients/${patient._id}/medicines`}
                    className="
    p-3
    rounded-lg
    bg-purple-100
    text-purple-600
    hover:bg-purple-200
    transition
    flex
    items-center
    justify-center
  "
                    title="Medicines"
                  >
                    <FaPills />
                  </Link>

                  <Link
                    href={`/patients/${patient._id}/deliveries`}
                    className="
    p-3
    rounded-lg
    bg-orange-100
    text-orange-600
    hover:bg-orange-200
    transition
    flex
    items-center
    justify-center
  "
                    title="Delivery"
                  >
                    <FaBaby />
                  </Link>

                  {/* Delete */}

                  <button
                    onClick={() => handleDelete(patient._id)}
                    className="
                      p-3
                      rounded-lg
                      bg-red-100
                      text-red-600
                      hover:bg-red-200
                      transition
                    "
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
