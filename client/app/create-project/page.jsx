"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import ProjectForm from "@/components/project/ProjectForm";

import { FaFolderPlus } from "react-icons/fa";

export default function CreateProjectPage() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="flex min-h-screen bg-pink-50">

      {/* Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}

      <div className="flex-1 flex flex-col">

        {/* Navbar */}

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}

        <main className="flex-1 p-8">

          {/* Header */}

          <div className="bg-gradient-to-r from-pink-500 to-pink-700 rounded-3xl text-white p-8 shadow-xl mb-8">

            <div className="flex items-center gap-5">

              <div className="bg-white/20 p-5 rounded-full">

                <FaFolderPlus size={40} />

              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  Create New Project
                </h1>

                <p className="mt-2 text-pink-100 text-lg">
                  Create a new maternal healthcare project for your hospital.
                </p>

              </div>

            </div>

          </div>

          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-gray-600 mb-6">

            <span className="hover:text-pink-600 cursor-pointer">
              Dashboard
            </span>

            <span>›</span>

            <span className="hover:text-pink-600 cursor-pointer">
              Projects
            </span>

            <span>›</span>

            <span className="font-semibold text-pink-600">
              Create Project
            </span>

          </div>

          {/* Project Form */}

          <ProjectForm />

        </main>

      </div>

    </div>

  );

}