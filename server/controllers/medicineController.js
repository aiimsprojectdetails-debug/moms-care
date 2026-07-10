import Medicine from "../models/Medicine.js";
import Patient from "../models/Patient.js";

/* =====================================================
   Create Medicine
   POST /api/medicines/:patientId
===================================================== */

export const createMedicine = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    const medicine = await Medicine.create({
      ...req.body,
      patient: patientId,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Medicine added successfully.",
      medicine,
    });

  } catch (error) {

    console.error("Create Medicine Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* =====================================================
   Get All Medicines
   GET /api/medicines/:patientId
===================================================== */

export const getMedicines = async (req, res) => {
  try {

    const { patientId } = req.params;

    const medicines = await Medicine.find({
      patient: patientId,
      createdBy: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      totalMedicines: medicines.length,
      medicines,
    });

  } catch (error) {

    console.error("Get Medicines Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* =====================================================
   Get Single Medicine
   GET /api/medicines/details/:id
===================================================== */

export const getMedicineById = async (req, res) => {
  try {

    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found.",
      });
    }

    res.status(200).json({
      success: true,
      medicine,
    });

  } catch (error) {

    console.error("Get Medicine Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* =====================================================
   Update Medicine
   PUT /api/medicines/details/:id
===================================================== */

export const updateMedicine = async (req, res) => {
  try {

    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found.",
      });
    }

    Object.assign(medicine, req.body);

    await medicine.save();

    res.status(200).json({
      success: true,
      message: "Medicine updated successfully.",
      medicine,
    });

  } catch (error) {

    console.error("Update Medicine Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* =====================================================
   Delete Medicine
   DELETE /api/medicines/details/:id
===================================================== */

export const deleteMedicine = async (req, res) => {
  try {

    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found.",
      });
    }

    await Medicine.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully.",
    });

  } catch (error) {

    console.error("Delete Medicine Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



/* =====================================================
   Get All Medicines
   GET /api/medicines
===================================================== */

export const getAllMedicines = async (req, res) => {
  try {

    const medicines = await Medicine.find({
      createdBy: req.user._id,
    })
      .populate(
        "patient",
        "fullName mobile"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      medicines,
    });

  } catch (error) {

    console.error("Get All Medicines Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};