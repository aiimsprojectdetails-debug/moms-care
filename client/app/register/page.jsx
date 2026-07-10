"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiHome,
  FiBriefcase,
} from "react-icons/fi";

import { FaHospital } from "react-icons/fa";

import toast from "react-hot-toast";

import { registerUser } from "@/services/authService";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",

    email: "",

    phone: "",

    hospitalName: "",

    department: "",

    designation: "",

    role: "Doctor",

    password: "",

    confirmPassword: "",
  });

  /* =====================================
        Handle Input Change
  ===================================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /* =====================================
        Register User
  ===================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        fullName: formData.fullName,

        email: formData.email,

        password: formData.password,

        phone: formData.phone,

        hospitalName: formData.hospitalName,

        department: formData.department,

        designation: formData.designation,

        role: formData.role,
      });

      toast.success(response.data.message || "Registration Successful");

      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* ===========================
              LEFT SIDE
        ============================ */}

        <div className="hidden lg:flex flex-col justify-center items-center bg-pink-600 text-white p-10">
          <h1 className="text-5xl font-bold mb-5">❤️ Mom's Care</h1>

          <h2 className="text-3xl font-semibold mb-6">Create Account</h2>

          <p className="text-center leading-8 text-pink-100">
            Register as Doctor, Nurse or Admin to manage maternal healthcare,
            patients and hospital projects.
          </p>

          <Image
    src="/images/register.png"
    alt="Register"
    width={350}
    height={350}
    loading="eager"
    className="mt-10 h-auto w-auto"
/>
        </div>

        {/* ===========================
              RIGHT SIDE
        ============================ */}

        <div className="p-8 md:p-10">
          <h2 className="text-4xl font-bold text-pink-600">Register</h2>

          <p className="text-gray-500 mt-2 mb-8">
            Create your Mom's Care account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* ===========================
      Full Name
=========================== */}

            <div className="relative">
              <FiUser
                className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500"
                size={20}
              />

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 border rounded-xl outline-none focus:border-pink-500"
              />
            </div>

            {/* ===========================
      Email
=========================== */}

            <div className="relative">
              <FiMail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500"
                size={20}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 border rounded-xl outline-none focus:border-pink-500"
              />
            </div>

            {/* ===========================
      Phone
=========================== */}

            <div className="relative">
              <FiPhone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500"
                size={20}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border rounded-xl outline-none focus:border-pink-500"
              />
            </div>

            {/* ===========================
      Hospital
=========================== */}

            <div className="relative">
              <FaHospital
                className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500"
                size={20}
              />

              <input
                type="text"
                name="hospitalName"
                placeholder="Hospital Name"
                value={formData.hospitalName}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border rounded-xl outline-none focus:border-pink-500"
              />
            </div>

            {/* ===========================
      Department
=========================== */}

            <div className="relative">
              <FiHome
                className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500"
                size={20}
              />

              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border rounded-xl outline-none focus:border-pink-500"
              />
            </div>

            {/* ===========================
      Designation
=========================== */}

            <div className="relative">
              <FiBriefcase
                className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500"
                size={20}
              />

              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border rounded-xl outline-none focus:border-pink-500"
              />
            </div>

            {/* ===========================
      Role
=========================== */}

            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-3">
                Select Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-xl p-4 outline-none focus:border-pink-500"
              >
                <option value="Doctor">Doctor</option>

                <option value="Nurse">Nurse</option>

                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* ===========================
      Password
=========================== */}

            <div className="relative">
              <FiLock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500"
                size={20}
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-12 py-4 border rounded-xl outline-none focus:border-pink-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {/* ===========================
      Confirm Password
=========================== */}

            <div className="relative">
              <FiLock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500"
                size={20}
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-12 py-4 border rounded-xl outline-none focus:border-pink-500"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>

            {/* ===========================
                  Register Button
            =========================== */}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 text-white py-4 rounded-xl font-bold text-lg shadow-lg"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          {/* ===========================
                Login Link
          =========================== */}

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?
              <Link
                href="/login"
                className="text-pink-600 font-bold ml-2 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
