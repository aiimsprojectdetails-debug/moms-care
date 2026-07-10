"use client";

import {
  FaCalendarCheck,
  FaClock,
} from "react-icons/fa";

export default function TodayAppointments({

  appointments = [],

}) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-pink-600">

          Today's Appointments

        </h2>

        <FaCalendarCheck
          className="text-pink-600"
          size={28}
        />

      </div>

      {appointments.length === 0 ? (

        <div className="text-center py-10 text-gray-500">

          No appointments scheduled for today.

        </div>

      ) : (

        <div className="space-y-4">

          {appointments.map((appointment) => (

            <div
              key={appointment._id}
              className="
                flex
                justify-between
                items-center
                border
                rounded-xl
                p-4
                hover:bg-pink-50
                transition
              "
            >

              <div>

                <h3 className="font-semibold text-lg">

                  {appointment.patient?.fullName || "Unknown Patient"}

                </h3>

                <p className="text-gray-500">

                  {appointment.purpose || "General Checkup"}

                </p>

              </div>

              <div className="text-right">

                <div className="flex items-center gap-2 justify-end">

                  <FaClock className="text-pink-600" />

                  <span>

                    {appointment.appointmentTime}

                  </span>

                </div>

                <span
                  className="
                    inline-block
                    mt-2
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                  "
                >

                  {appointment.status}

                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}