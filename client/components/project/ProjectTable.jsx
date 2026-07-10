"use client";

import Link from "next/link";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaHospital,
  FaUserPlus,
} from "react-icons/fa";

export default function ProjectTable({
  projects = [],
  onRefresh,
}) {
  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
        <h2 className="text-2xl font-bold text-gray-600">
          No Projects Found
        </h2>

        <p className="text-gray-500 mt-2">
          Click "Create Project" to add your first project.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white px-8 py-6">

        <h2 className="text-3xl font-bold">
          Project List
        </h2>

        <p className="text-pink-100 mt-2">
          All registered maternal healthcare projects
        </p>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-pink-50">

            <tr>

              <th className="text-left px-6 py-4">
                Project
              </th>

              <th className="text-left px-6 py-4">
                Hospital
              </th>

              <th className="text-left px-6 py-4">
                Mentor
              </th>

              <th className="text-center px-6 py-4">
                Patients
              </th>

              <th className="text-center px-6 py-4">
                Start Date
              </th>

              <th className="text-center px-6 py-4">
                Status
              </th>

              <th className="text-center px-6 py-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {projects.map((project) => (

              <tr
                key={project._id}
                className="border-b hover:bg-pink-50 transition"
              >

                {/* Project */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="bg-pink-100 p-3 rounded-full">

                      <FaHospital className="text-pink-600" />

                    </div>

                    <div>

                      <h3 className="font-semibold">

                        {project.title}

                      </h3>

                      <p className="text-gray-500 text-sm">

                        {project.category}

                      </p>

                    </div>

                  </div>

                </td>

                {/* Hospital */}

                <td className="px-6 py-5">

                  {project.hospitalName || "-"}

                </td>

                {/* Mentor */}

                <td className="px-6 py-5">

                  {project.mentor}

                </td>

                {/* Patients */}

                <td className="px-6 py-5 text-center font-semibold">

                  {project.patients?.length || 0}

                </td>

                {/* Start Date */}

                <td className="px-6 py-5 text-center">

                  {new Date(
                    project.startDate
                  ).toLocaleDateString()}

                </td>

                {/* Status */}

                <td className="px-6 py-5 text-center">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      project.status === "Completed"
                        ? "bg-blue-100 text-blue-700"
                        : project.status === "Ongoing"
                        ? "bg-green-100 text-green-700"
                        : project.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {project.status}
                  </span>

                </td>

                {/* Actions */}

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-3">

                    <Link
                      href={`/project-details?id=${project._id}`}
                      className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full"
                    >
                      <FaEye />
                    </Link>

                    <Link
  href={`/add-patient?project=${project._id}`}
  className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
  title="Add Patient"
>
  <FaUserPlus />
</Link>
<Link
  href={`/edit-project?id=${project._id}`}
  className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full"
  title="Edit Project"
>
  <FaEdit />
</Link>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full"
                      onClick={() =>
                        alert(
                          "Delete functionality will be connected next."
                        )
                      }
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}