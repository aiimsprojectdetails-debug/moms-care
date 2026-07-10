"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import { getPatientById, deletePatient } from "@/services/patientService";

import Link from "next/link";

import toast from "react-hot-toast";

import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

import { getAncVisits } from "@/services/ancVisitService";

import { getAppointments } from "@/services/appointmentService";

import { getMedicines } from "@/services/medicineService";

import { getDeliveries } from "@/services/deliveryService";

import PatientTimeline from "@/components/patients/PatientTimeline";

import HealthAlerts from "@/components/patients/HealthAlerts";

export default function PatientProfilePage() {
  const router = useRouter();

  const params = useParams();

  const { id } = params;

  /* ===========================
        Sidebar
  =========================== */

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ===========================
        Loading
  =========================== */

  const [loading, setLoading] = useState(true);

  /* ===========================
        Error
  =========================== */

  const [error, setError] = useState("");

  /* ===========================
        Patient
  =========================== */

  const [patient, setPatient] = useState(null);

  const [ancVisits, setAncVisits] = useState([]);

  const [appointments, setAppointments] = useState([]);

  const [medicines, setMedicines] = useState([]);

  const [deliveries, setDeliveries] = useState([]);

  /* ===========================
        Fetch Patient
  =========================== */

  useEffect(() => {
    if (!id) return;

    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      setLoading(true);

      const response = await getPatientById(id);

      setPatient(response.data.patient);

      const ancRes = await getAncVisits(id);
      setAncVisits(ancRes.data.visits || []);

      const appointmentRes = await getAppointments(id);
      setAppointments(appointmentRes.data.appointments || []);

      const medicineRes = await getMedicines(id);
      setMedicines(medicineRes.data.medicines || []);

      const deliveryRes = await getDeliveries(id);
      setDeliveries(deliveryRes.data.deliveries || []);
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Unable to load patient.");

      toast.error(error.response?.data?.message || "Unable to load patient.");
    } finally {
      setLoading(false);
    }
  };

  const latestAnc = ancVisits.length > 0 ? ancVisits[0] : null;

  const nextAppointment = appointments.length > 0 ? appointments[0] : null;

  const activeMedicines = medicines.filter(
    (medicine) => medicine.status === "Ongoing",
  );

  const latestDelivery = deliveries.length > 0 ? deliveries[0] : null;

  const pregnancyProgress = Math.min(
    ((patient?.pregnancyWeek || 0) / 40) * 100,
    100,
  );

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?",
    );

    if (!confirmDelete) return;

    try {
      await deletePatient(patient._id);

      toast.success("Patient deleted successfully.");

      router.push("/patients");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete patient.");
    }
  };

  /* ===========================
        Loading State
  =========================== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="w-14 h-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  /* ===========================
        Error State
  =========================== */

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600">{error}</h2>

          <button
            onClick={() => router.push("/patients")}
            className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700"
          >
            Back to Patients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 flex overflow-hidden">
      {/* ===========================
            Sidebar
      =========================== */}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* ===========================
            Main Content
      =========================== */}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}

        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* ===========================
              Page Content
        =========================== */}

        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          {/* Header */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-pink-600">
                Patient Profile
              </h1>

              <p className="text-gray-500 mt-2">
                Complete patient medical information.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 bg-white border border-pink-300 px-5 py-3 rounded-xl hover:bg-pink-100 transition"
              >
                <FaArrowLeft />
                Back
              </button>

              <Link
                href={`/patients/edit/${patient._id}`}
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl transition"
              >
                <FaEdit />
                Edit
              </Link>

              <Link
                href={`/reports/patient/${patient._id}`}
                className="
    flex
    items-center
    gap-2
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-5
    py-3
    rounded-xl
    transition
  "
              >
                View Report
              </Link>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>

          {/* ===========================
      Dashboard Summary
=========================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {/* Risk Level */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-gray-500 text-sm">Risk Level</p>

              <h2
                className={`text-3xl font-bold mt-2 ${
                  patient.riskLevel === "High"
                    ? "text-red-600"
                    : patient.riskLevel === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                }`}
              >
                {patient.riskLevel}
              </h2>
            </div>

            {/* ANC Visits */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-gray-500 text-sm">ANC Visits</p>

              <h2 className="text-3xl font-bold text-pink-600 mt-2">
                {ancVisits.length}
              </h2>
            </div>

            {/* Active Medicines */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-gray-500 text-sm">Active Medicines</p>

              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                {activeMedicines.length}
              </h2>
            </div>

            {/* Delivery */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-gray-500 text-sm">Delivery Status</p>

              <h2 className="text-2xl font-bold mt-2">
                {latestDelivery ? "Completed" : "Pending"}
              </h2>
            </div>
          </div>

          {/* ===========================
                Patient Header Card
          =========================== */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Patient Avatar */}

              {patient.patientPhoto ? (
                <img
                  src={`http://localhost:5000${patient.patientPhoto}`}
                  alt={patient.fullName}
                  className="w-36 h-36 rounded-full object-cover border-4 border-pink-200"
                />
              ) : (
                <div
                  className="
      w-36
      h-36
      rounded-full
      bg-pink-100
      flex
      items-center
      justify-center
      text-5xl
      font-bold
      text-pink-600
      border-4
      border-pink-200
    "
                >
                  {patient.fullName?.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Patient Info */}

              <div className="flex-1">
                <h2 className="text-4xl font-bold text-gray-800">
                  {patient.fullName}
                </h2>

                <p className="text-gray-500 mt-2">
                  {patient.email || "No Email"}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-semibold">
                    {patient.gender}
                  </span>

                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                    {patient.age} Years
                  </span>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold
                    ${
                      patient.riskLevel === "High"
                        ? "bg-red-100 text-red-700"
                        : patient.riskLevel === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {patient.riskLevel} Risk
                  </span>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                    {patient.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===========================
      Pregnancy Progress
=========================== */}

          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-pink-600">
                  Pregnancy Progress
                </h2>

                <p className="text-gray-500 mt-2">
                  Week {patient.pregnancyWeek || 0} of 40
                </p>
              </div>

              <div className="text-right">
                <h2 className="text-3xl font-bold text-pink-600">
                  {Math.round(pregnancyProgress)}%
                </h2>

                <p className="text-gray-500 text-sm">Completed</p>
              </div>
            </div>

            {/* Progress Bar */}

            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-pink-600 h-5 rounded-full transition-all duration-500"
                  style={{
                    width: `${pregnancyProgress}%`,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div>
                <p className="text-gray-500 text-sm">Trimester</p>

                <h3 className="font-bold mt-1">{patient.trimester}</h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Risk</p>

                <h3 className="font-bold mt-1">{patient.riskLevel}</h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Expected Delivery</p>

                <h3 className="font-bold mt-1">
                  {patient.expectedDeliveryDate
                    ? new Date(
                        patient.expectedDeliveryDate,
                      ).toLocaleDateString()
                    : "N/A"}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Pregnancy Number</p>

                <h3 className="font-bold mt-1">{patient.pregnancyNumber}</h3>
              </div>
            </div>
          </div>

          {/* ===========================
      Quick Actions
=========================== */}

          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* ANC */}

              <Link
                href={`/patients/${patient._id}/anc`}
                className="
        bg-pink-100
        hover:bg-pink-200
        rounded-xl
        p-6
        text-center
        transition
      "
              >
                <div className="text-4xl mb-3">❤️</div>

                <h3 className="font-bold">ANC Visits</h3>

                <p className="text-sm text-gray-500 mt-2">
                  {ancVisits.length} Visits
                </p>
              </Link>

              {/* Appointment */}

              <Link
                href={`/patients/${patient._id}/appointments`}
                className="
        bg-blue-100
        hover:bg-blue-200
        rounded-xl
        p-6
        text-center
        transition
      "
              >
                <div className="text-4xl mb-3">📅</div>

                <h3 className="font-bold">Appointments</h3>

                <p className="text-sm text-gray-500 mt-2">
                  {appointments.length} Records
                </p>
              </Link>

              {/* Medicines */}

              <Link
                href={`/patients/${patient._id}/medicines`}
                className="
        bg-purple-100
        hover:bg-purple-200
        rounded-xl
        p-6
        text-center
        transition
      "
              >
                <div className="text-4xl mb-3">💊</div>

                <h3 className="font-bold">Medicines</h3>

                <p className="text-sm text-gray-500 mt-2">
                  {activeMedicines.length} Active
                </p>
              </Link>

              {/* Delivery */}

              <Link
                href={`/patients/${patient._id}/deliveries`}
                className="
        bg-orange-100
        hover:bg-orange-200
        rounded-xl
        p-6
        text-center
        transition
      "
              >
                <div className="text-4xl mb-3">👶</div>

                <h3 className="font-bold">Delivery</h3>

                <p className="text-sm text-gray-500 mt-2">
                  {latestDelivery ? "Completed" : "Pending"}
                </p>
              </Link>
            </div>
          </div>

          {/* ===========================
      Latest Medical Summary
=========================== */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            {/* Latest ANC */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                ❤️ Latest ANC Visit
              </h2>

              {latestAnc ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Pregnancy Week</span>
                    <strong>{latestAnc.pregnancyWeek}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Blood Pressure</span>
                    <strong>{latestAnc.bloodPressure || "N/A"}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Weight</span>
                    <strong>{latestAnc.weight || "N/A"} kg</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Hemoglobin</span>
                    <strong>{latestAnc.hemoglobin || "N/A"}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Blood Sugar</span>
                    <strong>{latestAnc.bloodSugar || "N/A"}</strong>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No ANC Visits Found</p>
              )}
            </div>

            {/* Appointment */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-6">
                📅 Upcoming Appointment
              </h2>

              {nextAppointment ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Date</span>

                    <strong>
                      {new Date(
                        nextAppointment.appointmentDate,
                      ).toLocaleDateString()}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Doctor</span>

                    <strong>{nextAppointment.doctorName}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Hospital</span>

                    <strong>{nextAppointment.hospitalName}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Status</span>

                    <strong>{nextAppointment.status}</strong>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No Upcoming Appointment</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            {/* Medicines */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-purple-600 mb-6">
                💊 Active Medicines
              </h2>

              {activeMedicines.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {activeMedicines.map((medicine) => (
                    <span
                      key={medicine._id}
                      className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full"
                    >
                      {medicine.medicineName}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No Active Medicines</p>
              )}
            </div>

            {/* Delivery */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-orange-600 mb-6">
                👶 Delivery Summary
              </h2>

              {latestDelivery ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Date</span>

                    <strong>
                      {new Date(
                        latestDelivery.deliveryDate,
                      ).toLocaleDateString()}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Baby Gender</span>

                    <strong>{latestDelivery.babyGender}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Weight</span>

                    <strong>{latestDelivery.babyWeight} kg</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Mother</span>

                    <strong>{latestDelivery.motherCondition}</strong>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Delivery Pending</p>
              )}
            </div>
          </div>

          {/* ===========================
                Personal Information
          =========================== */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Personal Information
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">Full Name</span>

                  <span>{patient.fullName}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">Age</span>

                  <span>{patient.age} Years</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">Gender</span>

                  <span>{patient.gender}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">Mobile</span>

                  <span>{patient.mobile}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">Email</span>

                  <span>{patient.email || "N/A"}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">Aadhaar</span>

                  <span>{patient.aadhaar}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">
                    Blood Group
                  </span>

                  <span>{patient.bloodGroup || "N/A"}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">Height</span>

                  <span>{patient.height || 0} cm</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Weight</span>

                  <span>{patient.weight || 0} kg</span>
                </div>
              </div>
            </div>

            {/* ===========================
                  Address Information
            =========================== */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Address Information
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">Address</span>

                  <span>{patient.address || "N/A"}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">Village</span>

                  <span>{patient.village || "N/A"}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">District</span>

                  <span>{patient.district || "N/A"}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">State</span>

                  <span>{patient.state || "N/A"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">PIN Code</span>

                  <span>{patient.pincode || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===========================
                Pregnancy & Hospital
          =========================== */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
            {/* Pregnancy Information */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Pregnancy Information
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">
                    Pregnancy Number
                  </span>

                  <span>{patient.pregnancyNumber || 1}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">
                    Pregnancy Week
                  </span>

                  <span>{patient.pregnancyWeek || 0} Weeks</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">Trimester</span>

                  <span>{patient.trimester}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">
                    Last Menstrual Period
                  </span>

                  <span>
                    {patient.lmp
                      ? new Date(patient.lmp).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">
                    Expected Delivery
                  </span>

                  <span>
                    {patient.expectedDeliveryDate
                      ? new Date(
                          patient.expectedDeliveryDate,
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">
                    Risk Level
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      patient.riskLevel === "High"
                        ? "bg-red-100 text-red-700"
                        : patient.riskLevel === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {patient.riskLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Hospital Information */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Hospital Information
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">Hospital</span>

                  <span>{patient.hospitalName || "N/A"}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">
                    Hospital ID
                  </span>

                  <span>{patient.hospitalPatientId || "N/A"}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">Doctor</span>

                  <span>{patient.doctorName || "N/A"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">
                    Registration Date
                  </span>

                  <span>
                    {patient.registrationDate
                      ? new Date(patient.registrationDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===========================
                Medical Information
          =========================== */}

          <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">
              Medical Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <div>
                <p className="text-gray-500 text-sm">Blood Pressure</p>

                <p className="font-semibold">
                  {patient.bloodPressure || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Hemoglobin</p>

                <p className="font-semibold">{patient.hemoglobin || "N/A"}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Blood Sugar</p>

                <p className="font-semibold">{patient.bloodSugar || "N/A"}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Allergies</p>

                <p className="font-semibold">{patient.allergies || "None"}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Existing Disease</p>

                <p className="font-semibold">
                  {patient.existingDisease || "None"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Medications</p>

                <p className="font-semibold">{patient.medications || "None"}</p>
              </div>
            </div>
          </div>

          {/* ===========================
                Emergency Contact
          =========================== */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Emergency Contact
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">
                    Contact Name
                  </span>

                  <span>{patient.emergencyName || "N/A"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">
                    Contact Number
                  </span>

                  <span>{patient.emergencyPhone || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* ===========================
                  Appointment
            =========================== */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Appointment
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-600">
                    Next Appointment
                  </span>

                  <span>
                    {patient.nextAppointment
                      ? new Date(patient.nextAppointment).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Status</span>

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-semibold

                      ${
                        patient.appointmentStatus === "Completed"
                          ? "bg-green-100 text-green-700"
                          : patient.appointmentStatus === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                      }
                    `}
                  >
                    {patient.appointmentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===========================
                Doctor Remarks
          =========================== */}

          <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">
              Doctor Remarks
            </h2>

            <div className="bg-pink-50 rounded-xl p-5">
              <p className="text-gray-700 leading-8">
                {patient.doctorRemarks || "No remarks available."}
              </p>
            </div>
          </div>

          {/* ===========================
                Documents
          =========================== */}

          <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Documents</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="border rounded-xl p-5">
                <h3 className="font-semibold">Aadhaar</h3>

                <p className="text-gray-500 mt-2">
                  {patient.aadhaarFile ? "Uploaded" : "Not Uploaded"}
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-semibold">Blood Report</h3>

                <p className="text-gray-500 mt-2">
                  {patient.bloodReport ? "Uploaded" : "Not Uploaded"}
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-semibold">Ultrasound</h3>

                <p className="text-gray-500 mt-2">
                  {patient.ultrasound ? "Uploaded" : "Not Uploaded"}
                </p>
              </div>
            </div>
          </div>

          {/* ===========================
      Patient Timeline
=========================== */}

          <PatientTimeline
            patient={patient}
            ancVisits={ancVisits}
            appointments={appointments}
            medicines={medicines}
            deliveries={deliveries}
          />

          {/* ===========================
      Health Alerts
=========================== */}

          <HealthAlerts
            patient={patient}
            latestAnc={latestAnc}
            nextAppointment={nextAppointment}
            activeMedicines={activeMedicines}
            latestDelivery={latestDelivery}
          />
        </main>
      </div>
    </div>
  );
}
