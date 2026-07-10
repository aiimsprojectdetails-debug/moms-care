"use client";

import {
  FaUserInjured,
  FaCalendarCheck,
  FaHeartbeat,
  FaBaby,
  FaPills,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function DashboardSummaryCards({

  patients = [],

  appointments = [],

  ancVisits = [],

  deliveries = [],

  medicines = [],

}) {

  const highRiskPatients = patients.filter(
    (patient) => patient.riskLevel === "High"
  ).length;

  const cards = [

    {
      title: "Patients",
      value: patients.length,
      icon: <FaUserInjured size={28} />,
      color: "bg-pink-500",
    },

    {
      title: "Appointments",
      value: appointments.length,
      icon: <FaCalendarCheck size={28} />,
      color: "bg-blue-500",
    },

    {
      title: "ANC Visits",
      value: ancVisits.length,
      icon: <FaHeartbeat size={28} />,
      color: "bg-purple-500",
    },

    {
      title: "Deliveries",
      value: deliveries.length,
      icon: <FaBaby size={28} />,
      color: "bg-green-500",
    },

    {
      title: "Medicines",
      value: medicines.length,
      icon: <FaPills size={28} />,
      color: "bg-orange-500",
    },

    {
      title: "High Risk",
      value: highRiskPatients,
      icon: <FaExclamationTriangle size={28} />,
      color: "bg-red-500",
    },

  ];

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>

            </div>

            <div
              className={`${card.color} text-white p-4 rounded-full`}
            >
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>

  );

}