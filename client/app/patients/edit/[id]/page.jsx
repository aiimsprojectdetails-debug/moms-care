"use client";

import { useState, useEffect } from "react";

import { useParams, useRouter } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import { getPatientById, updatePatient } from "@/services/patientService";

import { uploadPatientPhoto } from "@/services/patientService";

import toast from "react-hot-toast";

import { FaArrowLeft, FaSave } from "react-icons/fa";

export default function EditPatientPage() {
  const router = useRouter();

  const { id } = useParams();

  /* ===========================
        Sidebar
  =========================== */

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ===========================
        Loading
  =========================== */

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  /* ===========================
        Form
  =========================== */

  const [formData, setFormData] = useState({
    fullName: "",

    age: "",

    gender: "Female",

    mobile: "",

    email: "",

    aadhaar: "",

    bloodGroup: "",

    height: "",

    weight: "",

    address: "",

    state: "",

    district: "",

    village: "",

    pincode: "",

    pregnancyWeek: "",

    trimester: "1st Trimester",

    riskLevel: "Low",

    status: "Active",

    emergencyPhone: "",

    doctorRemarks: "",
  });

  /* ===========================
      Patient Photo
=========================== */

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [photoPreview, setPhotoPreview] = useState("");

  /* ===========================
        Load Patient
  =========================== */

  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id]);

  const fetchPatient = async () => {
    try {
      const response = await getPatientById(id);

      const patient = response.data.patient;

      setFormData({
        fullName: patient.fullName ?? "",
        age: patient.age ?? "",
        gender: patient.gender ?? "Female",
        mobile: patient.mobile ?? "",
        email: patient.email ?? "",
        aadhaar: patient.aadhaar ?? "",
        bloodGroup: patient.bloodGroup ?? "",
        height: patient.height ?? "",
        weight: patient.weight ?? "",
        address: patient.address ?? "",
        state: patient.state ?? "",
        district: patient.district ?? "",
        village: patient.village ?? "",
        pincode: patient.pincode ?? "",
        pregnancyWeek: patient.pregnancyWeek ?? "",
        trimester: patient.trimester ?? "1st Trimester",
        riskLevel: patient.riskLevel ?? "Low",
        status: patient.status ?? "Active",
        emergencyPhone: patient.emergencyPhone ?? "",
        emergencyName: patient.emergencyName ?? "",
        doctorRemarks: patient.doctorRemarks ?? "",
        bloodPressure: patient.bloodPressure ?? "",
        hemoglobin: patient.hemoglobin ?? "",
        bloodSugar: patient.bloodSugar ?? "",
        allergies: patient.allergies ?? "",
        existingDisease: patient.existingDisease ?? "",
        medications: patient.medications ?? "",
      });

      if (patient.patientPhoto) {
        if (patient.patientPhoto.startsWith("http")) {
          // Cloudinary URL
          setPhotoPreview(patient.patientPhoto);
        } else {
          // Local upload URL
          setPhotoPreview(
            `http://localhost:5000/${patient.patientPhoto.replace(/^\/+/, "")}`,
          );
        }
      }
    } catch (error) {
      console.error(error);

      toast.error("Unable to load patient");
    } finally {
      setLoading(false);
    }
  };

  /* ===========================
        Input Change
  =========================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  /* ===========================
      Select Patient Photo
=========================== */

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedPhoto(file);

    setPhotoPreview(URL.createObjectURL(file));
  };

  /* ===========================
        Update Patient
  =========================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      let data = {
        ...formData,
      };

      if (selectedPhoto) {
        const uploadResponse = await uploadPatientPhoto(id, selectedPhoto);

        formData.patientPhoto = uploadResponse.imageUrl;
      }

      await updatePatient(id, formData);
      toast.success("Patient Updated Successfully");

      router.push(`/patients/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setSaving(false);
    }
  };

  /* ===========================
        Loading Screen
  =========================== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="w-14 h-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 flex overflow-hidden">
      {/* ===========================
            Sidebar
      =========================== */}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* ===========================
            Main Content
      =========================== */}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}

        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* ===========================
              Page Content
        =========================== */}

        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          {/* ===========================
                Header
          =========================== */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-pink-600">
                Edit Patient
              </h1>

              <p className="text-gray-500 mt-2">Update patient information.</p>
            </div>

            <button
              onClick={() => router.back()}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                bg-white
                text-pink-600
                border
                border-pink-300
                px-6
                py-3
                rounded-xl
                hover:bg-pink-100
                transition
              "
            >
              <FaArrowLeft />
              Back
            </button>
          </div>

          {/* ===========================
                Form
          =========================== */}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ===========================
                  Personal Information
            =========================== */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Patient Photo
              </h2>

              <div className="flex flex-col items-center gap-6">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-pink-200 bg-pink-50">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Patient"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      👤
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {/* Full Name */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Age */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Gender */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="Female">Female</option>

                    <option value="Male">Male</option>

                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Mobile */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Email */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Aadhaar */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Aadhaar Number
                  </label>

                  <input
                    type="text"
                    name="aadhaar"
                    value={formData.aadhaar}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Blood Group */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Blood Group
                  </label>

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="">Select Blood Group</option>

                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                {/* Height */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Height (cm)
                  </label>

                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Weight */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Weight (kg)
                  </label>

                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>
            </div>

            {/* ===========================
                  Address Information
            =========================== */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Address Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {/* Address */}

                <div className="xl:col-span-3">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border rounded-xl p-3 outline-none resize-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* State */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* District */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    District
                  </label>

                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Village */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Village
                  </label>

                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* PIN Code */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    PIN Code
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>
            </div>

            {/* ===========================
                  Pregnancy Information
            =========================== */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Pregnancy Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {/* Pregnancy Week */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Pregnancy Week
                  </label>

                  <input
                    type="number"
                    name="pregnancyWeek"
                    value={formData.pregnancyWeek}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Trimester */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Trimester
                  </label>

                  <select
                    name="trimester"
                    value={formData.trimester}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="1st Trimester">1st Trimester</option>

                    <option value="2nd Trimester">2nd Trimester</option>

                    <option value="3rd Trimester">3rd Trimester</option>
                  </select>
                </div>

                {/* Risk Level */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Risk Level
                  </label>

                  <select
                    name="riskLevel"
                    value={formData.riskLevel}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="Low">Low</option>

                    <option value="Medium">Medium</option>

                    <option value="High">High</option>
                  </select>
                </div>

                {/* Status */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="Active">Active</option>

                    <option value="Delivered">Delivered</option>

                    <option value="Transferred">Transferred</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ===========================
                  Medical Information
            =========================== */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Medical Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {/* Blood Pressure */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Blood Pressure
                  </label>

                  <input
                    type="text"
                    name="bloodPressure"
                    value={formData.bloodPressure || ""}
                    onChange={handleChange}
                    placeholder="120/80"
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Hemoglobin */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Hemoglobin (g/dL)
                  </label>

                  <input
                    type="number"
                    step="0.1"
                    name="hemoglobin"
                    value={formData.hemoglobin || ""}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Blood Sugar */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Blood Sugar
                  </label>

                  <input
                    type="number"
                    name="bloodSugar"
                    value={formData.bloodSugar || ""}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Allergies */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Allergies
                  </label>

                  <input
                    type="text"
                    name="allergies"
                    value={formData.allergies || ""}
                    onChange={handleChange}
                    placeholder="None"
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Existing Disease */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Existing Disease
                  </label>

                  <input
                    type="text"
                    name="existingDisease"
                    value={formData.existingDisease || ""}
                    onChange={handleChange}
                    placeholder="None"
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Medications */}

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Medications
                  </label>

                  <input
                    type="text"
                    name="medications"
                    value={formData.medications || ""}
                    onChange={handleChange}
                    placeholder="Current Medicines"
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>
            </div>

            {/* ===========================
                  Emergency Contact
            =========================== */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Emergency Contact
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Contact Name
                  </label>

                  <input
                    type="text"
                    name="emergencyName"
                    value={formData.emergencyName || ""}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Contact Number
                  </label>

                  <input
                    type="text"
                    name="emergencyPhone"
                    value={formData.emergencyPhone || ""}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>
            </div>

            {/* ===========================
                  Doctor Remarks
            =========================== */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Doctor Remarks
              </h2>

              <textarea
                name="doctorRemarks"
                value={formData.doctorRemarks || ""}
                onChange={handleChange}
                rows={6}
                placeholder="Enter doctor's remarks..."
                className="w-full border rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* ===========================
                  Action Buttons
            =========================== */}

            <div className="flex flex-col sm:flex-row justify-end gap-4">
              {/* Cancel Button */}

              <button
                type="button"
                onClick={() => router.back()}
                className="
                  px-6
                  py-3
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  hover:bg-gray-100
                  transition
                  font-semibold
                "
              >
                Cancel
              </button>

              {/* Save Button */}

              <button
                type="submit"
                disabled={saving}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-pink-600
                  hover:bg-pink-700
                  text-white
                  px-8
                  py-3
                  rounded-xl
                  font-semibold
                  shadow-lg
                  transition
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                <FaSave />

                {saving ? "Updating Patient..." : "Save Changes"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
