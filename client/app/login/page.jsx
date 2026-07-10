"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { loginUser } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ===========================
  // LOGIN
  // ===========================

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser({
        email: form.email,
        password: form.password,
      });

      const { token, user, message } = response.data;

      login(user, token);

      toast.success(message || "Login Successful");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200 flex items-center justify-center px-5">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2"
      >

        {/* LEFT */}

        <div className="hidden md:flex flex-col justify-center items-center bg-pink-500 text-white p-10">

          <h1 className="text-5xl font-bold mb-6">
            ❤️ Mom's Care
          </h1>

          <p className="text-center text-lg leading-8">
            Caring for every mother with love,
            technology and compassion.
          </p>

          <img
            src="/images/login.png"
            alt="Login"
            className="mt-10 w-72"
          />

        </div>

        {/* RIGHT */}

        <div className="p-10">

          <h2 className="text-4xl font-bold text-pink-600 mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-8">
            Login to continue
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >

            {/* EMAIL */}

            <div>

              <label className="font-semibold text-gray-600">
                Email
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4">

                <FiMail className="text-pink-500" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full p-4 outline-none"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="font-semibold text-gray-600">
                Password
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4">

                <FiLock className="text-pink-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  className="w-full p-4 outline-none"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* REMEMBER */}

            <div className="flex justify-between items-center">

              <label className="flex items-center gap-2">

                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />

                Remember Me

              </label>

              <Link
                href="/forgot-password"
                className="text-pink-600 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 transition text-white rounded-xl py-4 font-bold text-lg disabled:opacity-60"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            {/* REGISTER */}

            <p className="text-center text-gray-500">

              Don't have an account?

              <Link
                href="/register"
                className="text-pink-600 font-bold ml-2"
              >
                Register
              </Link>

            </p>

          </form>

        </div>

      </motion.div>

    </div>
  );
}