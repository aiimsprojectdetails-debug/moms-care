"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import {
  getProject,
  updateProject,
} from "@/services/projectService";

import {
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";

function EditProjectContent() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const projectId = searchParams.get("id");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    hospitalName: "",
    hospitalId: "",
    department: "",
    mentor: "",
    collaborators: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Ongoing",
    category: "",
    fundingAgency: "",
    fundingAmount: "",
    priority: "Medium",
  });

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    try {
      const response = await getProject(projectId);

      const p = response.data.project;

      setFormData({
        title: p.title || "",
        hospitalName: p.hospitalName || "",
        hospitalId: p.hospitalId || "",
        department: p.department || "",
        mentor: p.mentor || "",
        collaborators: p.collaborators || "",
        description: p.description || "",
        startDate: p.startDate?.substring(0, 10) || "",
        endDate: p.endDate?.substring(0, 10) || "",
        status: p.status || "Ongoing",
        category: p.category || "",
        fundingAgency: p.fundingAgency || "",
        fundingAmount: p.fundingAmount || "",
        priority: p.priority || "Medium",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProject(projectId, formData);

      alert("Project Updated Successfully");

      router.push(`/project-details?id=${projectId}`);
    } catch (error) {
      console.error(error);

      alert("Failed to Update Project");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-3xl font-bold text-pink-600">
          Loading Project...
        </h2>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-pink-50">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-8">

          <div className="flex justify-between items-center mb-8">

            <div>

              <h1 className="text-4xl font-bold text-pink-600">
                Edit Project
              </h1>

              <p className="text-gray-500 mt-2">
                Update the project information
              </p>

            </div>

            <Link
              href={`/project-details?id=${projectId}`}
              className="bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <FaArrowLeft />
              Back
            </Link>

          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg p-8"
          >

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="font-semibold">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold">Hospital Name</label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold">Hospital ID</label>
                <input
                  type="text"
                  name="hospitalId"
                  value={formData.hospitalId}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold">Mentor</label>
                <input
                  type="text"
                  name="mentor"
                  value={formData.mentor}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold">Collaborators</label>
                <input
                  type="text"
                  name="collaborators"
                  value={formData.collaborators}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                >
                  <option>Ongoing</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Funding Agency</label>
                <input
                  type="text"
                  name="fundingAgency"
                  value={formData.fundingAgency}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold">Funding Amount</label>
                <input
                  type="number"
                  name="fundingAmount"
                  value={formData.fundingAmount}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

            </div>

            <div className="mt-6">

              <label className="font-semibold">Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full mt-2 border rounded-xl p-4"
              />

            </div>

            <div className="flex justify-end gap-4 mt-8">

              <Link
                href={`/project-details?id=${projectId}`}
                className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl flex items-center gap-3"
              >
                <FaSave />
                Update Project
              </button>

            </div>

          </form>

        </main>

      </div>

    </div>
  );
}

export default function EditProjectPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <EditProjectContent />
    </Suspense>
  );
}