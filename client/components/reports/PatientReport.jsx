"use client";

import ReportHeader from "./ReportHeader";
import ReportSection from "./ReportSection";
import ReportFooter from "./ReportFooter";

export default function PatientReport({

  patient,

  ancVisits = [],

  appointments = [],

  medicines = [],

  deliveries = [],

}) {

  if (!patient) return null;

  return (

    <div
      id="patient-report"
      className="
        bg-white
        p-10
        rounded-2xl
        shadow-lg
        max-w-5xl
        mx-auto
      "
    >

      <ReportHeader />

      {/* ===========================
          Patient Information
      =========================== */}

      <ReportSection title="Patient Information">

        <div className="grid grid-cols-2 gap-6">

          <p><strong>Name:</strong> {patient.fullName}</p>

          <p><strong>Age:</strong> {patient.age}</p>

          <p><strong>Gender:</strong> {patient.gender}</p>

          <p><strong>Mobile:</strong> {patient.mobile}</p>

          <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>

          <p><strong>Risk Level:</strong> {patient.riskLevel}</p>

        </div>

      </ReportSection>

      {/* ===========================
          Pregnancy Information
      =========================== */}

      <ReportSection title="Pregnancy Information">

        <div className="grid grid-cols-2 gap-6">

          <p>
            <strong>Pregnancy Week:</strong>{" "}
            {patient.pregnancyWeek}
          </p>

          <p>
            <strong>Trimester:</strong>{" "}
            {patient.trimester}
          </p>

          <p>
            <strong>Expected Delivery:</strong>{" "}
            {patient.expectedDeliveryDate
              ? new Date(
                  patient.expectedDeliveryDate
                ).toLocaleDateString()
              : "N/A"}
          </p>

          <p>
            <strong>Doctor:</strong>{" "}
            {patient.doctorName || "N/A"}
          </p>

        </div>

      </ReportSection>

      {/* ===========================
          Summary
      =========================== */}

      <ReportSection title="Medical Summary">

        <div className="grid grid-cols-2 gap-6">

          <p>
            <strong>ANC Visits:</strong>{" "}
            {ancVisits.length}
          </p>

          <p>
            <strong>Appointments:</strong>{" "}
            {appointments.length}
          </p>

          <p>
            <strong>Medicines:</strong>{" "}
            {medicines.length}
          </p>

          <p>
            <strong>Deliveries:</strong>{" "}
            {deliveries.length}
          </p>

        </div>

      </ReportSection>

      {/* ===========================
          Doctor Remarks
      =========================== */}

      <ReportSection title="Doctor Remarks">

        <p>

          {patient.doctorRemarks ||

            "No remarks available."}

        </p>

      </ReportSection>

      <ReportFooter />

    </div>

  );

}