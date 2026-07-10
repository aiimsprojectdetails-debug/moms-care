"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import PatientForm from "@/components/patients/PatientForm";

import {
  FaUserPlus,
  FaArrowLeft,
} from "react-icons/fa";

function AddPatientContent() {
  const searchParams = useSearchParams();

  const projectId = searchParams.get("project");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-pink-50">

      {/* Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}

      <div className="flex-1 flex flex-col">

        {/* Navbar */}

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}

        <main className="flex-1 p-8">

          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-gray-600 mb-6">

            <Link
              href="/dashboard"
              className="hover:text-pink-600 transition"
            >
              Dashboard
            </Link>

            <span>›</span>

            <Link
              href="/patients"
              className="hover:text-pink-600 transition"
            >
              Patients
            </Link>

            <span>›</span>

            <span className="font-semibold text-pink-600">
              Add Patient
            </span>

          </div>

          {/* Hero */}

          <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 rounded-3xl shadow-xl text-white p-8 mb-8">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

              <div className="flex items-center gap-5">

                <div className="bg-white/20 p-5 rounded-full">
                  <FaUserPlus size={40} />
                </div>

                <div>

                  <h1 className="text-4xl font-bold">
                    Register New Patient
                  </h1>

                  <p className="mt-3 text-pink-100">
                    Register a pregnant woman and start pregnancy monitoring.
                  </p>

                </div>

              </div>

              <Link
                href="/patients"
                className="bg-white text-pink-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-3 hover:bg-pink-100 transition"
              >
                <FaArrowLeft />
                Back to Patients
              </Link>

            </div>

          </div>

          {/* Information Cards */}

          <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h3 className="text-pink-600 font-bold text-xl">
                Personal Details
              </h3>

              <p className="text-gray-500 mt-3">
                Basic information including Aadhaar, contact details and address.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h3 className="text-pink-600 font-bold text-xl">
                Pregnancy Details
              </h3>

              <p className="text-gray-500 mt-3">
                Trimester, LMP, EDD, medical history and current pregnancy status.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h3 className="text-pink-600 font-bold text-xl">
                Registration
              </h3>

              <p className="text-gray-500 mt-3">
                Complete the patient registration form.
              </p>

            </div>

          </div>

          {/* Patient Form */}

          <PatientForm projectId={projectId} />

        </main>

      </div>

    </div>
  );
}

export default function AddPatientPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <AddPatientContent />
    </Suspense>
  );
}