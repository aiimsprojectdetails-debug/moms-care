"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import ProjectTable from "@/components/project/ProjectTable";

import { FaPlus } from "react-icons/fa";

import { getProjects } from "@/services/projectService";

export default function ProjectsPage() {
  /* ==========================
      Sidebar
  ========================== */

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ==========================
      Projects
  ========================== */

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* ==========================
      Fetch Projects
  ========================== */

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await getProjects();

      console.log(response.data);

      setProjects(response.data.projects || []);
    } catch (err) {
      console.error(err);

      setError("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex overflow-hidden">
      {/* Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page */}

        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          {/* Header */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-pink-600">
                Projects
              </h1>

              <p className="text-gray-500 mt-2">
                Manage all maternal healthcare projects
              </p>
            </div>

            <Link
              href="/create-project"
              className="
                inline-flex
                items-center
                gap-3
                bg-pink-600
                hover:bg-pink-700
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
              "
            >
              <FaPlus />
              Create Project
            </Link>
          </div>

          {/* Statistics */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-4xl font-bold text-pink-600">
                {projects.length}
              </h2>

              <p className="text-gray-500 mt-2">
                Total Projects
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-4xl font-bold text-green-600">
                {
                  projects.filter(
                    (p) => p.status === "Ongoing"
                  ).length
                }
              </h2>

              <p className="text-gray-500 mt-2">
                Ongoing
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-4xl font-bold text-blue-600">
                {
                  projects.filter(
                    (p) => p.status === "Completed"
                  ).length
                }
              </h2>

              <p className="text-gray-500 mt-2">
                Completed
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-4xl font-bold text-red-500">
                {projects.reduce(
                  (total, project) =>
                    total +
                    (project.patients?.length || 0),
                  0
                )}
              </h2>

              <p className="text-gray-500 mt-2">
                Total Patients
              </p>
            </div>
          </div>

          {/* Loading */}

          {loading ? (
            <div className="flex justify-center py-20">
              Loading Projects...
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500">
              {error}
            </div>
          ) : (
            <ProjectTable
              projects={projects}
              onRefresh={fetchProjects}
            />
          )}
        </main>
      </div>
    </div>
  );
}