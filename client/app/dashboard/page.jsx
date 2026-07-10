"use client";

import { useState, useEffect } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import TodayAppointments from "@/components/dashboard/TodayAppointments";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardChart from "@/components/dashboard/DashboardChart";
import RecentPatients from "@/components/dashboard/RecentPatients";
import QuickActions from "@/components/dashboard/QuickActions";
import HighRiskPatients from "@/components/dashboard/HighRiskPatients";
import UpcomingDeliveries from "@/components/dashboard/UpcomingDeliveries";
import RecentActivities from "@/components/dashboard/RecentActivities";

import { getDashboardOverview } from "@/services/dashboardService";
import { getTodayAppointments } from "@/services/appointmentService";
import { getPatients } from "@/services/patientService";
import { getAllDeliveries } from "@/services/deliveryService";
import { getAllAncVisits } from "@/services/ancVisitService";
import { getAllMedicines } from "@/services/medicineService";
import { getAllAppointments } from "@/services/appointmentService";

import {
  FaUserInjured,
  FaHeartbeat,
  FaProjectDiagram,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Dashboard() {
  // Mobile Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [overview, setOverview] = useState({
    totalPatients: 0,
    totalProjects: 0,
    highRiskPatients: 0,
    upcomingAppointments: 0,
  });

  const [todayAppointments, setTodayAppointments] = useState([]);

  const [patients, setPatients] = useState([]);

  const [deliveries, setDeliveries] = useState([]);

  const [appointments, setAppointments] = useState([]);

  const [ancVisits, setAncVisits] = useState([]);

  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboardOverview();

        setOverview(response.data.overview);

        const appointmentRes = await getTodayAppointments();

        setTodayAppointments(appointmentRes.data.appointments || []);

        const patientRes = await getPatients();

        setPatients(patientRes.data.patients || []);

        const deliveryRes = await getAllDeliveries();

        setDeliveries(deliveryRes.data.deliveries || []);

        const allAppointmentRes = await getAllAppointments();

        setAppointments(allAppointmentRes.data.appointments || []);

        const ancRes = await getAllAncVisits();

        setAncVisits(ancRes.data.visits || []);

        const medicineRes = await getAllMedicines();

        setMedicines(medicineRes.data.medicines || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

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

        {/* Dashboard */}

        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          {/* Heading */}

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-600">
              Dashboard
            </h1>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Welcome to Mom's Care Maternal Health Monitoring System
            </p>
          </div>

          {/* Dashboard Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <DashboardCard
              title="Total Patients"
              value={overview.totalPatients}
              icon={<FaUserInjured />}
              color="from-pink-500 to-pink-700"
              change="+15 This Month"
              description="Registered Mothers"
            />

            <DashboardCard
              title="High Risk"
              value={overview.highRiskPatients}
              icon={<FaHeartbeat />}
              color="from-red-500 to-red-700"
              change="3 Critical"
              description="Needs Immediate Care"
            />

            <DashboardCard
              title="Projects"
              value={overview.totalProjects}
              icon={<FaProjectDiagram />}
              color="from-purple-500 to-purple-700"
              change="+2 New"
              description="Hospital Projects"
            />

            <DashboardCard
              title="Appointments"
              value={overview.upcomingAppointments}
              icon={<FaCalendarAlt />}
              color="from-blue-500 to-blue-700"
              change="Today's Visits"
              description="Scheduled Visits"
            />
          </div>

          {/* Dashboard Chart */}

          <section className="mt-6">
            <DashboardChart />
          </section>

          {/* Dashboard Widgets */}

          <section className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
            <TodayAppointments appointments={todayAppointments} />

            <HighRiskPatients patients={patients} />

            <UpcomingDeliveries deliveries={deliveries} />
          </section>
          {/* Quick Actions */}

          <section className="mt-6">
            <QuickActions />
          </section>

          {/* Recent Activities */}

          <section className="mt-6">
            <RecentActivities
              patients={patients}
              appointments={appointments}
              ancVisits={ancVisits}
              deliveries={deliveries}
              medicines={medicines}
            />
          </section>

          {/* Recent Patients */}

          <section className="mt-6">
            <RecentPatients />
          </section>
        </main>
      </div>
    </div>
  );
}
