"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  FaUserPlus,
  FaFolderPlus,
  FaFileMedical,
  FaCalendarPlus,
} from "react-icons/fa";

const actions = [
  {
    title: "Add Patient",
    description: "Register a new mother",
    icon: <FaUserPlus size={35} />,
    color: "from-pink-500 to-pink-700",
    link: "/add-patient",
  },
  {
    title: "Create Project",
    description: "Create Hospital Project",
    icon: <FaFolderPlus size={35} />,
    color: "from-purple-500 to-purple-700",
    link: "/create-project",
  },
  // {
  //   title: "Generate Report",
  //   description: "Download Patient Report",
  //   icon: <FaFileMedical size={35} />,
  //   color: "from-blue-500 to-blue-700",
  //   link: "/reports",
  // },
  // {
  //   title: "Schedule Visit",
  //   description: "Create New Appointment",
  //   icon: <FaCalendarPlus size={35} />,
  //   color: "from-green-500 to-green-700",
  //   link: "/appointments",
  // },
];

export default function QuickActions() {
  return (
    <div className="mt-8">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold text-pink-600">
            Quick Actions
          </h2>

          <p className="text-gray-500">
            Frequently used options
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols- gap-6">

        {actions.map((action, index) => (

          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              y: -8,
            }}
            transition={{
              duration: 0.3,
            }}
          >

            <Link href={action.link}>

              <div
                className={`bg-gradient-to-r ${action.color}
                rounded-3xl p-6 text-white shadow-xl cursor-pointer
                h-full`}
              >

                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-5">

                  {action.icon}

                </div>

                <h3 className="text-2xl font-bold">

                  {action.title}

                </h3>

                <p className="mt-3 text-white/90">

                  {action.description}

                </p>

                <button
                  className="mt-6 bg-white text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
                >
                  Open →
                </button>

              </div>

            </Link>

          </motion.div>

        ))}

      </div>

    </div>
  );
}