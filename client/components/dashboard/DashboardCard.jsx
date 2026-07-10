"use client";

import { motion } from "framer-motion";

export default function DashboardCard({
  title,
  value,
  icon,
  color = "from-pink-500 to-pink-600",
  change = "",
  description = "",
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      transition={{
        duration: 0.3,
      }}
      className={`bg-gradient-to-r ${color} rounded-3xl shadow-xl p-6 text-white relative overflow-hidden`}
    >
      {/* Decorative Background */}

      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"></div>

      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10"></div>

      {/* Main Content */}

      <div className="relative z-10 flex justify-between items-start">

        {/* Left */}

        <div>

          <p className="text-white/80 text-sm uppercase tracking-wide">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>

          {description && (
            <p className="text-sm mt-3 text-pink-100">
              {description}
            </p>
          )}

          {change && (
            <span className="inline-block mt-4 bg-white/20 px-4 py-1 rounded-full text-sm font-medium">
              {change}
            </span>
          )}

        </div>

        {/* Right */}

        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl shadow-lg">
          {icon}
        </div>

      </div>
    </motion.div>
  );
}