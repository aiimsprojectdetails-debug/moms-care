"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import AppointmentForm from "@/components/appointment/AppointmentForm";
import AppointmentTable from "@/components/appointment/AppointmentTable";

import {
  getAppointments,
  deleteAppointment,
} from "@/services/appointmentService";

export default function AppointmentPage() {
  const { id } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [appointments, setAppointments] = useState([]);

  const [editAppointment, setEditAppointment] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const res = await getAppointments(id);

      setAppointments(res.data.appointments || []);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async (appointmentId) => {

    const confirmDelete = window.confirm(
      "Delete this appointment?"
    );

    if (!confirmDelete) return;

    try {

      await deleteAppointment(appointmentId);

      alert("Appointment Deleted Successfully");

      fetchAppointments();

    } catch (error) {

      console.error(error);

      alert("Unable to delete appointment.");

    }
  };

  const handleEdit = (appointment) => {

    setEditAppointment(appointment);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

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

          <div className="flex items-center justify-between mb-8">

            <div>

              <h1 className="text-4xl font-bold text-pink-600">
                Appointment Management
              </h1>

              <p className="text-gray-500 mt-2">
                Manage patient appointments.
              </p>

            </div>

            <Link
              href={`/patients/${id}`}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-xl"
            >
              Back to Patient
            </Link>

          </div>

          <AppointmentForm
            patientId={id}
            editAppointment={editAppointment}
            onSuccess={() => {

              fetchAppointments();

              setEditAppointment(null);

            }}
          />

          <div className="mt-10">

            {loading ? (

              <div className="text-center py-10">

                Loading Appointments...

              </div>

            ) : (

              <AppointmentTable
                appointments={appointments}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />

            )}

          </div>

        </main>

      </div>

    </div>
  );
}