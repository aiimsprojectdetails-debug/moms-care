"use client";

import {
  FaBaby,
  FaHeartbeat,
  FaCalendarAlt,
  FaWeight,
  FaExclamationTriangle,
  FaUserMd,
} from "react-icons/fa";

export default function PregnancySummary({
  trimester = "2nd Trimester",
  pregnancyWeek = 24,
  expectedDelivery = "15 Dec 2026",
  motherWeight = "62 kg",
  babyWeight = "650 g",
  bloodPressure = "120/80 mmHg",
  hemoglobin = "12.5 g/dL",
  bloodSugar = "95 mg/dL",
  riskLevel = "Low",
  doctor = "Dr. Amit Khuntia",
  remarks = "Mother and baby are healthy. Continue regular check-ups and prescribed supplements.",
}) {

  const riskColor =
    riskLevel === "High"
      ? "bg-red-100 text-red-700"
      : riskLevel === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-pink-500 to-pink-700 p-8 text-white">

        <h2 className="text-3xl font-bold">

          Pregnancy Summary

        </h2>

        <p className="text-pink-100 mt-2">

          Current pregnancy overview

        </p>

      </div>

      {/* Information */}

      <div className="p-8 grid md:grid-cols-2 gap-8">

        <div className="space-y-5">

          <div className="flex items-center gap-3">

            <FaBaby className="text-pink-600 text-xl" />

            <span className="font-semibold">

              Trimester :

            </span>

            <span>{trimester}</span>

          </div>

          <div className="flex items-center gap-3">

            <FaCalendarAlt className="text-pink-600 text-xl" />

            <span className="font-semibold">

              Pregnancy Week :

            </span>

            <span>{pregnancyWeek} Weeks</span>

          </div>

          <div className="flex items-center gap-3">

            <FaCalendarAlt className="text-pink-600 text-xl" />

            <span className="font-semibold">

              Expected Delivery :

            </span>

            <span>{expectedDelivery}</span>

          </div>

          <div className="flex items-center gap-3">

            <FaWeight className="text-pink-600 text-xl" />

            <span className="font-semibold">

              Mother's Weight :

            </span>

            <span>{motherWeight}</span>

          </div>

          <div className="flex items-center gap-3">

            <FaBaby className="text-pink-600 text-xl" />

            <span className="font-semibold">

              Baby Weight :

            </span>

            <span>{babyWeight}</span>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-5">

          <div className="flex items-center gap-3">

            <FaHeartbeat className="text-red-500 text-xl" />

            <span className="font-semibold">

              Blood Pressure :

            </span>

            <span>{bloodPressure}</span>

          </div>

          <div className="flex items-center gap-3">

            <FaHeartbeat className="text-red-500 text-xl" />

            <span className="font-semibold">

              Hemoglobin :

            </span>

            <span>{hemoglobin}</span>

          </div>

          <div className="flex items-center gap-3">

            <FaHeartbeat className="text-red-500 text-xl" />

            <span className="font-semibold">

              Blood Sugar :

            </span>

            <span>{bloodSugar}</span>

          </div>

          <div className="flex items-center gap-3">

            <FaExclamationTriangle className="text-yellow-500 text-xl" />

            <span className="font-semibold">

              Risk Level :

            </span>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${riskColor}`}
            >
              {riskLevel}
            </span>

          </div>

          <div className="flex items-center gap-3">

            <FaUserMd className="text-pink-600 text-xl" />

            <span className="font-semibold">

              Doctor :

            </span>

            <span>{doctor}</span>

          </div>

        </div>

      </div>

      {/* Doctor Remarks */}

      <div className="border-t bg-pink-50 p-8">

        <h3 className="text-xl font-bold text-pink-600 mb-4">

          Doctor's Remarks

        </h3>

        <p className="text-gray-700 leading-7">

          {remarks}

        </p>

      </div>

    </div>
  );
}