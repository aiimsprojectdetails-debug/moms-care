"use client";

import ReportHeader from "./ReportHeader";
import ReportSection from "./ReportSection";
import ReportFooter from "./ReportFooter";

export default function AnalyticsReport({

  patients = [],

  appointments = [],

  ancVisits = [],

  deliveries = [],

  medicines = [],

}) {

  /* ===========================
     Patient Statistics
  =========================== */

  const totalPatients = patients.length;

  const highRisk = patients.filter(
    (p) => p.riskLevel === "High"
  ).length;

  const mediumRisk = patients.filter(
    (p) => p.riskLevel === "Medium"
  ).length;

  const lowRisk = patients.filter(
    (p) => p.riskLevel === "Low"
  ).length;

  /* ===========================
     Appointment Statistics
  =========================== */

  const upcomingAppointments =
    appointments.filter(
      (a) => a.status === "Upcoming"
    ).length;

  const completedAppointments =
    appointments.filter(
      (a) => a.status === "Completed"
    ).length;

  const cancelledAppointments =
    appointments.filter(
      (a) => a.status === "Cancelled"
    ).length;

  const missedAppointments =
    appointments.filter(
      (a) => a.status === "Missed"
    ).length;

  /* ===========================
     Delivery Statistics
  =========================== */

  const normalDeliveries =
    deliveries.filter(
      (d) => d.deliveryType === "Normal"
    ).length;

  const cSectionDeliveries =
    deliveries.filter(
      (d) => d.deliveryType === "C-Section"
    ).length;

  const assistedDeliveries =
    deliveries.filter(
      (d) => d.deliveryType === "Assisted"
    ).length;

  /* ===========================
     Medicine Statistics
  =========================== */

  const medicineMap = {};

  medicines.forEach((medicine) => {

    medicineMap[medicine.medicineName] =
      (medicineMap[medicine.medicineName] || 0) + 1;

  });

  const topMedicines =
    Object.entries(medicineMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

  return (

    <div
      id="analytics-report"
      className="
        bg-white
        p-10
        rounded-2xl
        shadow-lg
        max-w-6xl
        mx-auto
      "
    >

      <ReportHeader />

      {/* ===========================
          Patient Statistics
      =========================== */}

      <ReportSection title="Patient Statistics">

        <div className="grid grid-cols-2 gap-6">

          <p>
            <strong>Total Patients:</strong>{" "}
            {totalPatients}
          </p>

          <p>
            <strong>High Risk:</strong>{" "}
            {highRisk}
          </p>

          <p>
            <strong>Medium Risk:</strong>{" "}
            {mediumRisk}
          </p>

          <p>
            <strong>Low Risk:</strong>{" "}
            {lowRisk}
          </p>

        </div>

      </ReportSection>

      {/* ===========================
          Appointment Statistics
      =========================== */}

      <ReportSection title="Appointment Statistics">

        <div className="grid grid-cols-2 gap-6">

          <p>
            <strong>Upcoming:</strong>{" "}
            {upcomingAppointments}
          </p>

          <p>
            <strong>Completed:</strong>{" "}
            {completedAppointments}
          </p>

          <p>
            <strong>Cancelled:</strong>{" "}
            {cancelledAppointments}
          </p>

          <p>
            <strong>Missed:</strong>{" "}
            {missedAppointments}
          </p>

        </div>

      </ReportSection>

      {/* ===========================
          ANC Statistics
      =========================== */}

      <ReportSection title="ANC Statistics">

        <div className="grid grid-cols-2 gap-6">

          <p>
            <strong>Total ANC Visits:</strong>{" "}
            {ancVisits.length}
          </p>

          <p>
            <strong>Average Visits / Patient:</strong>{" "}
            {
              totalPatients
                ? (
                    ancVisits.length /
                    totalPatients
                  ).toFixed(1)
                : 0
            }
          </p>

        </div>

      </ReportSection>

      {/* ===========================
          Delivery Statistics
      =========================== */}

      <ReportSection title="Delivery Statistics">

        <div className="grid grid-cols-2 gap-6">

          <p>
            <strong>Normal:</strong>{" "}
            {normalDeliveries}
          </p>

          <p>
            <strong>C-Section:</strong>{" "}
            {cSectionDeliveries}
          </p>

          <p>
            <strong>Assisted:</strong>{" "}
            {assistedDeliveries}
          </p>

          <p>
            <strong>Total Deliveries:</strong>{" "}
            {deliveries.length}
          </p>

        </div>

      </ReportSection>

      {/* ===========================
          Medicine Statistics
      =========================== */}

      <ReportSection title="Top Medicines">

        <div className="space-y-3">

          {topMedicines.length === 0 ? (

            <p>No medicine records available.</p>

          ) : (

            topMedicines.map(
              ([name, count]) => (

                <div
                  key={name}
                  className="
                    flex
                    justify-between
                    border-b
                    pb-2
                  "
                >

                  <span>{name}</span>

                  <span>{count}</span>

                </div>

              )
            )

          )}

        </div>

      </ReportSection>

      <ReportFooter />

    </div>

  );

}