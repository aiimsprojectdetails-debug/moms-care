import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    deliveryDate: {
      type: Date,
      required: true,
    },

    deliveryType: {
      type: String,
      enum: [
        "Normal",
        "C-Section",
        "Assisted",
      ],
      default: "Normal",
    },

    hospitalName: {
      type: String,
      default: "",
    },

    doctorName: {
      type: String,
      default: "",
    },

    babyGender: {
      type: String,
      enum: [
        "Male",
        "Female",
        "Other",
      ],
      default: "Male",
    },

    babyWeight: {
      type: Number,
      default: 0,
    },

    babyCondition: {
      type: String,
      enum: [
        "Healthy",
        "NICU",
        "Critical",
      ],
      default: "Healthy",
    },

    motherCondition: {
      type: String,
      enum: [
        "Stable",
        "Critical",
      ],
      default: "Stable",
    },

    deliveryNotes: {
      type: String,
      default: "",
    },

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

const Delivery = mongoose.model(
  "Delivery",
  deliverySchema
);

export default Delivery;