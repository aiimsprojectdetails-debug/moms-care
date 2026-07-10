"use client";

import { FaEdit, FaTrash } from "react-icons/fa";

export default function AncVisitTable({
  visits,
  onDelete,
  onEdit,
}) {
  if (!visits || visits.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-600">
          No ANC Visits Found
        </h2>

        <p className="text-gray-500 mt-2">
          Add the first ANC visit for this patient.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-pink-600 text-white">

          <tr>

            <th className="px-4 py-3 text-left">
              Visit Date
            </th>

            <th className="px-4 py-3 text-left">
              Week
            </th>

            <th className="px-4 py-3 text-left">
              Trimester
            </th>

            <th className="px-4 py-3 text-left">
              Weight
            </th>

            <th className="px-4 py-3 text-left">
              BP
            </th>

            <th className="px-4 py-3 text-left">
              Hb
            </th>

            <th className="px-4 py-3 text-left">
              Sugar
            </th>

            <th className="px-4 py-3 text-left">
              Remarks
            </th>

            <th className="px-4 py-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {visits.map((visit) => (

            <tr
              key={visit._id}
              className="border-b hover:bg-pink-50"
            >

              <td className="px-4 py-3">

                {new Date(
                  visit.visitDate
                ).toLocaleDateString()}

              </td>

              <td className="px-4 py-3">

                {visit.pregnancyWeek}

              </td>

              <td className="px-4 py-3">

                {visit.trimester}

              </td>

              <td className="px-4 py-3">

                {visit.weight} kg

              </td>

              <td className="px-4 py-3">

                {visit.bloodPressure}

              </td>

              <td className="px-4 py-3">

                {visit.hemoglobin}

              </td>

              <td className="px-4 py-3">

                {visit.bloodSugar}

              </td>

              <td className="px-4 py-3">

                {visit.doctorRemarks}

              </td>

              <td className="px-4 py-3">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(visit)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(visit._id)
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