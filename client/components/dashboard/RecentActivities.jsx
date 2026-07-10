"use client";

import {
  FaUserPlus,
  FaCalendarCheck,
  FaHeartbeat,
  FaBaby,
  FaPills,
} from "react-icons/fa";

export default function RecentActivities({

  patients = [],

  appointments = [],

  ancVisits = [],

  deliveries = [],

  medicines = [],

}) {

  const activities = [

    ...patients.map((patient) => ({
      id: patient._id,
      type: "Patient Registered",
      title: patient.fullName,
      date: patient.createdAt,
      icon: <FaUserPlus className="text-pink-600" />,
    })),

    ...appointments.map((appointment) => ({
      id: appointment._id,
      type: "Appointment",
      title:
        appointment.patient?.fullName ||
        "Unknown Patient",
      date: appointment.createdAt,
      icon: (
        <FaCalendarCheck className="text-blue-600" />
      ),
    })),

    ...ancVisits.map((visit) => ({
      id: visit._id,
      type: "ANC Visit",
      title:
        visit.patient?.fullName ||
        "Unknown Patient",
      date: visit.createdAt,
      icon: (
        <FaHeartbeat className="text-purple-600" />
      ),
    })),

    ...deliveries.map((delivery) => ({
      id: delivery._id,
      type: "Delivery",
      title:
        delivery.patient?.fullName ||
        "Unknown Patient",
      date: delivery.createdAt,
      icon: (
        <FaBaby className="text-green-600" />
      ),
    })),

    ...medicines.map((medicine) => ({
      id: medicine._id,
      type: "Medicine",
      title:
        medicine.patient?.fullName ||
        "Unknown Patient",
      date: medicine.createdAt,
      icon: (
        <FaPills className="text-orange-600" />
      ),
    })),

  ]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, 10);

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-pink-600 mb-6">

        Recent Activities

      </h2>

      {activities.length === 0 ? (

        <div className="text-center py-10 text-gray-500">

          No recent activities.

        </div>

      ) : (

        <div className="space-y-4 max-h-[500px] overflow-y-auto">

          {activities.map((activity, index) => (

            <div
              key={`${activity.type}-${activity.id}-${index}`}
              className="
                flex
                items-center
                gap-4
                border-b
                pb-4
              "
            >

              <div className="text-2xl">

                {activity.icon}

              </div>

              <div className="flex-1">

                <p className="font-semibold">

                  {activity.type}

                </p>

                <p className="text-gray-500">

                  {activity.title}

                </p>

              </div>

              <div className="text-sm text-gray-400">

                {new Date(
                  activity.date
                ).toLocaleDateString()}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}