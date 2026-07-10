"use client";

export default function PatientStatistics({
  patients = [],
}) {
  const totalPatients = patients.length;

  const highRisk = patients.filter(
    (patient) => patient.riskLevel === "High"
  ).length;

  const mediumRisk = patients.filter(
    (patient) => patient.riskLevel === "Medium"
  ).length;

  const lowRisk = patients.filter(
    (patient) => patient.riskLevel === "Low"
  ).length;

  const cards = [
    {
      title: "Total Patients",
      value: totalPatients,
      color: "bg-pink-500",
      icon: "👩",
    },
    {
      title: "High Risk",
      value: highRisk,
      color: "bg-red-500",
      icon: "🔴",
    },
    {
      title: "Medium Risk",
      value: mediumRisk,
      color: "bg-yellow-500",
      icon: "🟡",
    },
    {
      title: "Low Risk",
      value: lowRisk,
      color: "bg-green-500",
      icon: "🟢",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>

            </div>

            <div
              className={`${card.color} w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white`}
            >
              {card.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}