"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import { globalSearch } from "@/services/searchService";

import {
  FaSearch,
  FaUser,
  FaCalendarAlt,
  FaHeartbeat,
  FaPills,
  FaBaby,
} from "react-icons/fa";

export default function SearchPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState({
    patients: [],
    appointments: [],
    ancVisits: [],
    medicines: [],
    deliveries: [],
  });

  useEffect(() => {
    if (!query.trim()) {
      setResults({
        patients: [],
        appointments: [],
        ancVisits: [],
        medicines: [],
        deliveries: [],
      });
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await globalSearch(query);

        setResults(res.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const Section = ({ title, icon, data, renderItem }) => {
    if (!data.length) return null;

    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
        <div className="flex items-center gap-3 mb-5">
          {icon}
          <h2 className="text-2xl font-bold text-pink-600">
            {title}
          </h2>
        </div>

        <div className="space-y-3">
          {data.map(renderItem)}
        </div>
      </div>
    );
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

          <h1 className="text-4xl font-bold text-pink-600">
            Global Search
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Search Patients, ANC Visits, Appointments,
            Medicines and Deliveries
          </p>

          <div className="relative">

            <FaSearch
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search patient name..."
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              className="
                w-full
                pl-12
                pr-4
                py-4
                rounded-xl
                border
                bg-white
                shadow
                outline-none
                focus:ring-2
                focus:ring-pink-500
              "
            />

          </div>

          {loading && (
            <div className="mt-6 text-pink-600 font-semibold">
              Searching...
            </div>
          )}

          {!loading &&
            query &&
            Object.values(results).every(
              (arr) => arr.length === 0
            ) && (
              <div className="mt-6 text-gray-500">
                No matching records found.
              </div>
            )}

          <Section
            title="Patients"
            icon={<FaUser className="text-pink-600" />}
            data={results.patients}
            renderItem={(patient) => (
              <div
                key={patient._id}
                className="border rounded-xl p-4"
              >
                <p className="font-semibold">
                  {patient.fullName}
                </p>
                <p>{patient.mobile}</p>
              </div>
            )}
          />

          <Section
            title="Appointments"
            icon={<FaCalendarAlt className="text-blue-600" />}
            data={results.appointments}
            renderItem={(appointment) => (
              <div
                key={appointment._id}
                className="border rounded-xl p-4"
              >
                <p className="font-semibold">
                  {appointment.patient?.fullName}
                </p>
                <p>{appointment.status}</p>
              </div>
            )}
          />

          <Section
            title="ANC Visits"
            icon={<FaHeartbeat className="text-purple-600" />}
            data={results.ancVisits}
            renderItem={(visit) => (
              <div
                key={visit._id}
                className="border rounded-xl p-4"
              >
                <p className="font-semibold">
                  {visit.patient?.fullName}
                </p>
                <p>
                  Week {visit.pregnancyWeek}
                </p>
              </div>
            )}
          />

          <Section
            title="Medicines"
            icon={<FaPills className="text-orange-600" />}
            data={results.medicines}
            renderItem={(medicine) => (
              <div
                key={medicine._id}
                className="border rounded-xl p-4"
              >
                <p className="font-semibold">
                  {medicine.patient?.fullName}
                </p>
                <p>{medicine.medicineName}</p>
              </div>
            )}
          />

          <Section
            title="Deliveries"
            icon={<FaBaby className="text-green-600" />}
            data={results.deliveries}
            renderItem={(delivery) => (
              <div
                key={delivery._id}
                className="border rounded-xl p-4"
              >
                <p className="font-semibold">
                  {delivery.patient?.fullName}
                </p>
                <p>{delivery.deliveryType}</p>
              </div>
            )}
          />

        </main>
      </div>
    </div>
  );
}