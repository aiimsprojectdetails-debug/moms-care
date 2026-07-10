"use client";

import {
  FaCalendarCheck,
  FaClock,
  FaHospital,
  FaUserMd,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function AppointmentCard({
  appointmentDate = "25 June 2026",
  appointmentTime = "10:30 AM",
  doctor = "Dr. Amit Khuntia",
  hospital = "AIIMS Bhubaneswar",
  department = "Gynecology",
  status = "Upcoming",
  location = "Room 204, OPD Block",
  notes = "Routine antenatal check-up. Bring previous reports and ultrasound documents.",
}) {

  const statusColor =
    status === "Completed"
      ? "bg-green-100 text-green-700"
      : status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : status === "Ongoing"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-blue-100 text-blue-700";

  return (

    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white p-8">

        <h2 className="text-3xl font-bold flex items-center gap-3">

          <FaCalendarCheck />

          Appointment Details

        </h2>

        <p className="text-pink-100 mt-2">

          Next hospital visit information

        </p>

      </div>

      {/* Body */}

      <div className="p-8 grid md:grid-cols-2 gap-8">

        {/* Left */}

        <div className="space-y-5">

          <div className="flex items-center gap-3">

            <FaCalendarCheck className="text-pink-600 text-xl" />

            <span className="font-semibold">

              Appointment Date :

            </span>

            <span>{appointmentDate}</span>

          </div>

          <div className="flex items-center gap-3">

            <FaClock className="text-pink-600 text-xl" />

            <span className="font-semibold">

              Appointment Time :

            </span>

            <span>{appointmentTime}</span>

          </div>

          <div className="flex items-center gap-3">

            <FaUserMd className="text-pink-600 text-xl" />

            <span className="font-semibold">

              Doctor :

            </span>

            <span>{doctor}</span>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-5">

          <div className="flex items-center gap-3">

            <FaHospital className="text-pink-600 text-xl" />

            <span className="font-semibold">

              Hospital :

            </span>

            <span>{hospital}</span>

          </div>

          <div className="flex items-center gap-3">

            <FaMapMarkerAlt className="text-pink-600 text-xl" />

            <span className="font-semibold">

              Department :

            </span>

            <span>{department}</span>

          </div>

          <div className="flex items-center gap-3">

            <FaMapMarkerAlt className="text-pink-600 text-xl" />

            <span className="font-semibold">

              Location :

            </span>

            <span>{location}</span>

          </div>

        </div>

      </div>

      {/* Status */}

      <div className="px-8 pb-6">

        <span
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold ${statusColor}`}
        >

          <FaCheckCircle />

          {status}

        </span>

      </div>

      {/* Notes */}

      <div className="bg-pink-50 border-t p-8">

        <h3 className="text-xl font-bold text-pink-600 mb-4">

          Appointment Notes

        </h3>

        <p className="text-gray-700 leading-7">

          {notes}

        </p>

      </div>

    </div>

  );

}