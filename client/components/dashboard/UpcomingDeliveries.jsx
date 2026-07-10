"use client";

import {
  FaBaby,
  FaHospital,
  FaCalendarAlt,
} from "react-icons/fa";

export default function UpcomingDeliveries({

  deliveries = [],

}) {

  const upcomingDeliveries = deliveries
    .sort(
      (a, b) =>
        new Date(a.deliveryDate) -
        new Date(b.deliveryDate)
    )
    .slice(0, 5);

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-pink-600">

          Upcoming Deliveries

        </h2>

        <FaBaby
          className="text-pink-600"
          size={28}
        />

      </div>

      {upcomingDeliveries.length === 0 ? (

        <div className="text-center py-10 text-gray-500">

          No upcoming deliveries.

        </div>

      ) : (

        <div className="space-y-4">

          {upcomingDeliveries.map((delivery) => (

            <div
              key={delivery._id}
              className="
                border
                rounded-xl
                p-4
                hover:bg-pink-50
                transition
              "
            >

              <h3 className="font-semibold text-lg">

                {delivery.patient?.fullName ||
                  "Unknown Patient"}

              </h3>

              <div className="mt-2 space-y-1">

                <p className="flex items-center gap-2 text-gray-600">

                  <FaCalendarAlt />

                  {new Date(
                    delivery.deliveryDate
                  ).toLocaleDateString()}

                </p>

                <p className="flex items-center gap-2 text-gray-600">

                  <FaHospital />

                  {delivery.hospitalName ||
                    "Hospital Not Specified"}

                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}