import AncVisit from "../models/AncVisit.js";
import Patient from "../models/Patient.js";

/* =====================================================
   Create ANC Visit
   POST /api/anc/:patientId
===================================================== */

export const createAncVisit = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    const ancVisit = await AncVisit.create({
      ...req.body,
      patient: patientId,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "ANC Visit added successfully.",
      ancVisit,
    });
  } catch (error) {
    console.error("Create ANC Visit Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Get All ANC Visits
   GET /api/anc/:patientId
===================================================== */

export const getAncVisits = async (req, res) => {
  try {
    const { patientId } = req.params;

    const visits = await AncVisit.find({
      patient: patientId,
      createdBy: req.user._id,
    }).sort({
      visitDate: -1,
    });

    res.status(200).json({
      success: true,
      totalVisits: visits.length,
      visits,
    });
  } catch (error) {
    console.error("Get ANC Visits Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Get Single ANC Visit
   GET /api/anc/visit/:id
===================================================== */

export const getAncVisitById = async (req, res) => {
  try {
    const visit = await AncVisit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "ANC Visit not found.",
      });
    }

    res.status(200).json({
      success: true,
      visit,
    });
  } catch (error) {
    console.error("Get ANC Visit Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Update ANC Visit
   PUT /api/anc/visit/:id
===================================================== */

export const updateAncVisit = async (req, res) => {
  try {
    const visit = await AncVisit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "ANC Visit not found.",
      });
    }

    Object.assign(visit, req.body);

    await visit.save();

    res.status(200).json({
      success: true,
      message: "ANC Visit updated successfully.",
      visit,
    });
  } catch (error) {
    console.error("Update ANC Visit Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Delete ANC Visit
   DELETE /api/anc/visit/:id
===================================================== */

export const deleteAncVisit = async (req, res) => {
  try {
    const visit = await AncVisit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "ANC Visit not found.",
      });
    }

    await AncVisit.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "ANC Visit deleted successfully.",
    });
  } catch (error) {
    console.error("Delete ANC Visit Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


/* =====================================================
   Get All ANC Visits
   GET /api/anc
===================================================== */

export const getAllAncVisits = async (req, res) => {
  try {
    const visits = await AncVisit.find({
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
      visits,
    });
  } catch (error) {
    console.error("Get All ANC Visits Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};