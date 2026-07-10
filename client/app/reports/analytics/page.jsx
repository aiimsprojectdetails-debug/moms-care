"use client";

import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import AnalyticsReport from "@/components/reports/AnalyticsReport";

import { getPatients } from "@/services/patientService";
import { getAllAppointments } from "@/services/appointmentService";
import { getAllAncVisits } from "@/services/ancVisitService";
import { getAllDeliveries } from "@/services/deliveryService";
import { getAllMedicines } from "@/services/medicineService";

export default function AnalyticsReportPage() {

  const reportRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [ancVisits, setAncVisits] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      setLoading(true);

      const patientRes = await getPatients();
      setPatients(patientRes.data.patients || []);

      const appointmentRes = await getAllAppointments();
      setAppointments(
        appointmentRes.data.appointments || []
      );

      const ancRes = await getAllAncVisits();
      setAncVisits(
        ancRes.data.visits || []
      );

      const deliveryRes = await getAllDeliveries();
      setDeliveries(
        deliveryRes.data.deliveries || []
      );

      const medicineRes = await getAllMedicines();
      setMedicines(
        medicineRes.data.medicines || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: "Analytics_Report",
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Analytics Report...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto mb-6 flex justify-end">

        <button
          onClick={handlePrint}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Print / Save PDF
        </button>

      </div>

      <div ref={reportRef}>

        <AnalyticsReport
          patients={patients}
          appointments={appointments}
          ancVisits={ancVisits}
          deliveries={deliveries}
          medicines={medicines}
        />

      </div>

    </div>

  );

}