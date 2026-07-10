"use client";

import { FaEdit, FaTrash } from "react-icons/fa";

export default function DeliveryTable({
  deliveries,
  onDelete,
  onEdit,
}) {
  if (!deliveries || deliveries.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-600">
          No Delivery Records Found
        </h2>

        <p className="text-gray-500 mt-2">
          Add the patient's delivery information.
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
              Delivery Date
            </th>

            <th className="px-4 py-3 text-left">
              Type
            </th>

            <th className="px-4 py-3 text-left">
              Hospital
            </th>

            <th className="px-4 py-3 text-left">
              Doctor
            </th>

            <th className="px-4 py-3 text-left">
              Baby
            </th>

            <th className="px-4 py-3 text-left">
              Weight
            </th>

            <th className="px-4 py-3 text-left">
              Mother
            </th>

            <th className="px-4 py-3 text-center">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>

          {deliveries.map((delivery) => (

            <tr
              key={delivery._id}
              className="border-b hover:bg-pink-50"
            >

              <td className="px-4 py-3">
                {new Date(
                  delivery.deliveryDate
                ).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                {delivery.deliveryType}
              </td>

              <td className="px-4 py-3">
                {delivery.hospitalName}
              </td>

              <td className="px-4 py-3">
                {delivery.doctorName}
              </td>

              <td className="px-4 py-3">
                {delivery.babyGender}
              </td>

              <td className="px-4 py-3">
                {delivery.babyWeight} kg
              </td>

              <td className="px-4 py-3">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    delivery.motherCondition === "Stable"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {delivery.motherCondition}
                </span>

              </td>

              <td className="px-4 py-3">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(delivery)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDelete(delivery._id)}
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