import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    /* ----------------------------
       Personal Information
    ----------------------------- */

    fullName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      default: "Female",
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      default: "",
    },

    aadhaar: {
      type: String,
      required: true,
      unique: true,
    },

    husbandName: {
      type: String,
      default: "",
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    height: {
      type: Number,
      default: 0,
    },

    weight: {
      type: Number,
      default: 0,
    },

    bmi: {
      type: Number,
      default: 0,
    },

    occupation: {
      type: String,
      default: "",
    },

    /* ----------------------------
   Address
----------------------------- */

    address: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    district: {
      type: String,
      default: "",
    },

    village: {
      type: String,
      default: "",
    },

    pincode: {
      type: String,
      default: "",
    },

    /* ----------------------------
       Hospital
    ----------------------------- */

    hospitalName: {
      type: String,
      default: "",
    },

    hospitalPatientId: {
      type: String,
      default: "",
    },

    doctorName: {
      type: String,
      default: "",
    },

    registrationDate: {
      type: Date,
      default: Date.now,
    },

    /* ----------------------------
       Pregnancy
    ----------------------------- */

    pregnancyNumber: {
      type: Number,
      default: 1,
    },

    trimester: {
      type: String,
      enum: ["1st Trimester", "2nd Trimester", "3rd Trimester"],
      default: "1st Trimester",
    },

    lmp: Date,

    expectedDeliveryDate: Date,

    pregnancyWeek: {
      type: Number,
      default: 0,
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    /* ----------------------------
       Medical
    ----------------------------- */

    bloodPressure: {
      type: String,
      default: "",
    },

    hemoglobin: {
      type: Number,
      default: 0,
    },

    bloodSugar: {
      type: Number,
      default: 0,
    },

    allergies: {
      type: String,
      default: "",
    },

    existingDisease: {
      type: String,
      default: "",
    },

    previousPregnancies: {
      type: Number,
      default: 0,
    },

    previousDeliveries: {
      type: Number,
      default: 0,
    },

    miscarriage: {
      type: Number,
      default: 0,
    },

    surgeries: {
      type: String,
      default: "",
    },

    medications: {
      type: String,
      default: "",
    },

    vaccinations: {
      type: String,
      default: "",
    },

    familyHistory: {
      type: String,
      default: "",
    },

    /* ----------------------------
       Emergency Contact
    ----------------------------- */

    emergencyName: {
      type: String,
      default: "",
    },

    emergencyPhone: {
      type: String,
      default: "",
    },

    /* ----------------------------
       Documents
    ----------------------------- */

    patientPhoto: {
      type: String,
      default: "",
    },

    aadhaarFile: {
      type: String,
      default: "",
    },

    bloodReport: {
      type: String,
      default: "",
    },

    ultrasound: {
      type: String,
      default: "",
    },

    reports: [
      {
        title: String,
        fileUrl: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    /* ----------------------------
       Appointment
    ----------------------------- */

    nextAppointment: Date,

    appointmentStatus: {
      type: String,
      enum: ["Upcoming", "Completed", "Cancelled"],
      default: "Upcoming",
    },

    /* ----------------------------
       Doctor Notes
    ----------------------------- */

    doctorRemarks: {
      type: String,
      default: "",
    },

    /* ----------------------------
       Relationships
    ----------------------------- */

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project is required"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    /* ----------------------------
       Status
    ----------------------------- */

    status: {
      type: String,
      enum: ["Active", "Delivered", "Transferred"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
