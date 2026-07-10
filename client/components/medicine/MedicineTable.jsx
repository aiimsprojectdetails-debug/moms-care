"use client";

import { FaEdit, FaTrash } from "react-icons/fa";

export default function MedicineTable({
  medicines,
  onDelete,
  onEdit,
}) {
  if (!medicines || medicines.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-600">
          No Medicines Found
        </h2>

        <p className="text-gray-500 mt-2">
          Add the first medicine for this patient.
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
              Medicine
            </th>

            <th className="px-4 py-3 text-left">
              Type
            </th>

            <th className="px-4 py-3 text-left">
              Dosage
            </th>

            <th className="px-4 py-3 text-left">
              Frequency
            </th>

            <th className="px-4 py-3 text-left">
              Start Date
            </th>

            <th className="px-4 py-3 text-left">
              End Date
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>

            <th className="px-4 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          {medicines.map((medicine) => (

            <tr
              key={medicine._id}
              className="border-b hover:bg-pink-50"
            >

              <td className="px-4 py-3 font-semibold">
                {medicine.medicineName}
              </td>

              <td className="px-4 py-3">
                {medicine.medicineType}
              </td>

              <td className="px-4 py-3">
                {medicine.dosage}
              </td>

              <td className="px-4 py-3">
                {medicine.frequency}
              </td>

              <td className="px-4 py-3">
                {new Date(
                  medicine.startDate
                ).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                {new Date(
                  medicine.endDate
                ).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    medicine.status === "Ongoing"
                      ? "bg-blue-100 text-blue-700"
                      : medicine.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {medicine.status}
                </span>

              </td>

              <td className="px-4 py-3">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(medicine)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(medicine._id)
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