"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  FaHospital,
  FaUserMd,
  FaUsers,
  FaCalendarAlt,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function ProjectCard({
  id,
  projectName,
  hospitalName,
  doctorName,
  patientCount,
  createdDate,
  status = "Active",
  logo = "/images/hospital.png",
}) {
  const statusColor =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : status === "Completed"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden"
    >
      {/* Top */}

      <div className="bg-gradient-to-r from-pink-500 to-pink-700 p-6 text-white">

        <div className="flex items-center justify-between">

          <img
            src={logo}
            alt="Hospital"
            className="w-16 h-16 rounded-full bg-white p-2"
          />

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor}`}
          >
            {status}
          </span>

        </div>

        <h2 className="text-2xl font-bold mt-6">
          {projectName}
        </h2>

        <p className="text-pink-100 mt-2">
          Maternal Health Monitoring Project
        </p>

      </div>

      {/* Body */}

      <div className="p-6 space-y-4">

        <div className="flex items-center gap-3">

          <FaHospital className="text-pink-500" />

          <span>{hospitalName}</span>

        </div>

        <div className="flex items-center gap-3">

          <FaUserMd className="text-pink-500" />

          <span>{doctorName}</span>

        </div>

        <div className="flex items-center gap-3">

          <FaUsers className="text-pink-500" />

          <span>{patientCount} Patients</span>

        </div>

        <div className="flex items-center gap-3">

          <FaCalendarAlt className="text-pink-500" />

          <span>{createdDate}</span>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t p-5 flex justify-between">

        <Link
          href={`/project-details?id=${id}`}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition"
        >
          <FaEye />
          View
        </Link>

        <Link
          href={`/edit-project?id=${id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition"
        >
          <FaEdit />
          Edit
        </Link>

        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition"
          onClick={() => alert("Delete functionality will be connected to the backend later.")}
        >
          <FaTrash />
          Delete
        </button>

      </div>
    </motion.div>
  );
}