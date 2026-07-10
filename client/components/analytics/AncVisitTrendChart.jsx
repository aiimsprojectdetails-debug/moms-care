"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AncVisitTrendChart({
  ancVisits = [],
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
    visits: ancVisits.filter((visit) => {
      if (!visit.createdAt) return false;

      return (
        new Date(visit.createdAt).getMonth() === index
      );
    }).length,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        ANC Visit Trend
      </h2>

      <div className="w-full h-96">

        <ResponsiveContainer>

          <LineChart data={monthlyData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="visits"
              stroke="#ec4899"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}