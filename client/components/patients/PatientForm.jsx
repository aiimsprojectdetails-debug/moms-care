"use client";

import { useRouter } from "next/navigation";
import { createPatient, uploadPatientPhoto } from "@/services/patientService";
import { useState } from "react";

import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaTint,
  FaWeight,
  FaRulerVertical,
} from "react-icons/fa";

export default function PatientForm({ projectId }) {
  
  const router = useRouter();
  console.log("Project ID:", projectId);

  const [patientData, setPatientData] = useState({
    fullName: "",

    age: "",

    gender: "Female",

    mobile: "",

    email: "",

    aadhaar: "",

    husbandName: "",

    bloodGroup: "",

    weight: "",

    height: "",

    bmi: "",

    occupation: "",

    state: "",

    district: "",

    village: "",

    pincode: "",

    hospitalName: "",

    doctorName: "",

    registrationDate: "",

    pregnancyNumber: "",

    expectedDeliveryDate: "",

    emergencyName: "",

    emergencyPhone: "",

    patientPhoto: null,

    aadhaarFile: null,

    bloodReport: null,

    ultrasound: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPatientData({
      ...patientData,

      [name]: value,
    });
  };

  const handleFile = (e) => {
    const { name, files } = e.target;

    setPatientData({
      ...patientData,

      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        ...patientData,

        // Project selected from the Projects page
        project: projectId,
      };

      /* ===========================
       Upload Patient Photo
    =========================== */

      if (patientData.patientPhoto) {
        const uploadResponse = await uploadPatientPhoto(
          patientData.patientPhoto,
        );

        dataToSend.patientPhoto = uploadResponse.data.imageUrl;
      }

      /* ===========================
       Remove Local File Objects
    =========================== */

      delete dataToSend.aadhaarFile;
      delete dataToSend.bloodReport;
      delete dataToSend.ultrasound;

      /* ===========================
       Create Patient
    =========================== */

      const response = await createPatient(dataToSend);

      console.log(response.data);

      alert("Patient Registered Successfully");

      router.push("/patients");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to register patient.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-xl p-8"
    >
      <h2 className="text-3xl font-bold text-pink-600 mb-8">
        Register New Patient
      </h2>

      {/* Personal Information */}

      <h3 className="text-2xl font-semibold mb-6">Personal Information</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Full Name</label>

          <div className="flex items-center mt-2 border rounded-xl px-4">
            <FaUser className="text-pink-500" />

            <input
              type="text"
              name="fullName"
              value={patientData.fullName}
              onChange={handleChange}
              placeholder="Patient Name"
              className="w-full p-4 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="font-semibold">Age</label>

          <input
            type="number"
            name="age"
            value={patientData.age}
            onChange={handleChange}
            className="border rounded-xl p-4 w-full mt-2"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Gender</label>

          <select
            name="gender"
            value={patientData.gender}
            onChange={handleChange}
            className="border rounded-xl p-4 w-full mt-2"
          >
            <option>Female</option>

            <option>Male</option>

            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Mobile Number</label>

          <div className="flex items-center mt-2 border rounded-xl px-4">
            <FaPhone className="text-pink-500" />

            <input
              type="tel"
              name="mobile"
              value={patientData.mobile}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full p-4 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="font-semibold">Email</label>

          <div className="flex items-center mt-2 border rounded-xl px-4">
            <FaEnvelope className="text-pink-500" />

            <input
              type="email"
              name="email"
              value={patientData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full p-4 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold">Aadhaar Number</label>

          <div className="flex items-center mt-2 border rounded-xl px-4">
            <FaIdCard className="text-pink-500" />

            <input
              type="text"
              name="aadhaar"
              value={patientData.aadhaar}
              onChange={handleChange}
              placeholder="XXXX XXXX XXXX"
              className="w-full p-4 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="font-semibold">Husband Name</label>

          <input
            type="text"
            name="husbandName"
            value={patientData.husbandName}
            onChange={handleChange}
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Blood Group</label>

          <div className="flex items-center mt-2 border rounded-xl px-4">
            <FaTint className="text-pink-500" />

            <input
              type="text"
              name="bloodGroup"
              value={patientData.bloodGroup}
              onChange={handleChange}
              placeholder="O+"
              className="w-full p-4 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold">Weight (kg)</label>

          <div className="flex items-center mt-2 border rounded-xl px-4">
            <FaWeight className="text-pink-500" />

            <input
              type="number"
              name="weight"
              value={patientData.weight}
              onChange={handleChange}
              className="w-full p-4 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold">Height (cm)</label>

          <div className="flex items-center mt-2 border rounded-xl px-4">
            <FaRulerVertical className="text-pink-500" />

            <input
              type="number"
              name="height"
              value={patientData.height}
              onChange={handleChange}
              className="w-full p-4 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Additional Personal Information */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div>
          <label className="font-semibold">BMI</label>

          <input
            type="number"
            name="bmi"
            value={patientData.bmi}
            onChange={handleChange}
            placeholder="24.5"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Occupation</label>

          <input
            type="text"
            name="occupation"
            value={patientData.occupation}
            onChange={handleChange}
            placeholder="Teacher"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>
      </div>

      {/* Address Information */}

      <h3 className="text-2xl font-semibold mt-10 mb-6">Address Information</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">State</label>

          <input
            type="text"
            name="state"
            value={patientData.state}
            onChange={handleChange}
            placeholder="Odisha"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">District</label>

          <input
            type="text"
            name="district"
            value={patientData.district}
            onChange={handleChange}
            placeholder="Khordha"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Village / City</label>

          <input
            type="text"
            name="village"
            value={patientData.village}
            onChange={handleChange}
            placeholder="Bhubaneswar"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">PIN Code</label>

          <input
            type="number"
            name="pincode"
            value={patientData.pincode}
            onChange={handleChange}
            placeholder="751001"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>
      </div>

      {/* Hospital Information */}

      <h3 className="text-2xl font-semibold mt-10 mb-6">
        Hospital Information
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Hospital Name</label>

          <input
            type="text"
            name="hospitalName"
            value={patientData.hospitalName}
            onChange={handleChange}
            placeholder="AIIMS Bhubaneswar"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Doctor Name</label>

          <input
            type="text"
            name="doctorName"
            value={patientData.doctorName}
            onChange={handleChange}
            placeholder="Dr. Amit Khuntia"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Registration Date</label>

          <input
            type="date"
            name="registrationDate"
            value={patientData.registrationDate}
            onChange={handleChange}
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Hospital Patient ID</label>

          <input
            type="text"
            name="hospitalPatientId"
            value={patientData.hospitalPatientId || ""}
            onChange={handleChange}
            placeholder="MC-2026-0001"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>
      </div>

      {/* Pregnancy Information */}

      <h3 className="text-2xl font-semibold mt-10 mb-6">
        Pregnancy Information
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Pregnancy Number</label>

          <select
            name="pregnancyNumber"
            value={patientData.pregnancyNumber}
            onChange={handleChange}
            className="border rounded-xl p-4 w-full mt-2"
          >
            <option value="">Select</option>
            <option value="1">First Pregnancy</option>
            <option value="2">Second Pregnancy</option>
            <option value="3">Third Pregnancy</option>
            <option value="4">Fourth Pregnancy</option>
            <option value="5+">More than Four</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Current Trimester</label>

          <select
            name="trimester"
            value={patientData.trimester || ""}
            onChange={handleChange}
            className="border rounded-xl p-4 w-full mt-2"
          >
            <option value="">Select Trimester</option>
            <option value="1st Trimester">1st Trimester</option>
            <option value="2nd Trimester">2nd Trimester</option>
            <option value="3rd Trimester">3rd Trimester</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Last Menstrual Period (LMP)</label>

          <input
            type="date"
            name="lmp"
            value={patientData.lmp || ""}
            onChange={handleChange}
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Expected Delivery Date (EDD)</label>

          <input
            type="date"
            name="expectedDeliveryDate"
            value={patientData.expectedDeliveryDate}
            onChange={handleChange}
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>
      </div>

      {/* Medical Information */}

      <h3 className="text-2xl font-semibold mt-10 mb-6">Medical Information</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Blood Pressure</label>

          <input
            type="text"
            name="bloodPressure"
            value={patientData.bloodPressure || ""}
            onChange={handleChange}
            placeholder="120 / 80"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Hemoglobin (Hb)</label>

          <input
            type="text"
            name="hemoglobin"
            value={patientData.hemoglobin || ""}
            onChange={handleChange}
            placeholder="12.5 g/dL"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Blood Sugar</label>

          <input
            type="text"
            name="bloodSugar"
            value={patientData.bloodSugar || ""}
            onChange={handleChange}
            placeholder="95 mg/dL"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Risk Category</label>

          <select
            name="riskLevel"
            value={patientData.riskLevel || ""}
            onChange={handleChange}
            className="border rounded-xl p-4 w-full mt-2"
          >
            <option value="">Select</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Allergies</label>

          <input
            type="text"
            name="allergies"
            value={patientData.allergies || ""}
            onChange={handleChange}
            placeholder="Penicillin"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Existing Diseases</label>

          <input
            type="text"
            name="existingDisease"
            value={patientData.existingDisease || ""}
            onChange={handleChange}
            placeholder="Diabetes / Hypertension"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>
      </div>

      {/* Emergency Contact */}

      <h3 className="text-2xl font-semibold mt-10 mb-6">Emergency Contact</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Contact Person</label>

          <input
            type="text"
            name="emergencyName"
            value={patientData.emergencyName}
            onChange={handleChange}
            placeholder="Husband / Guardian"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Emergency Mobile</label>

          <input
            type="tel"
            name="emergencyPhone"
            value={patientData.emergencyPhone}
            onChange={handleChange}
            placeholder="9876543210"
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>
      </div>

      {/* Document Uploads */}

      <h3 className="text-2xl font-semibold mt-10 mb-6">Document Uploads</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Patient Photo */}

        <div>
          <label className="font-semibold">Patient Photo</label>

          <input
            type="file"
            name="patientPhoto"
            accept="image/*"
            onChange={handleFile}
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        {/* Aadhaar */}

        <div>
          <label className="font-semibold">Aadhaar Card</label>

          <input
            type="file"
            name="aadhaarFile"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFile}
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        {/* Blood Report */}

        <div>
          <label className="font-semibold">Blood Report</label>

          <input
            type="file"
            name="bloodReport"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFile}
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>

        {/* Ultrasound */}

        <div>
          <label className="font-semibold">Ultrasound Report</label>

          <input
            type="file"
            name="ultrasound"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFile}
            className="border rounded-xl p-4 w-full mt-2"
          />
        </div>
      </div>

      {/* Doctor Remarks */}

      <div className="mt-10">
        <label className="font-semibold">Doctor Remarks</label>

        <textarea
          rows="5"
          name="doctorRemarks"
          value={patientData.doctorRemarks || ""}
          onChange={handleChange}
          placeholder="Enter doctor's observations, treatment plan, or recommendations..."
          className="border rounded-xl p-4 w-full mt-2 resize-none"
        />
      </div>

      {/* Buttons */}

      <div className="flex flex-wrap gap-4 mt-10">
        <button
          type="submit"
          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-bold transition"
        >
          Save Patient
        </button>

        <button
          type="reset"
          onClick={() =>
            setPatientData({
              fullName: "",
              age: "",
              gender: "Female",
              mobile: "",
              email: "",
              aadhaar: "",
              husbandName: "",
              bloodGroup: "",
              weight: "",
              height: "",
              bmi: "",
              occupation: "",
              state: "",
              district: "",
              village: "",
              pincode: "",
              hospitalName: "",
              doctorName: "",
              registrationDate: "",
              pregnancyNumber: "",
              trimester: "",
              lmp: "",
              expectedDeliveryDate: "",
              bloodPressure: "",
              hemoglobin: "",
              bloodSugar: "",
              riskLevel: "",
              allergies: "",
              existingDisease: "",
              emergencyName: "",
              emergencyPhone: "",
              doctorRemarks: "",
              patientPhoto: null,
              aadhaarFile: null,
              bloodReport: null,
              ultrasound: null,
            })
          }
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 rounded-xl font-bold transition"
        >
          Reset Form
        </button>
      </div>
    </form>
  );
}
