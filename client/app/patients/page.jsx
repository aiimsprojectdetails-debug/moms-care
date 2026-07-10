"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import PatientTable from "@/components/patients/PatientTable";
import PatientCard from "@/components/patients/PatientCard";

import { FaUserPlus, FaSearch } from "react-icons/fa";

import { getPatients } from "@/services/patientService";

export default function PatientsPage() {
  /* ===========================
        Sidebar
  =========================== */

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ===========================
        Patients
  =========================== */

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* ===========================
        Search
  =========================== */

  const [search, setSearch] = useState("");

  /* ===========================
        Fetch Patients
  =========================== */

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const response = await getPatients();

      console.log(response.data);

      /*
        We will update this after
        checking your backend response.
      */

      setPatients(response.data.patients || []);
    } catch (err) {
      console.error(err);

      setError("Unable to load patients.");
    } finally {
      setLoading(false);
    }
  };

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
          {/* ===========================
                Header
          =========================== */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-pink-600">
                Patients
              </h1>

              <p className="text-gray-500 mt-2">
                Manage all registered mothers and their medical records.
              </p>
            </div>

            {/* Add Patient */}

            <Link
              href="/projects"
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                bg-pink-600
                hover:bg-pink-700
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                shadow-lg
                transition-all
              "
            >
              <FaUserPlus />
              Add Patient
            </Link>
          </div>

          {/* ===========================
                Search
          =========================== */}

          <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
            <div className="relative">
              <FaSearch
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-pink-500
                "
              />

              <input
                type="text"
                placeholder="Search by Name, Mobile or Aadhaar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  border
                  rounded-xl
                  py-3
                  pl-12
                  pr-4
                  outline-none
                  focus:ring-2
                  focus:ring-pink-400
                "
              />
            </div>
          </div>

          {/* ===========================
                Patients Section
          =========================== */}

          <div className="bg-white rounded-2xl shadow-md p-5">
            {/* ===========================
                Loading
          =========================== */}

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              /* ===========================
                  Error
            =========================== */

              <div className="text-center py-16">
                <h2 className="text-red-500 text-xl font-semibold">{error}</h2>
              </div>
            ) : patients.length === 0 ? (
              /* ===========================
                  Empty State
            =========================== */

              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-600">
                  No Patients Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Click the button above to add your first patient.
                </p>
              </div>
            ) : (
              <>
                {/* ===========================
                    Desktop Table
              =========================== */}

                <div className="hidden lg:block">
                  <PatientTable
                    patients={patients}
                    search={search}
                    onRefresh={fetchPatients}
                  />
                </div>

                {/* ===========================
                    Mobile Cards
              =========================== */}

                <div className="grid grid-cols-1 gap-5 lg:hidden">
                  {patients
                    .filter((patient) => {
                      const keyword = search.toLowerCase();

                      return (
                        patient.fullName?.toLowerCase().includes(keyword) ||
                        patient.mobile?.toLowerCase().includes(keyword) ||
                        patient.aadhaar?.toLowerCase().includes(keyword)
                      );
                    })
                    .map((patient) => (
                      <PatientCard
                        key={patient._id}
                        patient={patient}
                        onRefresh={fetchPatients}
                      />
                    ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
