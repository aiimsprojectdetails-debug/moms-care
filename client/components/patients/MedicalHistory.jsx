"use client";

import {
  FaNotesMedical,
  FaHeartbeat,
  FaAllergies,
  FaCapsules,
  FaSyringe,
  FaUserMd,
  FaBaby,
  FaProcedures,
} from "react-icons/fa";

export default function MedicalHistory({
  previousPregnancies = 1,
  previousDeliveries = 1,
  miscarriage = 0,
  diabetes = "No",
  hypertension = "No",
  thyroid = "No",
  anemia = "No",
  allergies = "None",
  surgeries = "None",
  medications = "Iron, Calcium, Folic Acid",
  vaccinations = "TT Dose 1 & Dose 2 Completed",
  familyHistory = "No hereditary diseases",
  doctorNotes = "Patient is healthy and should continue routine ANC check-ups.",
}) {
  const yesNoBadge = (value) => {
    return value === "Yes"
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-pink-500 to-pink-700 p-8 text-white">

        <h2 className="text-3xl font-bold flex items-center gap-3">
          <FaNotesMedical />
          Medical History
        </h2>

        <p className="text-pink-100 mt-2">
          Previous pregnancy and medical records
        </p>

      </div>

      {/* Body */}

      <div className="p-8 grid md:grid-cols-2 gap-8">

        {/* Left */}

        <div className="space-y-5">

          <div className="flex items-center gap-3">
            <FaBaby className="text-pink-600" />
            <span className="font-semibold">Previous Pregnancies :</span>
            <span>{previousPregnancies}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaBaby className="text-pink-600" />
            <span className="font-semibold">Previous Deliveries :</span>
            <span>{previousDeliveries}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaProcedures className="text-pink-600" />
            <span className="font-semibold">Miscarriages :</span>
            <span>{miscarriage}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaHeartbeat className="text-red-500" />
            <span className="font-semibold">Diabetes :</span>

            <span className={`px-3 py-1 rounded-full ${yesNoBadge(diabetes)}`}>
              {diabetes}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaHeartbeat className="text-red-500" />
            <span className="font-semibold">Hypertension :</span>

            <span className={`px-3 py-1 rounded-full ${yesNoBadge(hypertension)}`}>
              {hypertension}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaHeartbeat className="text-red-500" />
            <span className="font-semibold">Thyroid :</span>

            <span className={`px-3 py-1 rounded-full ${yesNoBadge(thyroid)}`}>
              {thyroid}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaHeartbeat className="text-red-500" />
            <span className="font-semibold">Anemia :</span>

            <span className={`px-3 py-1 rounded-full ${yesNoBadge(anemia)}`}>
              {anemia}
            </span>
          </div>

        </div>

        {/* Right */}

        <div className="space-y-5">

          <div className="flex items-start gap-3">
            <FaAllergies className="text-pink-600 mt-1" />

            <div>
              <span className="font-semibold">Allergies</span>

              <p className="text-gray-600 mt-1">
                {allergies}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaProcedures className="text-pink-600 mt-1" />

            <div>
              <span className="font-semibold">Previous Surgeries</span>

              <p className="text-gray-600 mt-1">
                {surgeries}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaCapsules className="text-pink-600 mt-1" />

            <div>
              <span className="font-semibold">Current Medications</span>

              <p className="text-gray-600 mt-1">
                {medications}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaSyringe className="text-pink-600 mt-1" />

            <div>
              <span className="font-semibold">Vaccinations</span>

              <p className="text-gray-600 mt-1">
                {vaccinations}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaUserMd className="text-pink-600 mt-1" />

            <div>
              <span className="font-semibold">Family Medical History</span>

              <p className="text-gray-600 mt-1">
                {familyHistory}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Doctor Notes */}

      <div className="border-t bg-pink-50 p-8">

        <h3 className="text-xl font-bold text-pink-600 mb-3">
          Doctor's Notes
        </h3>

        <p className="text-gray-700 leading-7">
          {doctorNotes}
        </p>

      </div>

    </div>
  );
}