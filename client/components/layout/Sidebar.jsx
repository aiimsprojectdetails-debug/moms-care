"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import {
  FaHome,
  FaProjectDiagram,
  FaUserInjured,
  FaFileMedical,
  FaCog,
  FaSignOutAlt,
  FaHeartbeat,
  FaTimes,
  FaChartPie,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FaHome size={20} />,
    path: "/dashboard",
  },
  {
    title: "Projects",
    icon: <FaProjectDiagram size={20} />,
    path: "/projects",
  },
  {
    title: "Patients",
    icon: <FaUserInjured size={20} />,
    path: "/patients",
  },
  {
  title: "Analytics",
  icon: <FaChartPie size={20} />,
  path: "/analytics",
},
  
];

export default function Sidebar({

  sidebarOpen,

  setSidebarOpen,

}) {

  const pathname = usePathname();

  const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

  return (
    <>

      {/* ===========================
            Mobile Overlay
      =========================== */}

      {sidebarOpen && (

        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />

      )}

      {/* ===========================
            Sidebar
      =========================== */}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-gradient-to-b
          from-pink-600
          via-pink-500
          to-pink-700
          text-white
          shadow-2xl

          transform
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
          lg:static
          lg:flex
          flex-col
        `}
      >

        {/* ===========================
              Mobile Close Button
        =========================== */}

        <div className="flex justify-end lg:hidden p-5">

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white text-2xl"
          >

            <FaTimes />

          </button>

        </div>

        {/* ===========================
              Logo
        =========================== */}

        <div className="px-8 pb-8 border-b border-pink-400">

          <div className="flex items-center gap-3">

            <div className="bg-white p-3 rounded-full">

              <FaHeartbeat
                className="text-pink-600"
                size={28}
              />

            </div>

            <div>

              <h1 className="text-2xl font-bold">

                Mom's Care

              </h1>

              <p className="text-pink-100 text-sm">

                Maternal Health System

              </p>

            </div>

          </div>

        </div>

        {/* ===========================
              Menu
        =========================== */}

        <div className="flex-1 px-5 py-8">

          <p className="uppercase text-pink-200 text-xs tracking-widest mb-4">

            Main Menu

          </p>

          <nav className="space-y-3">

            {menuItems.map((item) => (

              <Link
                key={item.title}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-xl
                  font-medium
                  transition-all
                  duration-300

                  ${
                    pathname === item.path
                      ? "bg-white text-pink-600 shadow-lg"
                      : "hover:bg-pink-400"
                  }
                `}
              >

                {item.icon}

                <span>

                  {item.title}

                </span>

              </Link>

            ))}

                      </nav>

        </div>

        {/* ===========================
              Doctor Profile
        =========================== */}

       <div className="px-5">

  <div className="bg-pink-400 rounded-2xl p-4 flex items-center gap-4">

    

    <div>

      <h3 className="font-semibold">
        {user?.fullName || "Doctor"}
      </h3>

      <p className="text-sm text-pink-100">
        {user?.role || "Doctor"}
      </p>

      <p className="text-xs text-pink-200">
        {user?.email || ""}
      </p>

    </div>

  </div>

</div>

        {/* ===========================
              Logout
        =========================== */}

        <div className="p-5">

          <button
            onClick={() => {

              localStorage.removeItem("token");
              localStorage.removeItem("user");

              window.location.href = "/login";

            }}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              bg-white
              text-pink-600
              font-semibold
              py-4
              rounded-xl
              hover:bg-pink-100
              transition-all
              duration-300
            "
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>

    </>

  );

}