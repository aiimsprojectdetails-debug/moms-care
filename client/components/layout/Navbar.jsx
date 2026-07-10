"use client";

import { useState, useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  FaBell,
  FaSearch,
  FaChevronDown,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaEnvelope,
  FaBars,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({

  sidebarOpen,

  setSidebarOpen,

}) {

  const [search, setSearch] = useState("");

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [dropdown, setDropdown] = useState(false);

  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);

  /* ===========================
        Date & Time
  =========================== */

  useEffect(() => {

    const update = () => {

      const now = new Date();

      setDate(

        now.toLocaleDateString("en-IN", {

          weekday: "long",

          day: "numeric",

          month: "long",

          year: "numeric",

        })

      );

      setTime(

        now.toLocaleTimeString("en-IN")

      );

    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

  /* ===========================
        Close Dropdown
  =========================== */

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (

        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)

      ) {

        setDropdown(false);

      }

    };

    document.addEventListener(

      "mousedown",

      handleClickOutside

    );

    return () =>

      document.removeEventListener(

        "mousedown",

        handleClickOutside

      );

  }, []);

    return (

    <motion.header

      initial={{ y: -40, opacity: 0 }}

      animate={{ y: 0, opacity: 1 }}

      transition={{ duration: 0.4 }}

      className="
        sticky
        top-0
        z-[999]
        bg-white
        shadow-md
        border-b
      "

    >

      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">

        {/* ==========================
              LEFT
        ========================== */}

        <div className="flex items-center gap-4">

          {/* Mobile Menu */}

          <button

            onClick={() => setSidebarOpen(true)}

            className="
              lg:hidden
              text-pink-600
              text-2xl
              hover:text-pink-700
            "

          >

            <FaBars />

          </button>

          {/* Logo */}

          <div>

            <h2 className="text-2xl font-bold text-pink-600">

              Mom's Care

            </h2>

            <p className="hidden sm:block text-sm text-gray-500">

              Maternal Health Monitoring

            </p>

          </div>

        </div>

       

        <div className="flex items-center gap-3 sm:gap-5">

          {/* Date */}

          <div className="hidden xl:block text-right">

            <h3 className="font-semibold text-gray-700">

              {date}

            </h3>

            <p className="text-sm text-gray-500">

              {time}

            </p>

          </div>

          

          {/* ==========================
                Profile
          ========================== */}

          <div

            ref={dropdownRef}

            className="relative z-[9999]"

          >

            <button

              onClick={() => setDropdown(!dropdown)}

              className="
                flex
                items-center
                gap-3
                bg-pink-50
                hover:bg-pink-100
                rounded-full
                px-3
                py-2
                transition
              "

            >

            

              <div className="hidden md:block text-left">

                <h3 className="font-semibold text-gray-800">
  {user?.fullName || "Doctor"}
</h3>
                <p className="text-xs text-gray-500">
  {user?.role || "Doctor"}
</p>

              </div>

              <FaChevronDown

                className={`transition duration-300 ${
                  dropdown ? "rotate-180" : ""
                }`}

              />

            </button>

                        {/* ===========================
                  Profile Dropdown
            =========================== */}

            <AnimatePresence>

              {dropdown && (

                <motion.div

                  initial={{ opacity: 0, y: -10 }}

                  animate={{ opacity: 1, y: 0 }}

                  exit={{ opacity: 0, y: -10 }}

                  transition={{ duration: 0.2 }}

                  className="
                    absolute
                    right-0
                    mt-3
                    w-72
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    border
                    overflow-hidden
                    z-[99999]
                  "

                >

                  {/* Profile Header */}

                  <div className="bg-pink-50 p-5">

                    <div className="flex items-center gap-3">

                      

                      <div>

                        <h3 className="font-bold text-gray-800">
  {user?.fullName || "Doctor"}
</h3>

                        <p className="text-sm text-gray-500">
  {user?.email || ""}
</p>

                      </div>

                    </div>

                  </div>

                  {/* Menu */}

                  <div className="py-2">

                   

                    <Link
                      href="/change-password"
                      className="flex items-center gap-3 px-5 py-3 hover:bg-pink-50 transition"
                    >

                      🔒

                      <span>Change Password</span>

                    </Link>

                    <hr />

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
                        gap-3
                        px-5
                        py-3
                        text-red-600
                        hover:bg-red-50
                        transition
                      "

                    >

                      <FaSignOutAlt />

                      <span>Logout</span>

                    </button>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        </div>

      </div>

    </motion.header>

  );

}