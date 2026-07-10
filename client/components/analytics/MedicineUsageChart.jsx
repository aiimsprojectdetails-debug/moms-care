"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MedicineUsageChart({
  medicines = [],
}) {

  const medicineCount = {};

  medicines.forEach((medicine) => {

    const name = medicine.medicineName || "Unknown";

    medicineCount[name] =
      (medicineCount[name] || 0) + 1;

  });

  const data = Object.keys(medicineCount).map(
    (name) => ({
      medicine: name,
      count: medicineCount[name],
    })
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        Medicine Usage
      </h2>

      <div className="w-full h-96">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="medicine" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#ec4899"
              radius={[8,8,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}