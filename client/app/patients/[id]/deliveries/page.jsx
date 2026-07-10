"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import DeliveryForm from "@/components/delivery/DeliveryForm";
import DeliveryTable from "@/components/delivery/DeliveryTable";

import {
  getDeliveries,
  deleteDelivery,
} from "@/services/deliveryService";

export default function DeliveryPage() {
  const { id } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [deliveries, setDeliveries] = useState([]);

  const [editDelivery, setEditDelivery] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);

      const res = await getDeliveries(id);

      setDeliveries(res.data.deliveries || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (deliveryId) => {
    const confirmDelete = window.confirm(
      "Delete this delivery record?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDelivery(deliveryId);

      alert("Delivery Deleted Successfully");

      fetchDeliveries();
    } catch (error) {
      console.error(error);

      alert("Unable to delete delivery.");
    }
  };

  const handleEdit = (delivery) => {
    setEditDelivery(delivery);

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
                Delivery Management
              </h1>

              <p className="text-gray-500 mt-2">
                Manage patient delivery records.
              </p>

            </div>

            <Link
              href={`/patients/${id}`}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-xl"
            >
              Back to Patient
            </Link>

          </div>

          <DeliveryForm
            patientId={id}
            editDelivery={editDelivery}
            onSuccess={() => {
              fetchDeliveries();
              setEditDelivery(null);
            }}
          />

          <div className="mt-10">

            {loading ? (

              <div className="text-center py-10">
                Loading Delivery Records...
              </div>

            ) : (

              <DeliveryTable
                deliveries={deliveries}
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