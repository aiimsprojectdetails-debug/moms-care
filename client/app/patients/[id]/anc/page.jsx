"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import AncVisitForm from "@/components/anc/AncVisitForm";
import AncVisitTable from "@/components/anc/AncVisitTable";

import { getAncVisits, deleteAncVisit } from "@/services/ancVisitService";

export default function AncPage() {
  const { id } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [visits, setVisits] = useState([]);

  const [editVisit, setEditVisit] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      setLoading(true);

      const res = await getAncVisits(id);

      setVisits(res.data.visits || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (visitId) => {
    const confirmDelete = window.confirm("Delete this ANC Visit?");

    if (!confirmDelete) return;

    try {
      await deleteAncVisit(visitId);

      alert("ANC Visit Deleted");

      fetchVisits();
    } catch (error) {
      console.error(error);

      alert("Failed to delete ANC Visit");
    }
  };

  const handleEdit = (visit) => {
    setEditVisit(visit);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-pink-50 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-pink-600">
                ANC Visit Management
              </h1>

              <p className="text-gray-500 mt-2">
                Track all antenatal care visits for this patient.
              </p>
            </div>

            <Link
              href={`/patients/${id}`}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-xl"
            >
              Back to Patient
            </Link>
          </div>

          <AncVisitForm
            patientId={id}
            editVisit={editVisit}
            onSuccess={() => {
              fetchVisits();
              setEditVisit(null);
            }}
          />

          <div className="mt-10">
            {loading ? (
              <div className="text-center py-10">Loading ANC Visits...</div>
            ) : (
              <AncVisitTable
                visits={visits}
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
