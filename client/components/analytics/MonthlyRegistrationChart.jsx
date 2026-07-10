"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyRegistrationChart({
  patients = [],
}) {

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyData = months.map((month, index) => ({
    month,
    patients: patients.filter((patient) => {
      if (!patient.createdAt) return false;

      return (
        new Date(patient.createdAt).getMonth() === index
      );
    }).length,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        Monthly Patient Registration
      </h2>

      <div className="w-full h-96">

        <ResponsiveContainer>

          <BarChart data={monthlyData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="patients"
              fill="#ec4899"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}