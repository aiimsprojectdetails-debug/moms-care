"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      // Backend API (we will create this later)
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      setMessage(
        "Password reset link has been sent to your registered email."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid lg:grid-cols-2 max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
      >

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-pink-500 to-pink-700 text-white p-12">

          <img
            src="/images/login.png"
            alt="Forgot Password"
            className="w-80 mb-8"
          />

          <h1 className="text-5xl font-bold mb-4">
            Mom's Care
          </h1>

          <p className="text-center text-pink-100 leading-8 text-lg">
            Don't worry!
            <br />
            Enter your registered email address and we'll send
            you a secure password reset link.
          </p>

        </div>

        {/* Right Side */}

        <div className="p-10 md:p-14">

          <h2 className="text-4xl font-bold text-pink-600 mb-2">
            Forgot Password
          </h2>

          <p className="text-gray-500 mb-8">
            Enter your registered email.
          </p>

          {message && (
            <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Email Address
              </label>

              <div className="flex items-center border rounded-xl px-4">

                <FiMail className="text-pink-500 text-xl" />

                <input
                  type="email"
                  placeholder="Enter your registered email"
                  className="w-full p-4 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-bold text-lg transition duration-300 disabled:opacity-70"
            >
              {loading ? "Sending Reset Link..." : "Send Reset Link"}
            </button>

          </form>

          <div className="mt-8">

            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:underline"
            >
              <FiArrowLeft />
              Back to Login
            </Link>

          </div>

        </div>

      </motion.div>

    </div>
  );
}