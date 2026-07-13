"use client";

import { useState } from "react";

import { createProject } from "@/services/projectService";
import { deleteProject } from "@/services/projectService";
import { useRouter } from "next/navigation";

import {
  FaHospital,
  FaUserMd,
  FaUsers,
  FaCalendarAlt,
  FaUpload,
  FaFolderOpen,
} from "react-icons/fa";

export default function ProjectForm() {

  const [projectData, setProjectData] = useState({
    

    projectName: "",

    hospitalName: "",

    hospitalId: "",

    department: "",

    principalDoctor: "",

    collaborators: "",

    description: "",

    state: "",

    district: "",

    address: "",

    pincode: "",

    startDate: "",

    endDate: "",

    status: "Active",

    logo: null,

  });
  const router = useRouter();

  const handleChange = (e) => {

    const { name, value } = e.target;

    setProjectData({

      ...projectData,

      [name]: value,

    });

  };

  const handleLogo = (e) => {

    setProjectData({

      ...projectData,

      logo: e.target.files[0],

    });

  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const data = {

      title: projectData.projectName,

      description: projectData.description,

      category: "Research Project",

      mentor: projectData.principalDoctor,

      department: projectData.department,

      hospitalName: projectData.hospitalName,

      fundingAgency: "",

      fundingAmount: 0,

      startDate: projectData.startDate,

      endDate: projectData.endDate,

      status:
        projectData.status === "Active"
          ? "Ongoing"
          : projectData.status,

      priority: "Medium",

      members: [
        {
          name: projectData.collaborators,
          designation: "",
          email: "",
        },
      ],

      projectImage: "",
    };

    console.log(data);

const response = await createProject(data);

const projectId = response.data.project._id;

router.push(`/project-created?id=${projectId}`);

  } catch (error) {

  console.error("FULL ERROR:", error);

  console.log("Response:", error.response);

  console.log("Data:", error.response?.data);

  alert(
    JSON.stringify(error.response?.data, null, 2)
  );

}
};

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-xl p-8"
    >

      <h2 className="text-3xl font-bold text-pink-600 mb-8">

        Create New Project

      </h2>

      {/* Project Information */}

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="font-semibold">

            Project Name

          </label>

          <div className="flex items-center mt-2 border rounded-xl px-4">

            <FaFolderOpen className="text-pink-500"/>

            <input

              type="text"

              name="projectName"

              value={projectData.projectName}

              onChange={handleChange}

              placeholder="Project Name"

              className="w-full p-4 outline-none"

              required

            />

          </div>

        </div>

        <div>

          <label className="font-semibold">

            Hospital Name

          </label>

          <div className="flex items-center mt-2 border rounded-xl px-4">

            <FaHospital className="text-pink-500"/>

            <input

              type="text"

              name="hospitalName"

              value={projectData.hospitalName}

              onChange={handleChange}

              placeholder="Hospital Name"

              className="w-full p-4 outline-none"

              required

            />

          </div>

        </div>

        <div>

          <label className="font-semibold">

            Hospital ID

          </label>

          <input

            type="text"

            name="hospitalId"

            value={projectData.hospitalId}

            onChange={handleChange}

            className="border rounded-xl p-4 w-full mt-2"

          />

        </div>

        <div>

          <label className="font-semibold">

            Department

          </label>

          <input

            type="text"

            name="department"

            value={projectData.department}

            onChange={handleChange}

            className="border rounded-xl p-4 w-full mt-2"

            placeholder="Gynecology"

          />

        </div>

      </div>

            {/* Doctor & Collaborators */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div>

          <label className="font-semibold">

            Principal Doctor

          </label>

          <div className="flex items-center mt-2 border rounded-xl px-4">

            <FaUserMd className="text-pink-500"/>

            <input

              type="text"

              name="principalDoctor"

              value={projectData.principalDoctor}

              onChange={handleChange}

              placeholder="Doctor Name"

              className="w-full p-4 outline-none"

              required

            />

          </div>

        </div>

        <div>

          <label className="font-semibold">

            Collaborators

          </label>

          <div className="flex items-center mt-2 border rounded-xl px-4">

            <FaUsers className="text-pink-500"/>

            <input

              type="text"

              name="collaborators"

              value={projectData.collaborators}

              onChange={handleChange}

              placeholder="Dr. A, Dr. B, Nurse C"

              className="w-full p-4 outline-none"

            />

          </div>

        </div>

      </div>



      {/* Description */}

      <div className="mt-8">

        <label className="font-semibold">

          Project Description

        </label>

        <textarea

          rows="5"

          name="description"

          value={projectData.description}

          onChange={handleChange}

          placeholder="Write project description..."

          className="border rounded-xl p-4 w-full mt-2 resize-none"

        />

      </div>



      {/* Address */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div>

          <label className="font-semibold">

            State

          </label>

          <input

            type="text"

            name="state"

            value={projectData.state}

            onChange={handleChange}

            placeholder="Odisha"

            className="border rounded-xl p-4 w-full mt-2"

          />

        </div>

        <div>

          <label className="font-semibold">

            District

          </label>

          <input

            type="text"

            name="district"

            value={projectData.district}

            onChange={handleChange}

            placeholder="Khordha"

            className="border rounded-xl p-4 w-full mt-2"

          />

        </div>

      </div>



      <div className="mt-6">

        <label className="font-semibold">

          Hospital Address

        </label>

        <textarea

          rows="3"

          name="address"

          value={projectData.address}

          onChange={handleChange}

          placeholder="Hospital Address"

          className="border rounded-xl p-4 w-full mt-2 resize-none"

        />

      </div>



      <div className="mt-6">

        <label className="font-semibold">

          PIN Code

        </label>

        <input

          type="number"

          name="pincode"

          value={projectData.pincode}

          onChange={handleChange}

          placeholder="751001"

          className="border rounded-xl p-4 w-full mt-2"

        />

      </div>

            {/* Project Dates */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div>

          <label className="font-semibold">

            Start Date

          </label>

          <div className="flex items-center mt-2 border rounded-xl px-4">

            <FaCalendarAlt className="text-pink-500"/>

            <input
              type="date"
              name="startDate"
              value={projectData.startDate}
              onChange={handleChange}
              className="w-full p-4 outline-none"
              required
            />

          </div>

        </div>

        <div>

          <label className="font-semibold">

            End Date

          </label>

          <div className="flex items-center mt-2 border rounded-xl px-4">

            <FaCalendarAlt className="text-pink-500"/>

            <input
              type="date"
              name="endDate"
              value={projectData.endDate}
              onChange={handleChange}
              className="w-full p-4 outline-none"
            />

          </div>

        </div>

      </div>



      {/* Status */}

      <div className="mt-8">

        <label className="font-semibold">

          Project Status

        </label>

        <select
          name="status"
          value={projectData.status}
          onChange={handleChange}
          className="border rounded-xl p-4 w-full mt-2"
        >

          <option value="Active">
            Active
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Pending">
            Pending
          </option>

        </select>

      </div>



      {/* Upload Logo */}

      <div className="mt-8">

        <label className="font-semibold">

          Project Logo

        </label>

        <div className="border-2 border-dashed border-pink-300 rounded-2xl mt-2 p-8 text-center">

          <FaUpload
            className="mx-auto text-pink-500 mb-4"
            size={35}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleLogo}
            className="w-full"
          />

          <p className="text-gray-500 mt-3">

            Upload Hospital Logo

          </p>

        </div>

      </div>



      {/* Buttons */}

      <div className="flex gap-4 mt-10">

        <button
          type="submit"
          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-bold transition"
        >
          Save Project
        </button>

        <button
          type="reset"
          onClick={() =>
            setProjectData({
              projectName: "",
              hospitalName: "",
              hospitalId: "",
              department: "",
              principalDoctor: "",
              collaborators: "",
              description: "",
              state: "",
              district: "",
              address: "",
              pincode: "",
              startDate: "",
              endDate: "",
              status: "Active",
              logo: null,
            })
          }
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl font-bold transition"
        >
          Reset
        </button>

      </div>

    </form>

  );
}

