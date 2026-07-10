import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import AncVisit from "../models/AncVisit.js";
import Medicine from "../models/Medicine.js";
import Delivery from "../models/Delivery.js";

/* =====================================================
   Global Search
   GET /api/search?q=...
===================================================== */

export const globalSearch = async (req, res) => {
  try {

    const query = req.query.q?.trim();

    if (!query) {
      return res.status(200).json({
        success: true,
        results: {
          patients: [],
          appointments: [],
          ancVisits: [],
          medicines: [],
          deliveries: [],
        },
      });
    }

    const regex = new RegExp(query, "i");

    /* ===========================
       Patients
    =========================== */

    const patients = await Patient.find({
      createdBy: req.user._id,
      $or: [
        { fullName: regex },
        { mobile: regex },
      ],
    });

    /* ===========================
       Appointments
    =========================== */

    const appointments = await Appointment.find({
      createdBy: req.user._id,
    }).populate("patient", "fullName mobile");

    const filteredAppointments =
      appointments.filter((item) =>
        item.patient?.fullName?.match(regex)
      );

    /* ===========================
       ANC Visits
    =========================== */

    const ancVisits = await AncVisit.find({
      createdBy: req.user._id,
    }).populate("patient", "fullName");

    const filteredAncVisits =
      ancVisits.filter((item) =>
        item.patient?.fullName?.match(regex)
      );

    /* ===========================
       Medicines
    =========================== */

    const medicines = await Medicine.find({
      createdBy: req.user._id,
    }).populate("patient", "fullName");

    const filteredMedicines =
      medicines.filter((item) =>
        item.patient?.fullName?.match(regex)
      );

    /* ===========================
       Deliveries
    =========================== */

    const deliveries = await Delivery.find({
      createdBy: req.user._id,
    }).populate("patient", "fullName");

    const filteredDeliveries =
      deliveries.filter((item) =>
        item.patient?.fullName?.match(regex)
      );

    res.status(200).json({
      success: true,
      results: {
        patients,
        appointments: filteredAppointments,
        ancVisits: filteredAncVisits,
        medicines: filteredMedicines,
        deliveries: filteredDeliveries,
      },
    });

  } catch (error) {

    console.error("Search Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};