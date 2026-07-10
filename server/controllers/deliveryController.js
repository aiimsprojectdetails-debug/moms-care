import Delivery from "../models/Delivery.js";
import Patient from "../models/Patient.js";

/* =====================================================
   Create Delivery
   POST /api/deliveries/:patientId
===================================================== */

export const createDelivery = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    const delivery = await Delivery.create({
      ...req.body,
      patient: patientId,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Delivery record created successfully.",
      delivery,
    });

  } catch (error) {

    console.error("Create Delivery Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* =====================================================
   Get All Deliveries
   GET /api/deliveries/:patientId
===================================================== */

export const getDeliveries = async (req, res) => {
  try {

    const { patientId } = req.params;

    const deliveries = await Delivery.find({
      patient: patientId,
      createdBy: req.user._id,
    }).sort({
      deliveryDate: -1,
    });

    res.status(200).json({
      success: true,
      totalDeliveries: deliveries.length,
      deliveries,
    });

  } catch (error) {

    console.error("Get Deliveries Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* =====================================================
   Get Single Delivery
   GET /api/deliveries/details/:id
===================================================== */

export const getDeliveryById = async (req, res) => {
  try {

    const delivery = await Delivery.findById(req.params.id);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery record not found.",
      });
    }

    res.status(200).json({
      success: true,
      delivery,
    });

  } catch (error) {

    console.error("Get Delivery Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* =====================================================
   Update Delivery
   PUT /api/deliveries/details/:id
===================================================== */

export const updateDelivery = async (req, res) => {
  try {

    const delivery = await Delivery.findById(req.params.id);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery record not found.",
      });
    }

    Object.assign(delivery, req.body);

    await delivery.save();

    res.status(200).json({
      success: true,
      message: "Delivery updated successfully.",
      delivery,
    });

  } catch (error) {

    console.error("Update Delivery Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* =====================================================
   Delete Delivery
   DELETE /api/deliveries/details/:id
===================================================== */

export const deleteDelivery = async (req, res) => {
  try {

    const delivery = await Delivery.findById(req.params.id);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery record not found.",
      });
    }

    await Delivery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Delivery deleted successfully.",
    });

  } catch (error) {

    console.error("Delete Delivery Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


/* =====================================================
   Get All Deliveries
   GET /api/deliveries
===================================================== */

export const getAllDeliveries = async (req, res) => {
  try {

    const deliveries = await Delivery.find({
      createdBy: req.user._id,
    })
      .populate(
        "patient",
        "fullName mobile"
      )
      .sort({
        deliveryDate: -1,
      });

    res.status(200).json({
      success: true,
      deliveries,
    });

  } catch (error) {

    console.error("Get All Deliveries Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};