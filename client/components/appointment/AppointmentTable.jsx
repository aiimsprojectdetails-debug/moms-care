"use client";

import { FaEdit, FaTrash } from "react-icons/fa";

export default function AppointmentTable({
  appointments,
  onDelete,
  onEdit,
}) {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-600">
          No Appointments Found
        </h2>

        <p className="text-gray-500 mt-2">
          Add the first appointment for this patient.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full">

        <thead className="bg-pink-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Date</th>

            <th className="px-4 py-3 text-left">Time</th>

            <th className="px-4 py-3 text-left">Doctor</th>

            <th className="px-4 py-3 text-left">Hospital</th>

            <th className="px-4 py-3 text-left">Purpose</th>

            <th className="px-4 py-3 text-left">Status</th>

            <th className="px-4 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          {appointments.map((appointment) => (

            <tr
              key={appointment._id}
              className="border-b hover:bg-pink-50"
            >

              <td className="px-4 py-3">
                {new Date(
                  appointment.appointmentDate
                ).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                {appointment.appointmentTime}
              </td>

              <td className="px-4 py-3">
                {appointment.doctorName}
              </td>

              <td className="px-4 py-3">
                {appointment.hospitalName}
              </td>

              <td className="px-4 py-3">
                {appointment.purpose}
              </td>

              <td className="px-4 py-3">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    appointment.status === "Upcoming"
                      ? "bg-blue-100 text-blue-700"
                      : appointment.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : appointment.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {appointment.status}
                </span>

              </td>

              <td className="px-4 py-3">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(appointment)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(appointment._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                  >
                    <FaTrash />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}