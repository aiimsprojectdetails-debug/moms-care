"use client";

import {
  FaExclamationTriangle,
  FaHeartbeat,
} from "react-icons/fa";

export default function HighRiskPatients({

  patients = [],

}) {

  const highRiskPatients = patients.filter(
    (patient) =>
      patient.riskLevel === "High"
  );

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-red-600">

          High Risk Patients

        </h2>

        <FaExclamationTriangle
          className="text-red-600"
          size={28}
        />

      </div>

      {/* Empty State */}

      {highRiskPatients.length === 0 ? (

        <div className="text-center py-10 text-gray-500">

          No high risk patients.

        </div>

      ) : (

        <div className="space-y-4 max-h-[450px] overflow-y-auto">

          {highRiskPatients.map((patient) => (

            <div
              key={patient._id}
              className="
                border
                rounded-xl
                p-4
                hover:bg-red-50
                transition
              "
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-lg font-semibold">

                    {patient.fullName}

                  </h3>

                  <p className="text-gray-500">

                    Pregnancy Week:{" "}
                    {patient.pregnancyWeek ?? "N/A"}

                  </p>

                </div>

                <div className="text-right">

                  <div className="flex items-center gap-2 justify-end">

                    <FaHeartbeat className="text-red-500" />

                    <span className="font-semibold text-red-600">

                      High Risk

                    </span>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}