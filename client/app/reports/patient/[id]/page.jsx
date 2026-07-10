"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";

import PatientReport from "@/components/reports/PatientReport";

import { getPatientById } from "@/services/patientService";
import { getAncVisits } from "@/services/ancVisitService";
import { getAppointments } from "@/services/appointmentService";
import { getMedicines } from "@/services/medicineService";
import { getDeliveries } from "@/services/deliveryService";

export default function PatientReportPage() {

  const { id } = useParams();

  const reportRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const [patient, setPatient] = useState(null);

  const [ancVisits, setAncVisits] = useState([]);

  const [appointments, setAppointments] = useState([]);

  const [medicines, setMedicines] = useState([]);

  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {

      setLoading(true);

      const patientRes = await getPatientById(id);
      setPatient(patientRes.data.patient);

      const ancRes = await getAncVisits(id);
      setAncVisits(ancRes.data.visits || []);

      const appointmentRes = await getAppointments(id);
      setAppointments(
        appointmentRes.data.appointments || []
      );

      const medicineRes = await getMedicines(id);
      setMedicines(
        medicineRes.data.medicines || []
      );

      const deliveryRes = await getDeliveries(id);
      setDeliveries(
        deliveryRes.data.deliveries || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: `Patient_Report_${patient?.fullName || "Report"}`,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Report...
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

        <PatientReport
          patient={patient}
          ancVisits={ancVisits}
          appointments={appointments}
          medicines={medicines}
          deliveries={deliveries}
        />

      </div>

    </div>

  );
}