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
  "#22c55e", // Normal
  "#3b82f6", // C-Section
  "#f59e0b", // Assisted
];

export default function DeliveryStatisticsChart({
  deliveries = [],
}) {

  const normal = deliveries.filter(
    (delivery) => delivery.deliveryType === "Normal"
  ).length;

  const cSection = deliveries.filter(
    (delivery) => delivery.deliveryType === "C-Section"
  ).length;

  const assisted = deliveries.filter(
    (delivery) => delivery.deliveryType === "Assisted"
  ).length;

  const data = [
    {
      name: "Normal",
      value: normal,
    },
    {
      name: "C-Section",
      value: cSection,
    },
    {
      name: "Assisted",
      value: assisted,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        Delivery Statistics
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
                  fill={COLORS[index]}
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