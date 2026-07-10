import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    /* ===========================
       Patient
    =========================== */

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    /* ===========================
       Appointment Details
    =========================== */

    appointmentDate: {
      type: Date,
      required: true,
    },

    appointmentTime: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      default: "",
    },

    doctorName: {
      type: String,
      default: "",
    },

    hospitalName: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      default: "Obstetrics & Gynecology",
    },

    /* ===========================
       Status
    =========================== */

    status: {
      type: String,
      enum: [
        "Upcoming",
        "Completed",
        "Cancelled",
        "Missed",
      ],
      default: "Upcoming",
    },

    /* ===========================
       Visit Notes
    =========================== */

    notes: {
      type: String,
      default: "",
    },

    prescription: {
      type: String,
      default: "",
    },

    followUpDate: {
      type: Date,
    },

    /* ===========================
       Created By
    =========================== */

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model(
  "Appointment",
  appointmentSchema
);

export default Appointment;