import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    /* ===========================
       Patient Relationship
    =========================== */

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    /* ===========================
       Medicine Details
    =========================== */

    medicineName: {
      type: String,
      required: [true, "Medicine name is required"],
      trim: true,
    },

    medicineType: {
      type: String,
      enum: [
        "Tablet",
        "Capsule",
        "Syrup",
        "Injection",
        "Drops",
        "Powder",
        "Other",
      ],
      default: "Tablet",
    },

    dosage: {
      type: String,
      required: true,
      default: "",
    },

    frequency: {
      type: String,
      enum: [
        "Once Daily",
        "Twice Daily",
        "Three Times Daily",
        "Weekly",
        "Monthly",
        "As Needed",
      ],
      default: "Once Daily",
    },

    /* ===========================
       Schedule
    =========================== */

    morning: {
      type: Boolean,
      default: false,
    },

    afternoon: {
      type: Boolean,
      default: false,
    },

    evening: {
      type: Boolean,
      default: false,
    },

    night: {
      type: Boolean,
      default: false,
    },

    beforeFood: {
      type: Boolean,
      default: false,
    },

    afterFood: {
      type: Boolean,
      default: true,
    },

    /* ===========================
       Duration
    =========================== */

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    durationDays: {
      type: Number,
      default: 0,
    },

    /* ===========================
       Purpose
    =========================== */

    purpose: {
      type: String,
      default: "",
    },

    prescribedBy: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    /* ===========================
       Status
    =========================== */

    status: {
      type: String,
      enum: [
        "Ongoing",
        "Completed",
        "Stopped",
      ],
      default: "Ongoing",
    },

    /* ===========================
       User Relationship
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

const Medicine = mongoose.model(
  "Medicine",
  medicineSchema
);

export default Medicine;