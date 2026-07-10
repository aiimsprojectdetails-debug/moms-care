import mongoose from "mongoose";

const ancVisitSchema = new mongoose.Schema(
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
       Visit Details
    =========================== */

    visitDate: {
      type: Date,
      default: Date.now,
    },

    pregnancyWeek: {
      type: Number,
      required: true,
    },

    trimester: {
      type: String,
      enum: [
        "1st Trimester",
        "2nd Trimester",
        "3rd Trimester",
      ],
      required: true,
    },

    /* ===========================
       Vital Signs
    =========================== */

    weight: {
      type: Number,
      default: 0,
    },

    height: {
      type: Number,
      default: 0,
    },

    bmi: {
      type: Number,
      default: 0,
    },

    bloodPressure: {
      type: String,
      default: "",
    },

    pulseRate: {
      type: Number,
      default: 0,
    },

    temperature: {
      type: Number,
      default: 0,
    },

    /* ===========================
       Laboratory
    =========================== */

    hemoglobin: {
      type: Number,
      default: 0,
    },

    bloodSugar: {
      type: Number,
      default: 0,
    },

    urineProtein: {
      type: String,
      default: "",
    },

    urineSugar: {
      type: String,
      default: "",
    },

    /* ===========================
       Baby Monitoring
    =========================== */

    fetalHeartRate: {
      type: Number,
      default: 0,
    },

    fetalMovement: {
      type: String,
      default: "",
    },

    fetalPosition: {
      type: String,
      default: "",
    },

    /* ===========================
       Medicines
    =========================== */

    ironTablets: {
      type: Boolean,
      default: false,
    },

    calciumTablets: {
      type: Boolean,
      default: false,
    },

    folicAcid: {
      type: Boolean,
      default: false,
    },

    ttInjection: {
      type: Boolean,
      default: false,
    },

    vitaminD: {
      type: Boolean,
      default: false,
    },

    /* ===========================
       Doctor Notes
    =========================== */

    diagnosis: {
      type: String,
      default: "",
    },

    doctorRemarks: {
      type: String,
      default: "",
    },

    nextVisitDate: {
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

const AncVisit = mongoose.model("AncVisit", ancVisitSchema);

export default AncVisit;