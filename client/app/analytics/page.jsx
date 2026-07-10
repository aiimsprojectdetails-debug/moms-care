"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { exportToExcel } from "@/utils/excelExport";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import PatientStatistics from "@/components/analytics/PatientStatistics";
import RiskPieChart from "@/components/analytics/RiskPieChart";
import MonthlyRegistrationChart from "@/components/analytics/MonthlyRegistrationChart";
import AppointmentStatusChart from "@/components/analytics/AppointmentStatusChart";
import AncVisitTrendChart from "@/components/analytics/AncVisitTrendChart";
import DeliveryStatisticsChart from "@/components/analytics/DeliveryStatisticsChart";
import MedicineUsageChart from "@/components/analytics/MedicineUsageChart";

import { getPatients } from "@/services/patientService";
import { getAllAppointments } from "@/services/appointmentService";
import { getAllAncVisits } from "@/services/ancVisitService";
import { getAllDeliveries } from "@/services/deliveryService";
import { getAllMedicines } from "@/services/medicineService";

export default function AnalyticsPage() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [ancVisits, setAncVisits] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      setLoading(true);

      const patientRes =
        await getPatients();

      setPatients(
        patientRes.data.patients || []
      );

      const appointmentRes =
        await getAllAppointments();

      setAppointments(
        appointmentRes.data.appointments || []
      );

      const ancRes =
        await getAllAncVisits();

      setAncVisits(
        ancRes.data.visits || []
      );

      const deliveryRes =
        await getAllDeliveries();

      setDeliveries(
        deliveryRes.data.deliveries || []
      );

      const medicineRes =
        await getAllMedicines();

      setMedicines(
        medicineRes.data.medicines || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-pink-50 flex">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-8">

          {/* ===========================
              Header
          =========================== */}

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-10">

            <div>

              <h1 className="text-4xl font-bold text-pink-600">

                Analytics Dashboard

              </h1>

              <p className="text-gray-500 mt-2">

                Maternal Care Analytics Overview

              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <Link
                href="/reports/analytics"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                Analytics Report
              </Link>

              <button
                onClick={() =>
                  exportToExcel(
                    patients,
                    "Patients",
                    "Patients"
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                Export Patients
              </button>

              <button
                onClick={() =>
                  exportToExcel(
                    appointments,
                    "Appointments",
                    "Appointments"
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                Export Appointments
              </button>

              <button
                onClick={() =>
                  exportToExcel(
                    ancVisits,
                    "ANC_Visits",
                    "ANC Visits"
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                Export ANC
              </button>

              <button
                onClick={() =>
                  exportToExcel(
                    deliveries,
                    "Deliveries",
                    "Deliveries"
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                Export Deliveries
              </button>

              <button
                onClick={() =>
                  exportToExcel(
                    medicines,
                    "Medicines",
                    "Medicines"
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                Export Medicines
              </button>

            </div>

          </div>

          {/* ===========================
              Loading
          =========================== */}

          {loading ? (

            <div className="text-center py-20 text-lg">

              Loading Analytics...

            </div>

          ) : (

            <div className="space-y-8">

              {/* Statistics */}

              <PatientStatistics
                patients={patients}
              />

              {/* Charts */}

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                <RiskPieChart
                  patients={patients}
                />

                <MonthlyRegistrationChart
                  patients={patients}
                />

                <AppointmentStatusChart
                  appointments={appointments}
                />

                <AncVisitTrendChart
                  ancVisits={ancVisits}
                />

                <DeliveryStatisticsChart
                  deliveries={deliveries}
                />

                <MedicineUsageChart
                  medicines={medicines}
                />

              </div>

            </div>

          )}

        </main>

      </div>

    </div>

  );

}