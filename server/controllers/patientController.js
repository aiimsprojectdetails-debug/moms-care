import Patient from "../models/Patient.js";
import Project from "../models/Project.js";

/* =====================================================
   Create Patient
   POST /api/patients
===================================================== */

export const createPatient = async (req, res) => {
  try {
    const {
      fullName,
      age,
      gender,
      mobile,
      email,
      aadhaar,
      husbandName,
      bloodGroup,
      height,
      weight,
      bmi,
      occupation,

      state,
      district,
      village,
      pincode,

      hospitalName,
      hospitalPatientId,
      doctorName,

      pregnancyNumber,
      trimester,
      lmp,
      expectedDeliveryDate,
      pregnancyWeek,
      riskLevel,

      bloodPressure,
      hemoglobin,
      bloodSugar,
      allergies,
      existingDisease,
      previousPregnancies,
      previousDeliveries,
      miscarriage,
      surgeries,
      medications,
      vaccinations,
      familyHistory,

      emergencyName,
      emergencyPhone,

      patientPhoto,
      aadhaarFile,
      bloodReport,
      ultrasound,

      doctorRemarks,

      project,
    } = req.body;

    /* -----------------------------
       Validation
    ------------------------------ */

    if (!fullName || !age || !mobile || !aadhaar) {
      return res.status(400).json({
        success: false,
        message: "Full Name, Age, Mobile and Aadhaar are required.",
      });
    }

    /* -----------------------------
       Duplicate Mobile
    ------------------------------ */

    const mobileExists = await Patient.findOne({
      mobile,
    });

    if (mobileExists) {
      return res.status(400).json({
        success: false,
        message: "Mobile number already registered.",
      });
    }

    /* -----------------------------
       Duplicate Aadhaar
    ------------------------------ */

    const aadhaarExists = await Patient.findOne({
      aadhaar,
    });

    if (aadhaarExists) {
      return res.status(400).json({
        success: false,
        message: "Aadhaar already registered.",
      });
    }

    /* -----------------------------
       Create Patient
    ------------------------------ */

    const patient = await Patient.create({
      fullName,
      age,
      gender,
      mobile,
      email,
      aadhaar,
      husbandName,
      bloodGroup,
      height,
      weight,
      bmi,
      occupation,

      state,
      district,
      village,
      pincode,

      hospitalName,
      hospitalPatientId,
      doctorName,

      pregnancyNumber,
      trimester,
      lmp,
      expectedDeliveryDate,
      pregnancyWeek,
      riskLevel,

      bloodPressure,
      hemoglobin,
      bloodSugar,
      allergies,
      existingDisease,
      previousPregnancies,
      previousDeliveries,
      miscarriage,
      surgeries,
      medications,
      vaccinations,
      familyHistory,

      emergencyName,
      emergencyPhone,

      patientPhoto,
      aadhaarFile,
      bloodReport,
      ultrasound,

      doctorRemarks,

      project,

      createdBy: req.user._id,
    });

    /* -----------------------------
       Link Patient to Project
    ------------------------------ */

    if (project) {
      await Project.findByIdAndUpdate(project, {
        $addToSet: {
          patients: patient._id,
        },
      });
    }

    return res.status(201).json({
      success: true,
      message: "Patient registered successfully.",
      patient,
    });
  } catch (error) {
    console.error("Create Patient Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Get All Patients
   GET /api/patients
===================================================== */

export const getPatients = async (req, res) => {
  try {
    const { search, trimester, riskLevel, status, project } = req.query;

    // Build Filter
    const filter = {
      createdBy: req.user._id,
    };

    // Search by Name, Mobile, Aadhaar
    if (search) {
      filter.$or = [
        {
          fullName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          mobile: {
            $regex: search,
            $options: "i",
          },
        },
        {
          aadhaar: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Trimester Filter
    if (trimester) {
      filter.trimester = trimester;
    }

    // Risk Filter
    if (riskLevel) {
      filter.riskLevel = riskLevel;
    }

    // Status Filter
    if (status) {
      filter.status = status;
    }

    // Project Filter
    if (project) {
      filter.project = project;
    }

    const patients = await Patient.find(filter)
      .populate(
        "project",
        "title category hospitalName hospitalId mentor status",
      )
      .populate("createdBy", "fullName email")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      totalPatients: patients.length,
      patients,
    });
  } catch (error) {
    console.error("Get Patients Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Get Patient By ID
   GET /api/patients/:id
===================================================== */

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate("project")
      .populate("createdBy", "fullName email");

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    // Security Check
    if (patient.createdBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    return res.status(200).json({
      success: true,
      patient,
    });
  } catch (error) {
    console.error("Get Patient Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Update Patient
   PUT /api/patients/:id
===================================================== */

export const updatePatient = async (req, res) => {
  console.log("========== UPDATE PATIENT ==========");
  console.log("Patient ID:", req.params.id);
  console.log("Request Body:");
  console.log(req.body);
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    // Check Ownership
    if (patient.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    const oldProject = patient.project?.toString();

    // Update Patient Fields
    patient.fullName = req.body.fullName ?? patient.fullName;

    patient.age = req.body.age ?? patient.age;

    patient.gender = req.body.gender ?? patient.gender;

    patient.mobile = req.body.mobile ?? patient.mobile;

    patient.email = req.body.email ?? patient.email;

    patient.aadhaar = req.body.aadhaar ?? patient.aadhaar;

    patient.husbandName = req.body.husbandName ?? patient.husbandName;

    patient.bloodGroup = req.body.bloodGroup ?? patient.bloodGroup;

    patient.height = req.body.height ?? patient.height;

    patient.weight = req.body.weight ?? patient.weight;

    patient.bmi = req.body.bmi ?? patient.bmi;

    patient.occupation = req.body.occupation ?? patient.occupation;

    // Address

    patient.state = req.body.state ?? patient.state;

    patient.district = req.body.district ?? patient.district;

    patient.village = req.body.village ?? patient.village;

    patient.pincode = req.body.pincode ?? patient.pincode;

    // Hospital

    patient.hospitalName = req.body.hospitalName ?? patient.hospitalName;

    patient.hospitalPatientId =
      req.body.hospitalPatientId ?? patient.hospitalPatientId;

    patient.doctorName = req.body.doctorName ?? patient.doctorName;

    // Pregnancy

    patient.pregnancyNumber =
      req.body.pregnancyNumber ?? patient.pregnancyNumber;

    patient.trimester = req.body.trimester ?? patient.trimester;

    patient.lmp = req.body.lmp ?? patient.lmp;

    patient.expectedDeliveryDate =
      req.body.expectedDeliveryDate ?? patient.expectedDeliveryDate;

    patient.pregnancyWeek = req.body.pregnancyWeek ?? patient.pregnancyWeek;

    patient.riskLevel = req.body.riskLevel ?? patient.riskLevel;

    // Medical

    patient.bloodPressure = req.body.bloodPressure ?? patient.bloodPressure;

    patient.hemoglobin = req.body.hemoglobin ?? patient.hemoglobin;

    patient.bloodSugar = req.body.bloodSugar ?? patient.bloodSugar;

    patient.allergies = req.body.allergies ?? patient.allergies;

    patient.existingDisease =
      req.body.existingDisease ?? patient.existingDisease;

    patient.previousPregnancies =
      req.body.previousPregnancies ?? patient.previousPregnancies;

    patient.previousDeliveries =
      req.body.previousDeliveries ?? patient.previousDeliveries;

    patient.miscarriage = req.body.miscarriage ?? patient.miscarriage;

    patient.surgeries = req.body.surgeries ?? patient.surgeries;

    patient.medications = req.body.medications ?? patient.medications;

    patient.vaccinations = req.body.vaccinations ?? patient.vaccinations;

    patient.familyHistory = req.body.familyHistory ?? patient.familyHistory;

    // Emergency Contact

    patient.emergencyName = req.body.emergencyName ?? patient.emergencyName;

    patient.emergencyPhone = req.body.emergencyPhone ?? patient.emergencyPhone;

    // Documents

    patient.patientPhoto = req.body.patientPhoto ?? patient.patientPhoto;

    patient.aadhaarFile = req.body.aadhaarFile ?? patient.aadhaarFile;

    patient.bloodReport = req.body.bloodReport ?? patient.bloodReport;

    patient.ultrasound = req.body.ultrasound ?? patient.ultrasound;

    // Appointment

    patient.nextAppointment =
      req.body.nextAppointment ?? patient.nextAppointment;

    patient.appointmentStatus =
      req.body.appointmentStatus ?? patient.appointmentStatus;

    // Doctor Notes

    patient.doctorRemarks = req.body.doctorRemarks ?? patient.doctorRemarks;

    patient.status = req.body.status ?? patient.status;

    // Project

    if (req.body.project) {
      patient.project = req.body.project;
    }

    await patient.save();

    // Update Project Relationship
    if (req.body.project && oldProject !== req.body.project) {
      if (oldProject) {
        await Project.findByIdAndUpdate(oldProject, {
          $pull: {
            patients: patient._id,
          },
        });
      }

      await Project.findByIdAndUpdate(req.body.project, {
        $addToSet: {
          patients: patient._id,
        },
      });
    }

    const updatedPatient = await Patient.findById(patient._id)
      .populate("project")
      .populate("createdBy", "fullName email");

    return res.status(200).json({
      success: true,
      message: "Patient updated successfully.",
      patient: updatedPatient,
    });
  } catch (error) {
    console.error("Update Patient Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Delete Patient
   DELETE /api/patients/:id
===================================================== */

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    // Authorization Check
    if (patient.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    // Remove Patient From Project
    if (patient.project) {
      await Project.findByIdAndUpdate(patient.project, {
        $pull: {
          patients: patient._id,
        },
      });
    }

    // Delete Patient
    await Patient.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Patient deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Patient Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Search Patients
   GET /api/patients/search
===================================================== */

export const searchPatients = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const patients = await Patient.find({
      createdBy: req.user._id,

      $or: [
        {
          fullName: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          mobile: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          aadhaar: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          husbandName: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          hospitalName: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    })
      .populate("project", "title category")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,

      totalPatients: patients.length,

      patients,
    });
  } catch (error) {
    console.error("Search Patient Error:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

/* =====================================================
   Patient Statistics
   GET /api/patients/statistics
===================================================== */

export const patientStatistics = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalPatients = await Patient.countDocuments({
      createdBy: userId,
    });

    const activePatients = await Patient.countDocuments({
      createdBy: userId,
      status: "Active",
    });

    const deliveredPatients = await Patient.countDocuments({
      createdBy: userId,
      status: "Delivered",
    });

    const transferredPatients = await Patient.countDocuments({
      createdBy: userId,
      status: "Transferred",
    });

    const firstTrimester = await Patient.countDocuments({
      createdBy: userId,
      trimester: "1st Trimester",
    });

    const secondTrimester = await Patient.countDocuments({
      createdBy: userId,
      trimester: "2nd Trimester",
    });

    const thirdTrimester = await Patient.countDocuments({
      createdBy: userId,
      trimester: "3rd Trimester",
    });

    const lowRisk = await Patient.countDocuments({
      createdBy: userId,
      riskLevel: "Low",
    });

    const mediumRisk = await Patient.countDocuments({
      createdBy: userId,
      riskLevel: "Medium",
    });

    const highRisk = await Patient.countDocuments({
      createdBy: userId,
      riskLevel: "High",
    });

    res.status(200).json({
      success: true,

      statistics: {
        totalPatients,

        activePatients,

        deliveredPatients,

        transferredPatients,

        trimester: {
          first: firstTrimester,

          second: secondTrimester,

          third: thirdTrimester,
        },

        risk: {
          low: lowRisk,

          medium: mediumRisk,

          high: highRisk,
        },
      },
    });
  } catch (error) {
    console.error("Patient Statistics Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Upcoming Appointments
   GET /api/patients/upcoming-appointments
===================================================== */

export const upcomingAppointments = async (req, res) => {
  try {
    const today = new Date();

    const appointments = await Patient.find({
      createdBy: req.user._id,

      nextAppointment: {
        $gte: today,
      },

      appointmentStatus: "Upcoming",
    })
      .select("fullName mobile doctorName nextAppointment hospitalName")
      .sort({
        nextAppointment: 1,
      });

    res.status(200).json({
      success: true,

      totalAppointments: appointments.length,

      appointments,
    });
  } catch (error) {
    console.error("Upcoming Appointment Error:", error);

    res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

/* =====================================================
   High Risk Patients
   GET /api/patients/high-risk
===================================================== */

export const highRiskPatients = async (req, res) => {
  try {
    const patients = await Patient.find({
      createdBy: req.user._id,

      riskLevel: "High",

      status: "Active",
    })
      .populate("project", "title")
      .sort({
        pregnancyWeek: -1,
      });

    res.status(200).json({
      success: true,

      totalPatients: patients.length,

      patients,
    });
  } catch (error) {
    console.error("High Risk Patient Error:", error);

    res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};
