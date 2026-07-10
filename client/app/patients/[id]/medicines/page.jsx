"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import MedicineForm from "@/components/medicine/MedicineForm";
import MedicineTable from "@/components/medicine/MedicineTable";

import {
  getMedicines,
  deleteMedicine,
} from "@/services/medicineService";

export default function MedicinePage() {
  const { id } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [medicines, setMedicines] = useState([]);

  const [editMedicine, setEditMedicine] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);

      const res = await getMedicines(id);

      setMedicines(res.data.medicines || []);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async (medicineId) => {

    const confirmDelete = window.confirm(
      "Delete this medicine?"
    );

    if (!confirmDelete) return;

    try {

      await deleteMedicine(medicineId);

      alert("Medicine Deleted Successfully");

      fetchMedicines();

    } catch (error) {

      console.error(error);

      alert("Unable to delete medicine.");

    }
  };

  const handleEdit = (medicine) => {

    setEditMedicine(medicine);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  return (
    <div className="min-h-screen bg-pink-50 flex">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-8">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h1 className="text-4xl font-bold text-pink-600">
                Medicine Management
              </h1>

              <p className="text-gray-500 mt-2">
                Manage patient medicines and prescriptions.
              </p>

            </div>

            <Link
              href={`/patients/${id}`}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-xl"
            >
              Back to Patient
            </Link>

          </div>

          <MedicineForm
            patientId={id}
            editMedicine={editMedicine}
            onSuccess={() => {

              fetchMedicines();

              setEditMedicine(null);

            }}
          />

          <div className="mt-10">

            {loading ? (

              <div className="text-center py-10">

                Loading Medicines...

              </div>

            ) : (

              <MedicineTable
                medicines={medicines}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />

            )}

          </div>

        </main>

      </div>

    </div>
  );
}