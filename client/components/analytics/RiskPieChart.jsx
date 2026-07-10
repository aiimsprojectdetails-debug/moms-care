"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#ef4444",
  "#f59e0b",
  "#22c55e",
];

export default function RiskPieChart({
  patients = [],
}) {

  const highRisk = patients.filter(
    (patient) => patient.riskLevel === "High"
  ).length;

  const mediumRisk = patients.filter(
    (patient) => patient.riskLevel === "Medium"
  ).length;

  const lowRisk = patients.filter(
    (patient) => patient.riskLevel === "Low"
  ).length;

  const data = [
    {
      name: "High Risk",
      value: highRisk,
    },
    {
      name: "Medium Risk",
      value: mediumRisk,
    },
    {
      name: "Low Risk",
      value: lowRisk,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        Patient Risk Distribution
      </h2>

      <div className="w-full h-96">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}