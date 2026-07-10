import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    // Project Information

    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Industrial Project",
        "Startup Project",
        "Research Project",
        "SEEG Grant",
      ],
      required: true,
    },

    // Principal Investigator / Mentor

    mentor: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      default: "",
    },

    // Hospital Information

    hospitalName: {
      type: String,
      default: "",
    },

    // Funding

    fundingAgency: {
      type: String,
      default: "",
    },

    fundingAmount: {
      type: Number,
      default: 0,
    },

    // Duration

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    // Status

    status: {
      type: String,
      enum: [
        "Planning",
        "Ongoing",
        "Completed",
        "Cancelled",
      ],
      default: "Planning",
    },

    // Priority

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    // Team Members

    members: [
      {
        name: String,
        designation: String,
        email: String,
      },
    ],

    // Assigned Patients

    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],

    // Project Image

    projectImage: {
      type: String,
      default: "",
    },

    // Documents

    documents: [
      {
        fileName: String,
        fileUrl: String,
      },
    ],

    // Created By

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

const Project = mongoose.model("Project", projectSchema);

export default Project;