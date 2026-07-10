"use client";

import { useEffect, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import { getProject } from "@/services/projectService";

import {
  FaHospital,
  FaUserMd,
  FaUsers,
  FaCalendarAlt,
  FaHeartbeat,
  FaFolderOpen,
} from "react-icons/fa";

function ProjectDetailsContent() {
  /* ===========================
        Get Project ID
  =========================== */

  const searchParams = useSearchParams();

  const projectId = searchParams.get("id");

  /* ===========================
        States
  =========================== */

  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* ===========================
        Fetch Project
  =========================== */

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setLoading(true);

      const response = await getProject(projectId);

      console.log(response.data);

      setProject(response.data.project);
    } catch (err) {
      console.error(err);

      setError("Unable to load project.");
    } finally {
      setLoading(false);
    }
  };

  /* ===========================
        Loading
  =========================== */

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-pink-50">
        <h2 className="text-3xl font-bold text-pink-600">Loading Project...</h2>
      </div>
    );
  }

  /* ===========================
        Error
  =========================== */

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-pink-50">
        <h2 className="text-3xl font-bold text-red-500">{error}</h2>
      </div>
    );
  }

  /* ===========================
        Project Not Found
  =========================== */

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-pink-50">
        <h2 className="text-3xl font-bold text-red-500">Project Not Found</h2>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-pink-50">
      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8">
          {/* Header */}

          <div className="bg-gradient-to-r from-pink-500 to-pink-700 rounded-3xl text-white p-8 shadow-xl">
            <div className="flex justify-between items-center flex-wrap gap-6">
              <div>
                <h1 className="text-4xl font-bold">{project.title}</h1>

                <p className="text-pink-100 mt-3">
                  Complete Project Information
                </p>
              </div>

              <Link
                href={`/edit-project?id=${project._id}`}
                className="bg-white text-pink-600 px-6 py-3 rounded-xl font-semibold hover:bg-pink-100 transition"
              >
                Edit Project
              </Link>
            </div>
          </div>

          {/* ===========================
                Statistics
          =========================== */}

          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {/* Total Patients */}

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <FaUsers className="text-pink-600 text-4xl mb-4" />

              <h2 className="text-3xl font-bold">
                {project.patients?.length || 0}
              </h2>

              <p className="text-gray-500 mt-2">Total Patients</p>
            </div>

            {/* High Risk */}

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <FaHeartbeat className="text-red-500 text-4xl mb-4" />

              <h2 className="text-3xl font-bold">
                {project.patients?.filter(
                  (p) => p.riskLevel === "High" || p.riskLevel === "High Risk",
                ).length || 0}
              </h2>

              <p className="text-gray-500 mt-2">High Risk</p>
            </div>

            {/* Appointments */}

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <FaCalendarAlt className="text-blue-500 text-4xl mb-4" />

              <h2 className="text-3xl font-bold">
                {project.patients?.length || 0}
              </h2>

              <p className="text-gray-500 mt-2">Registered Mothers</p>
            </div>

            {/* Status */}

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <FaFolderOpen className="text-purple-600 text-4xl mb-4" />

              <h2 className="text-2xl font-bold">{project.status}</h2>

              <p className="text-gray-500 mt-2">Project Status</p>
            </div>
          </div>

          {/* ===========================
                Project Information
          =========================== */}

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Left */}

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Project Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 p-4 rounded-full">
                    <FaHospital className="text-pink-600 text-2xl" />
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Hospital</p>

                    <h3 className="font-semibold text-lg">
                      {project.hospitalName || "-"}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 p-4 rounded-full">
                    <FaUserMd className="text-pink-600 text-2xl" />
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Mentor</p>

                    <h3 className="font-semibold text-lg">{project.mentor}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 p-4 rounded-full">
                    <FaUsers className="text-pink-600 text-2xl" />
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Created By</p>

                    <h3 className="font-semibold">
                      {project.createdBy?.fullName || "-"}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Project Timeline
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-semibold">Department</span>

                  <span>{project.department || "-"}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-semibold">Start Date</span>

                  <span>
                    {new Date(project.startDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-semibold">End Date</span>

                  <span>{new Date(project.endDate).toLocaleDateString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-semibold">Status</span>

                  <span
                    className={`
                      px-4 py-2 rounded-full font-semibold
                      ${
                        project.status === "Ongoing"
                          ? "bg-green-100 text-green-700"
                          : project.status === "Completed"
                            ? "bg-blue-100 text-blue-700"
                            : project.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===========================
                Project Description
          =========================== */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">
              Project Description
            </h2>

            <p className="text-gray-700 leading-8">
              {project.description || "No description available."}
            </p>
          </div>

          {/* ===========================
                Patient Management
          =========================== */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-3xl font-bold text-pink-600">
                  Patient Management
                </h2>

                <p className="text-gray-500 mt-2">
                  Manage all pregnant mothers under this project.
                </p>
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/add-patient?project=${project._id}`}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  ➕ Add Patient
                </Link>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                  📄 Generate Report
                </button>
              </div>
            </div>

            {/* Search */}

            <div className="mt-8">
              <input
                type="text"
                placeholder="Search Patient by Name, Mobile or Aadhaar..."
                className="w-full border rounded-2xl p-5 outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* ===========================
                Pregnancy Statistics
          =========================== */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
            {/* First Trimester */}

            <div className="bg-pink-500 text-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold">1st Trimester</h3>

              <h1 className="text-5xl font-bold mt-4">
                {project.patients?.filter(
                  (p) => p.trimester === "1st Trimester",
                ).length || 0}
              </h1>

              <p className="mt-3 text-pink-100">Pregnant Mothers</p>
            </div>

            {/* Second Trimester */}

            <div className="bg-purple-500 text-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold">2nd Trimester</h3>

              <h1 className="text-5xl font-bold mt-4">
                {project.patients?.filter(
                  (p) => p.trimester === "2nd Trimester",
                ).length || 0}
              </h1>

              <p className="mt-3 text-purple-100">Pregnant Mothers</p>
            </div>

            {/* Third Trimester */}

            <div className="bg-blue-500 text-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold">3rd Trimester</h3>

              <h1 className="text-5xl font-bold mt-4">
                {project.patients?.filter(
                  (p) => p.trimester === "3rd Trimester",
                ).length || 0}
              </h1>

              <p className="mt-3 text-blue-100">Pregnant Mothers</p>
            </div>

            {/* High Risk */}

            <div className="bg-red-500 text-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold">High Risk Cases</h3>

              <h1 className="text-5xl font-bold mt-4">
                {project.patients?.filter(
                  (p) => p.riskLevel === "High" || p.riskLevel === "High Risk",
                ).length || 0}
              </h1>

              <p className="mt-3 text-red-100">Immediate Attention</p>
            </div>
          </div>

          {/* ===========================
                Registered Patients
          =========================== */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-pink-600">
                  Registered Patients
                </h2>

                <p className="text-gray-500 mt-2">
                  All pregnant mothers registered under this project
                </p>
              </div>

              <Link
                href={`/add-patient?project=${project._id}`}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                + Add New Patient
              </Link>
            </div>

            {project.patients && project.patients.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-pink-50">
                    <tr>
                      <th className="text-left p-4">Patient</th>

                      <th className="text-left p-4">Mobile</th>

                      <th className="text-left p-4">Trimester</th>

                      <th className="text-left p-4">Risk</th>

                      <th className="text-left p-4">Blood Group</th>

                      <th className="text-center p-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {project.patients.map((patient) => (
                      <tr
                        key={patient._id}
                        className="border-b hover:bg-pink-50"
                      >
                        {/* Name */}

                        <td className="p-4">
                          <div>
                            <h3 className="font-semibold">
                              {patient.fullName}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {patient.email}
                            </p>
                          </div>
                        </td>

                        {/* Mobile */}

                        <td className="p-4">{patient.mobile}</td>

                        {/* Trimester */}

                        <td className="p-4">{patient.trimester}</td>

                        {/* Risk */}

                        <td className="p-4">
                          <span
                            className={`
                                px-3 py-1 rounded-full text-sm font-semibold
                                ${
                                  patient.riskLevel === "High" ||
                                  patient.riskLevel === "High Risk"
                                    ? "bg-red-100 text-red-700"
                                    : patient.riskLevel === "Medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-green-100 text-green-700"
                                }
                              `}
                          >
                            {patient.riskLevel || "Low"}
                          </span>
                        </td>

                        {/* Blood Group */}

                        <td className="p-4">{patient.bloodGroup || "-"}</td>

                        {/* Actions */}

                        <td className="p-4">
                          <div className="flex justify-center gap-3">
                            <Link
                              href={`/patient-details?id=${patient._id}`}
                              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
                            >
                              View
                            </Link>

                            <Link
                              href={`/edit-patient?id=${patient._id}`}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                              Edit
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-500">
                  No Patients Added Yet
                </h2>

                <p className="text-gray-400 mt-3">
                  Start by adding the first pregnant mother to this project.
                </p>

                <Link
                  href={`/add-patient?project=${project._id}`}
                  className="inline-block mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Add First Patient
                </Link>
              </div>
            )}
          </div>

          {/* ===========================
                Funding Information
          =========================== */}

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Funding Details
              </h2>

              <div className="space-y-5">
                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold">Funding Agency</span>

                  <span>{project.fundingAgency || "-"}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold">Funding Amount</span>

                  <span>₹ {project.fundingAmount || 0}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold">Priority</span>

                  <span>{project.priority}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold">Category</span>

                  <span>{project.category}</span>
                </div>
              </div>
            </div>

            {/* Documents */}

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Project Documents
              </h2>

              {project.documents && project.documents.length > 0 ? (
                <div className="space-y-4">
                  {project.documents.map((doc) => (
                    <a
                      key={doc.fileUrl}
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex justify-between items-center border rounded-xl p-4 hover:bg-pink-50"
                    >
                      <span>{doc.fileName}</span>

                      <span className="text-pink-600">View</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No Documents Uploaded
                </div>
              )}
            </div>
          </div>

          {/* ===========================
                Project Summary
          =========================== */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-bold text-pink-600 mb-6">
              Project Summary
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center bg-pink-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-pink-600">
                  Patients
                </h3>

                <h1 className="text-4xl font-bold mt-3">
                  {project.patients?.length || 0}
                </h1>
              </div>

              <div className="text-center bg-blue-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-blue-600">Status</h3>

                <h1 className="text-2xl font-bold mt-4">{project.status}</h1>
              </div>

              <div className="text-center bg-green-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-green-600">Mentor</h3>

                <h1 className="text-xl font-bold mt-4">{project.mentor}</h1>
              </div>

              <div className="text-center bg-yellow-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-yellow-700">
                  Hospital
                </h3>

                <h1 className="text-xl font-bold mt-4">
                  {project.hospitalName || "-"}
                </h1>
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8 mb-8">
            <h2 className="text-2xl font-bold text-pink-600">
              Mom's Care Project Dashboard
            </h2>

            <p className="text-gray-600 mt-4 leading-8">
              This page displays complete information about the selected project
              including mentor details, hospital information, funding,
              registered pregnant mothers, patient statistics, documents, and
              project progress. All information shown on this page is loaded
              directly from the MongoDB database.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ProjectDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ProjectDetailsContent />
    </Suspense>
  );
}
