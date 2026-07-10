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
  "#3b82f6",
  "#22c55e",
  "#ef4444",
];

export default function AppointmentStatusChart({
  appointments = [],
}) {

const upcoming = appointments.filter(
  (appointment) => appointment.status === "Upcoming"
).length;

const completed = appointments.filter(
  (appointment) => appointment.status === "Completed"
).length;

const cancelled = appointments.filter(
  (appointment) => appointment.status === "Cancelled"
).length;

const missed = appointments.filter(
  (appointment) => appointment.status === "Missed"
).length;

const data = [
  {
    name: "Upcoming",
    value: upcoming,
  },
  {
    name: "Completed",
    value: completed,
  },
  {
    name: "Cancelled",
    value: cancelled,
  },
  {
    name: "Missed",
    value: missed,
  },
];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        Appointment Status
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