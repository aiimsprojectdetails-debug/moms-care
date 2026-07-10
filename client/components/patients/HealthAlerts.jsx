"use client";

export default function HealthAlerts({
  patient,
  latestAnc,
  nextAppointment,
  activeMedicines,
  latestDelivery,
}) {
  const alerts = [];

  /* ===========================
        Risk Level
  =========================== */

  if (patient?.riskLevel === "High") {
    alerts.push({
      color: "red",
      title: "High Risk Pregnancy",
      message: "Patient requires close monitoring.",
    });
  }

  /* ===========================
        Hemoglobin
  =========================== */

  if (
    latestAnc &&
    latestAnc.hemoglobin &&
    latestAnc.hemoglobin < 11
  ) {
    alerts.push({
      color: "yellow",
      title: "Low Hemoglobin",
      message: `Current Hb: ${latestAnc.hemoglobin} g/dL`,
    });
  }

  /* ===========================
        Blood Pressure
  =========================== */

  if (
    latestAnc &&
    latestAnc.bloodPressure
  ) {
    alerts.push({
      color: "blue",
      title: "Blood Pressure",
      message: latestAnc.bloodPressure,
    });
  }

  /* ===========================
        Medicines
  =========================== */

  if (activeMedicines.length > 0) {
    alerts.push({
      color: "green",
      title: "Active Medicines",
      message: `${activeMedicines.length} medicine(s) currently active.`,
    });
  }

  /* ===========================
        Appointment
  =========================== */

  if (nextAppointment) {
    alerts.push({
      color: "purple",
      title: "Upcoming Appointment",
      message: new Date(
        nextAppointment.appointmentDate
      ).toLocaleDateString(),
    });
  }

  /* ===========================
        Delivery
  =========================== */

  if (latestDelivery) {
    alerts.push({
      color: "orange",
      title: "Delivery Completed",
      message: `${latestDelivery.deliveryType} Delivery`,
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">

      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        Health Alerts
      </h2>

      {alerts.length === 0 ? (

        <div className="text-green-600 font-semibold">
          ✅ No Health Alerts
        </div>

      ) : (

        <div className="space-y-4">

          {alerts.map((alert, index) => (

            <div
              key={index}
              className={`border-l-4 rounded-lg p-4
              ${
                alert.color === "red"
                  ? "border-red-500 bg-red-50"
                  : alert.color === "yellow"
                  ? "border-yellow-500 bg-yellow-50"
                  : alert.color === "green"
                  ? "border-green-500 bg-green-50"
                  : alert.color === "blue"
                  ? "border-blue-500 bg-blue-50"
                  : alert.color === "purple"
                  ? "border-purple-500 bg-purple-50"
                  : "border-orange-500 bg-orange-50"
              }`}
            >

              <h3 className="font-bold">
                {alert.title}
              </h3>

              <p className="text-gray-700 mt-1">
                {alert.message}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}