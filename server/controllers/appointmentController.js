import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";

/* =====================================================
   Create Appointment
   POST /api/appointments/:patientId
===================================================== */

export const createAppointment = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    const appointment = await Appointment.create({
      ...req.body,
      patient: patientId,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Create Appointment Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Get Patient Appointments
   GET /api/appointments/:patientId
===================================================== */

export const getAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;

    const appointments = await Appointment.find({
      patient: patientId,
      createdBy: req.user._id,
    }).sort({
      appointmentDate: 1,
    });

    res.status(200).json({
      success: true,
      totalAppointments: appointments.length,
      appointments,
    });
  } catch (error) {
    console.error("Get Appointments Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Get All Appointments
   GET /api/appointments
===================================================== */

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      createdBy: req.user._id,
    })
      .populate("patient", "fullName mobile")
      .sort({
        appointmentDate: -1,
      });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Get All Appointments Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments.",
    });
  }
};

/* =====================================================
   Get Today's Appointments
   GET /api/appointments/today
===================================================== */

export const getTodayAppointments = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

    const appointments =
      await Appointment.find({
        createdBy: req.user._id,
        appointmentDate: {
          $gte: today,
          $lt: tomorrow,
        },
      })
        .populate(
          "patient",
          "fullName mobile"
        )
        .sort({
          appointmentTime: 1,
        });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error(
      "Today's Appointment Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Get Single Appointment
   GET /api/appointments/details/:id
===================================================== */

export const getAppointmentById = async (req, res) => {
  try {
    const appointment =
      await Appointment.findById(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found.",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error(
      "Get Appointment Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Update Appointment
   PUT /api/appointments/details/:id
===================================================== */

export const updateAppointment = async (
  req,
  res
) => {
  try {
    const appointment =
      await Appointment.findById(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found.",
      });
    }

    Object.assign(
      appointment,
      req.body
    );

    await appointment.save();

    res.status(200).json({
      success: true,
      message:
        "Appointment updated successfully.",
      appointment,
    });
  } catch (error) {
    console.error(
      "Update Appointment Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Delete Appointment
   DELETE /api/appointments/details/:id
===================================================== */

export const deleteAppointment = async (
  req,
  res
) => {
  try {
    const appointment =
      await Appointment.findById(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found.",
      });
    }

    await Appointment.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Appointment deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Appointment Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};