"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function DashboardChart() {

  // Monthly Patients

  const lineData = {
    labels: [
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
    ],

    datasets: [
      {
        label: "Patients",

        data: [
          25,
          40,
          45,
          60,
          75,
          82,
          95,
          110,
          120,
          135,
          145,
          160,
        ],

        borderColor: "#ec4899",

        backgroundColor: "rgba(236,72,153,0.2)",

        fill: true,

        tension: 0.4,
      },
    ],
  };

  // Weekly Visits

  const barData = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],

    datasets: [
      {
        label: "Visits",

        data: [
          8,
          10,
          7,
          12,
          15,
          11,
          9,
        ],

        backgroundColor: [
          "#EC4899",
          "#F472B6",
          "#FB7185",
          "#DB2777",
          "#F9A8D4",
          "#FDA4AF",
          "#EC4899",
        ],

        borderRadius: 10,
      },
    ],
  };

  // Pregnancy Stage

  const pieData = {
    labels: [
      "1st Trimester",
      "2nd Trimester",
      "3rd Trimester",
    ],

    datasets: [
      {
        data: [
          40,
          35,
          25,
        ],

        backgroundColor: [
          "#EC4899",
          "#F472B6",
          "#FB7185",
        ],

        borderWidth: 2,
      },
    ],
  };

  return (

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

      {/* Line Chart */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-pink-600 mb-6">

          Monthly Patient Growth

        </h2>

        <Line
          data={lineData}
        />

      </div>

      {/* Pie Chart */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-pink-600 mb-6">

          Pregnancy Distribution

        </h2>

        <Pie
          data={pieData}
        />

      </div>

      {/* Bar Chart */}

      <div className="bg-white rounded-3xl shadow-lg p-6 xl:col-span-2">

        <h2 className="text-2xl font-bold text-pink-600 mb-6">

          Weekly Hospital Visits

        </h2>

        <Bar
          data={barData}
        />

      </div>

    </div>

  );

}