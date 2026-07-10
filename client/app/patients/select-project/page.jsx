"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getProjects } from "@/services/projectService";

export default function SelectProjectPage() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();

      setProjects(response.data.projects || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-pink-600 mb-3">
          Select Project
        </h1>

        <p className="text-gray-500 mb-8">
          Every patient must belong to a project.
        </p>

        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <div className="space-y-3">
            {projects.length === 0 ? (
              <div className="text-center">
                <p className="text-red-500 mb-5">No project found.</p>
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project._id}
                  onClick={() =>
                    router.push(`/patients/create?project=${project._id}`)
                  }
                  className="
    border
    rounded-xl
    p-4
    bg-gray-50
    cursor-pointer
    hover:bg-pink-50
    hover:border-pink-500
    transition
  "
                >
                  <h2 className="font-bold">{project.projectName}</h2>

                  <p className="text-gray-500">{project.organization}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
