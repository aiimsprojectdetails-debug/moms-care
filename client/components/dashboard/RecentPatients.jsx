"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  FaEye,
  FaPhoneAlt,
  FaHospital,
} from "react-icons/fa";

import {
  getPatients,
} from "@/services/patientService";

const badgeColor = {

  Low: "bg-green-100 text-green-700",

  Medium: "bg-yellow-100 text-yellow-700",

  High: "bg-red-100 text-red-700",

};

export default function RecentPatients() {

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadPatients();

  }, []);

  const loadPatients = async () => {

    try {

      const response = await getPatients();

      setPatients(response.data.patients || []);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="bg-white rounded-3xl shadow-lg mt-8 p-10">

        <h2 className="text-2xl font-bold text-pink-600">

          Loading Patients...

        </h2>

      </div>

    );

  }

  return (

    <div className="bg-white rounded-3xl shadow-lg mt-8 overflow-hidden">

      {/* Header */}

      <div className="flex justify-between items-center px-8 py-6 border-b">

        <div>

          <h2 className="text-2xl font-bold text-pink-600">

            Recent Patients

          </h2>

          <p className="text-gray-500 mt-1">

            Recently registered mothers

          </p>

        </div>

        <Link
          href="/patients"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl transition"
        >

          View All

        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-pink-50">

            <tr>

              <th className="p-5 text-left">

                Patient

              </th>

              <th className="p-5 text-left">

                Aadhaar

              </th>

              <th className="p-5 text-left">

                Phone

              </th>

              <th className="p-5 text-left">

                Hospital

              </th>

              <th className="p-5 text-left">

                Last Updated

              </th>

              <th className="p-5 text-left">

                Risk

              </th>

              <th className="p-5 text-center">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

                        {patients.length > 0 ? (

              patients.slice(0, 5).map((patient) => (

                <tr
                  key={patient._id}
                  className="border-b hover:bg-pink-50 transition"
                >

                  {/* Patient */}

                  <td className="p-5">

                    {/* <div className="flex items-center gap-4">

                      <Image
  src={
    patient.patientPhoto
      ? `http://localhost:5000/${patient.patientPhoto.replace(/\\/g, "/")}`
      : "/images/default-user.png"
  }
  alt={patient.fullName}
  width={55}
  height={55}
  className="rounded-full object-cover"
/>

                      <div>

                        <h3 className="font-semibold">

                          {patient.fullName}

                        </h3>

                        <p className="text-sm text-gray-500">

                          Pregnant Mother

                        </p>

                      </div>

                    </div> */}

                  </td>

                  {/* Aadhaar */}

                  <td className="p-5">

                    {patient.aadhaar}

                  </td>

                  {/* Mobile */}

                  <td className="p-5">

                    <div className="flex items-center gap-2">

                      <FaPhoneAlt className="text-pink-500" />

                      {patient.mobile}

                    </div>

                  </td>

                  {/* Hospital */}

                  <td className="p-5">

                    <div className="flex items-center gap-2">

                      <FaHospital className="text-pink-500" />

                      {patient.project?.hospitalName ||
                        patient.hospitalName ||
                        "-"}

                    </div>

                  </td>

                  {/* Last Updated */}

                  <td className="p-5">

                    {patient.updatedAt
                      ? new Date(
                          patient.updatedAt
                        ).toLocaleDateString()
                      : "-"}

                  </td>

                  {/* Risk */}

                  <td className="p-5">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        badgeColor[
                          patient.riskLevel || "Low"
                        ]
                      }`}
                    >

                      {patient.riskLevel || "Low"}

                    </span>

                  </td>

                  {/* View */}

                  <td className="p-5 text-center">

                    <Link
                      href={`/patient-details?id=${patient._id}`}
                      className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full transition inline-flex"
                    >

                      <FaEye />

                    </Link>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-500"
                >

                  No patients found.

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}