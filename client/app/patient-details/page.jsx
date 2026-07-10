"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import { getProjectById } from "@/services/projectService";

import PregnancySummary from "@/components/patients/PregnancySummary";
import MedicalHistory from "@/components/patients/MedicalHistory";
import AppointmentCard from "@/components/patients/AppointmentCard";

import Image from "next/image";
import Link from "next/link";

import {
  FaArrowLeft,
  FaEdit,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaBirthdayCake,
  FaHeartbeat,
  FaBaby,
  FaHospital,
} from "react-icons/fa";

import { getPatientById } from "@/services/patientService";

function PatientDetailsContent() {
  /* ===============================
        URL Parameter
  ================================ */

  const searchParams = useSearchParams();

  const patientId = searchParams.get("id");

  /* ===============================
        Sidebar
  ================================ */

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ===============================
        States
  ================================ */

  const [patient, setPatient] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* ===============================
        Fetch Patient
  ================================ */

  useEffect(() => {
    if (patientId) {
      fetchPatient();
    }
  }, [patientId]);

  const fetchPatient = async () => {
    try {
      setLoading(true);

      const response = await getPatientById(patientId);

      setPatient(response.data.patient);
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Unable to load patient.");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
        Loading
  ================================ */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  /* ===============================
        Error
  ================================ */

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-600 text-2xl">{error}</h1>
      </div>
    );
  }

  /* ===============================
        Patient Not Found
  ================================ */

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Patient not found.</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-pink-50">
      {/* Sidebar */}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main */}

      <div className="flex-1 flex flex-col">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-8">
          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <Link href="/patients" className="hover:text-pink-600">
              Patients
            </Link>

            <span>›</span>

            <span className="font-semibold text-pink-600">Patient Details</span>
          </div>

          {/* ===========================
                Header
          =========================== */}

          <div className="bg-gradient-to-r from-pink-500 to-pink-700 rounded-3xl shadow-xl text-white p-8">
            <div className="flex justify-between items-center flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <Image
                  src={
                    patient.patientPhoto
                      ? patient.patientPhoto
                      : "/images/patient.png"
                  }
                  alt={patient.fullName}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white object-cover"
                  unoptimized
                />

                <div>
                  <h1 className="text-4xl font-bold">{patient.fullName}</h1>

                  <p className="text-pink-100 mt-2">Pregnant Mother</p>

                  <div className="flex gap-3 mt-4">
                    <span className="bg-white/20 px-4 py-2 rounded-full">
                      {patient.trimester}
                    </span>

                    <span className="bg-white/20 px-4 py-2 rounded-full">
                      {patient.riskLevel} Risk
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/patients"
                  className="bg-white text-pink-600 px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-pink-100"
                >
                  <FaArrowLeft />
                  Back
                </Link>

                <Link
                  href={`/edit-patient?id=${patient._id}`}
                  className="bg-pink-900 px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-pink-950"
                >
                  <FaEdit />
                  Edit
                </Link>
              </div>
            </div>
          </div>

          {/* ===========================
                Patient Profile
          =========================== */}

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Basic Information */}

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Basic Information
              </h2>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-pink-600" />

                  <span className="font-semibold">Mobile :</span>

                  <span>{patient.mobile}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-pink-600" />

                  <span className="font-semibold">Email :</span>

                  <span>{patient.email || "N/A"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaIdCard className="text-pink-600" />

                  <span className="font-semibold">Aadhaar :</span>

                  <span>{patient.aadhaar}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaBirthdayCake className="text-pink-600" />

                  <span className="font-semibold">Age :</span>

                  <span>{patient.age} Years</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaHeartbeat className="text-red-500" />

                  <span className="font-semibold">Blood Group :</span>

                  <span>{patient.bloodGroup || "N/A"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-pink-600" />

                  <span className="font-semibold">Address :</span>

                  <span>{patient.address}</span>
                </div>
              </div>
            </div>

            {/* Hospital Information */}

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Hospital Information
              </h2>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <FaHospital className="text-pink-600" />

                  <span className="font-semibold">Hospital :</span>

                  <span>{patient.hospitalName}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaHeartbeat className="text-pink-600" />

                  <span className="font-semibold">Doctor :</span>

                  <span>{patient.doctorName}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaBaby className="text-pink-600" />

                  <span className="font-semibold">Current Trimester :</span>

                  <span>{patient.trimester}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaHeartbeat className="text-pink-600" />

                  <span className="font-semibold">Pregnancy Week :</span>

                  <span>{patient.pregnancyWeek}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaHeartbeat className="text-pink-600" />

                  <span className="font-semibold">Registration :</span>

                  <span>
                    {new Date(patient.registrationDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===========================
                Statistics
          =========================== */}

          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-4xl font-bold text-pink-600">
                {patient.pregnancyWeek}
              </h2>

              <p className="text-gray-500 mt-2">Pregnancy Week</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-4xl font-bold text-red-600">
                {patient.bloodPressure || "--"}
              </h2>

              <p className="text-gray-500 mt-2">Blood Pressure</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-4xl font-bold text-green-600">
                {patient.hemoglobin || "--"}
              </h2>

              <p className="text-gray-500 mt-2">Hemoglobin</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-4xl font-bold text-blue-600">
                {patient.riskLevel}
              </h2>

              <p className="text-gray-500 mt-2">Risk Level</p>
            </div>
          </div>

          {/* ===========================
                Pregnancy Summary
          =========================== */}

          <div className="mt-8">
            <PregnancySummary
              trimester={patient.trimester}
              pregnancyWeek={patient.pregnancyWeek}
              expectedDelivery={
                patient.expectedDeliveryDate
                  ? new Date(patient.expectedDeliveryDate).toLocaleDateString()
                  : "Not Available"
              }
              motherWeight={`${patient.weight} kg`}
              babyWeight="-"
              bloodPressure={patient.bloodPressure}
              hemoglobin={`${patient.hemoglobin} g/dL`}
              bloodSugar={`${patient.bloodSugar} mg/dL`}
              riskLevel={patient.riskLevel}
              doctor={patient.doctorName}
              remarks={patient.doctorRemarks || "No Doctor Remarks"}
            />
          </div>

          {/* ===========================
                Medical History &
                Appointment
          =========================== */}

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Medical History */}

            <MedicalHistory
              previousPregnancies={patient.previousPregnancies}
              previousDeliveries={patient.previousDeliveries}
              miscarriage={patient.miscarriage}
              diabetes={patient.existingDisease || "No"}
              hypertension={patient.bloodPressure}
              thyroid={patient.existingDisease || "No"}
              anemia={patient.hemoglobin < 11 ? "Yes" : "No"}
              allergies={patient.allergies || "None"}
              surgeries={patient.surgeries || "None"}
              medications={patient.medications || "None"}
              vaccinations={patient.vaccinations || "None"}
              familyHistory={patient.familyHistory || "None"}
              doctorNotes={patient.doctorRemarks || "No Remarks"}
            />

            {/* Appointment */}

            <AppointmentCard
              appointmentDate={
                patient.nextAppointment
                  ? new Date(patient.nextAppointment).toLocaleDateString()
                  : "No Appointment"
              }
              appointmentTime="10:00 AM"
              doctor={patient.doctorName}
              hospital={patient.hospitalName}
              department="Obstetrics & Gynecology"
              status={patient.appointmentStatus}
              location={patient.hospitalName}
              notes={patient.doctorRemarks || "No Notes"}
            />
          </div>

          {/* ===========================
                Health Monitoring
          =========================== */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-bold text-pink-600 mb-8">
              Current Health Monitoring
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="bg-pink-50 rounded-2xl p-6 text-center">
                <h3 className="text-lg font-semibold text-pink-600">
                  Blood Pressure
                </h3>

                <h1 className="text-4xl font-bold mt-4">
                  {patient.bloodPressure || "--"}
                </h1>

                <p className="text-gray-500 mt-2">Latest Reading</p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-600">
                  Blood Sugar
                </h3>

                <h1 className="text-4xl font-bold mt-4">
                  {patient.bloodSugar || "--"}
                </h1>

                <p className="text-gray-500 mt-2">mg/dL</p>
              </div>

              <div className="bg-green-50 rounded-2xl p-6 text-center">
                <h3 className="text-lg font-semibold text-green-600">
                  Hemoglobin
                </h3>

                <h1 className="text-4xl font-bold mt-4">
                  {patient.hemoglobin || "--"}
                </h1>

                <p className="text-gray-500 mt-2">g/dL</p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 text-center">
                <h3 className="text-lg font-semibold text-purple-600">
                  Mother Weight
                </h3>

                <h1 className="text-4xl font-bold mt-4">
                  {patient.weight || "--"}
                </h1>

                <p className="text-gray-500 mt-2">Kg</p>
              </div>
            </div>
          </div>

          {/* ===========================
                Uploaded Reports
          =========================== */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-pink-600">
                  Uploaded Medical Reports
                </h2>

                <p className="text-gray-500 mt-2">
                  Patient investigation reports
                </p>
              </div>

              <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl">
                Upload Report
              </button>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Patient Photo */}

              {patient.patientPhoto && (
                <div className="border rounded-2xl p-6">
                  <h3 className="font-bold text-pink-600">Patient Photo</h3>

                  <img
                    src={patient.patientPhoto}
                    alt="Patient"
                    className="w-full h-40 object-cover rounded-xl mt-4"
                  />

                  <a
                    href={patient.patientPhoto}
                    target="_blank"
                    className="block mt-4 bg-pink-100 text-pink-600 text-center py-2 rounded-xl"
                  >
                    View
                  </a>
                </div>
              )}

              {/* Aadhaar */}

              {patient.aadhaarFile && (
                <div className="border rounded-2xl p-6">
                  <h3 className="font-bold text-pink-600">Aadhaar Card</h3>

                  <a
                    href={patient.aadhaarFile}
                    target="_blank"
                    className="block mt-8 bg-pink-100 text-center py-2 rounded-xl text-pink-600"
                  >
                    View Document
                  </a>
                </div>
              )}

              {/* Blood Report */}

              {patient.bloodReport && (
                <div className="border rounded-2xl p-6">
                  <h3 className="font-bold text-pink-600">Blood Report</h3>

                  <a
                    href={patient.bloodReport}
                    target="_blank"
                    className="block mt-8 bg-pink-100 text-center py-2 rounded-xl text-pink-600"
                  >
                    View Report
                  </a>
                </div>
              )}

              {/* Ultrasound */}

              {patient.ultrasound && (
                <div className="border rounded-2xl p-6">
                  <h3 className="font-bold text-pink-600">Ultrasound</h3>

                  <a
                    href={patient.ultrasound}
                    target="_blank"
                    className="block mt-8 bg-pink-100 text-center py-2 rounded-xl text-pink-600"
                  >
                    View Scan
                  </a>
                </div>
              )}

              {/* Additional Reports */}

              {patient.reports?.map((report) => (
                <div key={report._id} className="border rounded-2xl p-6">
                  <h3 className="font-bold text-pink-600">{report.title}</h3>

                  <p className="text-gray-500 mt-2">
                    {new Date(report.uploadedAt).toLocaleDateString()}
                  </p>

                  <a
                    href={report.fileUrl}
                    target="_blank"
                    className="block mt-4 bg-pink-100 text-center py-2 rounded-xl text-pink-600"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* ===========================
                Medicines
          =========================== */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-bold text-pink-600 mb-8">
              Current Medicines
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-pink-50">
                  <tr>
                    <th className="text-left p-4">Medicine</th>

                    <th className="text-left p-4">Dosage</th>

                    <th className="text-left p-4">Frequency</th>

                    <th className="text-left p-4">Duration</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="p-4">
                      {patient.medications || "No Medicines"}
                    </td>

                    <td className="p-4">-</td>

                    <td className="p-4">-</td>

                    <td className="p-4">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ===========================
                Doctor Notes
          =========================== */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-bold text-pink-600 mb-6">
              Doctor's Notes
            </h2>

            <div className="bg-pink-50 rounded-2xl p-6">
              <p className="text-gray-700 leading-8">
                {patient.doctorRemarks || "No doctor's notes available."}
              </p>
            </div>
          </div>

          {/* ===========================
                Pregnancy Timeline
          =========================== */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-bold text-pink-600 mb-8">
              Pregnancy Timeline
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-5 h-5 rounded-full bg-pink-600 mt-2"></div>

                <div>
                  <h3 className="font-bold text-lg">
                    {new Date(patient.registrationDate).toLocaleDateString()}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Patient registered in Mom's Care.
                  </p>
                </div>
              </div>

              {patient.nextAppointment && (
                <div className="flex gap-6">
                  <div className="w-5 h-5 rounded-full bg-green-500 mt-2"></div>

                  <div>
                    <h3 className="font-bold text-lg">
                      {new Date(patient.nextAppointment).toLocaleDateString()}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      Next ANC appointment scheduled.
                    </p>
                  </div>
                </div>
              )}

              {patient.expectedDeliveryDate && (
                <div className="flex gap-6">
                  <div className="w-5 h-5 rounded-full bg-blue-500 mt-2"></div>

                  <div>
                    <h3 className="font-bold text-lg">
                      {new Date(
                        patient.expectedDeliveryDate,
                      ).toLocaleDateString()}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      Expected Delivery Date.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===========================
                Emergency Contact
          =========================== */}

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Emergency Contact
              </h2>

              <div className="space-y-5">
                <div>
                  <span className="font-semibold">Contact Person</span>

                  <p className="text-gray-600 mt-2">
                    {patient.emergencyName || "Not Available"}
                  </p>
                </div>

                <div>
                  <span className="font-semibold">Mobile Number</span>

                  <p className="text-gray-600 mt-2">
                    {patient.emergencyPhone || "Not Available"}
                  </p>
                </div>

                <div>
                  <span className="font-semibold">Address</span>

                  <p className="text-gray-600 mt-2">
                    {patient.address || "Not Available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Quick Actions
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <Link
                  href={`/edit-patient?id=${patient._id}`}
                  className="bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-semibold text-center transition"
                >
                  Edit Patient
                </Link>

                <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition">
                  Add Visit
                </button>

                <button className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition">
                  Generate PDF
                </button>

                <button className="bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition">
                  Delete Patient
                </button>
              </div>
            </div>
          </div>

          {/* ===========================
                Footer
          =========================== */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8 mb-8">
            <h2 className="text-2xl font-bold text-pink-600">Mom's Care</h2>

            <p className="text-gray-600 mt-4 leading-8">
              This dashboard provides a complete overview of the patient's
              pregnancy journey, including personal details, pregnancy summary,
              health monitoring, appointments, uploaded reports, medicines,
              doctor remarks, and emergency contact information.
            </p>
          </div>
                </main>
      </div>
    </div>
  );
}

export default function PatientDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-14 h-14 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <PatientDetailsContent />
    </Suspense>
  );
}
