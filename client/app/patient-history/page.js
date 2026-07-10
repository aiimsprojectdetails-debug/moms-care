"use client";

import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import {
  FaArrowLeft,
  FaHistory,
  FaHeartbeat,
  FaCalendarAlt,
  FaFileMedical,
  FaUserMd,
} from "react-icons/fa";

const history = [
  {
    id: 1,
    date: "05 Jan 2026",
    week: "8 Weeks",
    title: "Patient Registration",
    doctor: "Dr. Amit Khuntia",
    notes:
      "Patient registered in Mom's Care. Initial ANC examination completed. Iron and folic acid tablets prescribed.",
    bp: "118/78",
    hb: "12.6",
    sugar: "90",
  },
  {
    id: 2,
    date: "18 Feb 2026",
    week: "14 Weeks",
    title: "First Trimester Check-up",
    doctor: "Dr. Amit Khuntia",
    notes:
      "Ultrasound normal. Baby growth appropriate. Continue supplements.",
    bp: "120/80",
    hb: "12.4",
    sugar: "92",
  },
  {
    id: 3,
    date: "20 Apr 2026",
    week: "22 Weeks",
    title: "Second Trimester Visit",
    doctor: "Dr. Amit Khuntia",
    notes:
      "Blood pressure normal. Baby movements normal. Anatomy scan completed.",
    bp: "118/76",
    hb: "12.3",
    sugar: "95",
  },
  {
    id: 4,
    date: "18 Jun 2026",
    week: "30 Weeks",
    title: "Routine ANC Visit",
    doctor: "Dr. Amit Khuntia",
    notes:
      "Mother healthy. Continue calcium and iron tablets. Next visit after 2 weeks.",
    bp: "120/80",
    hb: "12.5",
    sugar: "94",
  },
];

export default function PatientHistoryPage() {
  return (
    <div className="flex min-h-screen bg-pink-50">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-8">

          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-gray-600 mb-6">

            <Link href="/patients" className="hover:text-pink-600">
              Patients
            </Link>

            <span>›</span>

            <span className="font-semibold text-pink-600">
              Patient History
            </span>

          </div>

          {/* Header */}

          <div className="bg-gradient-to-r from-pink-500 to-pink-700 rounded-3xl text-white shadow-xl p-8">

            <div className="flex justify-between items-center flex-wrap gap-6">

              <div className="flex items-center gap-5">

                <div className="bg-white/20 p-5 rounded-full">

                  <FaHistory size={40} />

                </div>

                <div>

                  <h1 className="text-4xl font-bold">
                    Patient Medical History
                  </h1>

                  <p className="text-pink-100 mt-2">
                    Complete pregnancy journey and ANC visits.
                  </p>

                </div>

              </div>

              <Link
                href="/patient-details"
                className="bg-white text-pink-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-3"
              >
                <FaArrowLeft />
                Back
              </Link>

            </div>

          </div>

          {/* Timeline */}

          <div className="mt-10">

            {history.map((item) => (

              <div
                key={item.id}
                className="relative pl-12 pb-12"
              >

                {/* Timeline Line */}

                <div className="absolute left-4 top-0 bottom-0 w-1 bg-pink-300"></div>

                {/* Circle */}

                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-pink-600 border-4 border-white"></div>

                {/* Card */}

                <div className="bg-white rounded-3xl shadow-lg p-8">

                  <div className="flex flex-wrap justify-between gap-4">

                    <div>

                      <h2 className="text-2xl font-bold text-pink-600">

                        {item.title}

                      </h2>

                      <p className="text-gray-500 mt-2">

                        {item.date}

                      </p>

                    </div>

                    <span className="bg-pink-100 text-pink-700 px-5 py-2 rounded-full font-semibold">

                      {item.week}

                    </span>

                  </div>

                  {/* Stats */}

                  <div className="grid md:grid-cols-3 gap-6 mt-8">

                    <div className="bg-pink-50 rounded-2xl p-5">

                      <FaHeartbeat className="text-pink-600 text-2xl mb-3"/>

                      <p className="text-gray-500">
                        Blood Pressure
                      </p>

                      <h3 className="text-2xl font-bold">

                        {item.bp}

                      </h3>

                    </div>

                    <div className="bg-green-50 rounded-2xl p-5">

                      <FaFileMedical className="text-green-600 text-2xl mb-3"/>

                      <p className="text-gray-500">

                        Hemoglobin

                      </p>

                      <h3 className="text-2xl font-bold">

                        {item.hb}

                      </h3>

                    </div>

                    <div className="bg-blue-50 rounded-2xl p-5">

                      <FaCalendarAlt className="text-blue-600 text-2xl mb-3"/>

                      <p className="text-gray-500">

                        Blood Sugar

                      </p>

                      <h3 className="text-2xl font-bold">

                        {item.sugar}

                      </h3>

                    </div>

                  </div>

                  {/* Doctor */}

                  <div className="mt-8 flex items-center gap-3">

                    <FaUserMd className="text-pink-600"/>

                    <span className="font-semibold">

                      {item.doctor}

                    </span>

                  </div>

                  {/* Notes */}

                  <div className="bg-pink-50 rounded-2xl p-6 mt-6">

                    <h3 className="font-bold text-pink-600 mb-3">

                      Doctor Notes

                    </h3>

                    <p className="text-gray-700 leading-7">

                      {item.notes}

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </main>

      </div>

    </div>
  );
}