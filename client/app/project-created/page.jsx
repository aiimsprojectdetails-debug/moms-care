"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaCheckCircle, FaFolderOpen, FaUserPlus } from "react-icons/fa";

function ProjectCreatedContent() {
  const searchParams = useSearchParams();

  const projectId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center">

        {/* Success Icon */}

        <div className="flex justify-center">

          <div className="bg-green-100 p-6 rounded-full">

            <FaCheckCircle
              size={70}
              className="text-green-600"
            />

          </div>

        </div>

        {/* Title */}

        <h1 className="text-4xl font-bold text-pink-600 mt-8">

          Project Created Successfully

        </h1>

        <p className="text-gray-600 mt-4 text-lg">

          Your maternal healthcare project has been created successfully.

        </p>

        {/* Project ID */}

        <div className="mt-8 bg-pink-50 rounded-2xl p-5">

          <p className="text-gray-500">

            Project ID

          </p>

          <p className="font-bold text-pink-600 break-all mt-2">

            {projectId}

          </p>

        </div>

        {/* Buttons */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          {/* Add Patient */}

          <Link
            href={`/add-patient?project=${projectId}`}
            className="bg-pink-600 hover:bg-pink-700 text-white rounded-2xl py-5 flex items-center justify-center gap-3 font-bold text-lg transition"
          >
            <FaUserPlus />

            Add Patient

          </Link>

          {/* Back */}

          <Link
            href="/projects"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-2xl py-5 flex items-center justify-center gap-3 font-bold text-lg transition"
          >
            <FaFolderOpen />

            View Projects

          </Link>

        </div>

      </div>

    </div>
  );
}

export default function ProjectCreatedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ProjectCreatedContent />
    </Suspense>
  );
}