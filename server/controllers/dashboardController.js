import Patient from "../models/Patient.js";
import Project from "../models/Project.js";

/* =====================================================
   Dashboard Overview
   GET /api/dashboard
===================================================== */

export const dashboardOverview = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total Counts
    const totalPatients = await Patient.countDocuments({
      createdBy: userId,
    });

    const totalProjects = await Project.countDocuments({
      createdBy: userId,
    });

    // Active Patients
    const activePatients = await Patient.countDocuments({
      createdBy: userId,
      status: "Active",
    });

    // High Risk Patients
    const highRiskPatients = await Patient.countDocuments({
      createdBy: userId,
      riskLevel: "High",
      status: "Active",
    });

    // Upcoming Appointments
    const upcomingAppointments =
      await Patient.countDocuments({
        createdBy: userId,
        appointmentStatus: "Upcoming",
        nextAppointment: {
          $gte: new Date(),
        },
      });

    // Ongoing Projects
    const ongoingProjects =
      await Project.countDocuments({
        createdBy: userId,
        status: "Ongoing",
      });

    // Completed Projects
    const completedProjects =
      await Project.countDocuments({
        createdBy: userId,
        status: "Completed",
      });

    res.status(200).json({
      success: true,

      overview: {
        totalPatients,
        activePatients,
        highRiskPatients,
        upcomingAppointments,

        totalProjects,
        ongoingProjects,
        completedProjects,
      },
    });

  } catch (error) {

    console.error(
      "Dashboard Overview Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* =====================================================
   Dashboard Statistics
   GET /api/dashboard/statistics
===================================================== */

export const dashboardStatistics = async (req, res) => {
  try {

    const userId = req.user._id;

    /* =========================================
       Patient Statistics
    ========================================= */

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

    /* =========================================
       Risk Statistics
    ========================================= */

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

    /* =========================================
       Project Statistics
    ========================================= */

    const planningProjects = await Project.countDocuments({
      createdBy: userId,
      status: "Planning",
    });

    const ongoingProjects = await Project.countDocuments({
      createdBy: userId,
      status: "Ongoing",
    });

    const completedProjects = await Project.countDocuments({
      createdBy: userId,
      status: "Completed",
    });

    const cancelledProjects = await Project.countDocuments({
      createdBy: userId,
      status: "Cancelled",
    });

    /* =========================================
       Monthly Patient Registration
    ========================================= */

    const monthlyRegistrations =
      await Patient.aggregate([
        {
          $match: {
            createdBy: req.user._id,
          },
        },

        {
          $group: {
            _id: {
              month: {
                $month: "$createdAt",
              },
            },

            total: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            "_id.month": 1,
          },
        },
      ]);

    /* =========================================
       Response
    ========================================= */

    res.status(200).json({

      success: true,

      statistics: {

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

        projects: {

          planning: planningProjects,

          ongoing: ongoingProjects,

          completed: completedProjects,

          cancelled: cancelledProjects,

        },

        monthlyRegistrations,

      },

    });

  } catch (error) {

    console.error(
      "Dashboard Statistics Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* =====================================================
   Recent Patients
   GET /api/dashboard/recent-patients
===================================================== */

export const recentPatients = async (req, res) => {
  try {

    const patients = await Patient.find({
      createdBy: req.user._id,
    })
      .populate("project", "title category")
      .select(
        "fullName age mobile riskLevel trimester nextAppointment createdAt"
      )
      .sort({
        createdAt: -1,
      })
      .limit(5);

    res.status(200).json({
      success: true,
      totalPatients: patients.length,
      patients,
    });

  } catch (error) {

    console.error(
      "Recent Patients Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



/* =====================================================
   Recent Projects
   GET /api/dashboard/recent-projects
===================================================== */

export const recentProjects = async (req, res) => {
  try {

    const projects = await Project.find({
      createdBy: req.user._id,
    })
      .select(
        "title category mentor status priority createdAt"
      )
      .sort({
        createdAt: -1,
      })
      .limit(5);

    res.status(200).json({

      success: true,

      totalProjects: projects.length,

      projects,

    });

  } catch (error) {

    console.error(
      "Recent Projects Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }
};

/* =====================================================
   Upcoming Appointments
   GET /api/dashboard/upcoming-appointments
===================================================== */

export const dashboardUpcomingAppointments = async (req, res) => {
  try {

    const appointments = await Patient.find({
      createdBy: req.user._id,
      appointmentStatus: "Upcoming",
      nextAppointment: {
        $gte: new Date(),
      },
    })
      .populate("project", "title")
      .select(
        "fullName mobile doctorName nextAppointment hospitalName riskLevel trimester"
      )
      .sort({
        nextAppointment: 1,
      })
      .limit(10);

    res.status(200).json({
      success: true,
      totalAppointments: appointments.length,
      appointments,
    });

  } catch (error) {

    console.error(
      "Dashboard Upcoming Appointment Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



/* =====================================================
   High Risk Patients
   GET /api/dashboard/high-risk-patients
===================================================== */

export const dashboardHighRiskPatients = async (req, res) => {
  try {

    const patients = await Patient.find({
      createdBy: req.user._id,
      riskLevel: "High",
      status: "Active",
    })
      .populate("project", "title")
      .select(
        "fullName age mobile trimester pregnancyWeek doctorName hospitalName"
      )
      .sort({
        pregnancyWeek: -1,
      })
      .limit(10);

    res.status(200).json({
      success: true,
      totalPatients: patients.length,
      patients,
    });

  } catch (error) {

    console.error(
      "Dashboard High Risk Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



/* =====================================================
   Monthly Analytics
   GET /api/dashboard/monthly-analytics
===================================================== */

export const monthlyAnalytics = async (req, res) => {
  try {

    const patientAnalytics =
      await Patient.aggregate([
        {
          $match: {
            createdBy: req.user._id,
          },
        },
        {
          $group: {
            _id: {
              year: {
                $year: "$createdAt",
              },
              month: {
                $month: "$createdAt",
              },
            },
            patients: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

    const projectAnalytics =
      await Project.aggregate([
        {
          $match: {
            createdBy: req.user._id,
          },
        },
        {
          $group: {
            _id: {
              year: {
                $year: "$createdAt",
              },
              month: {
                $month: "$createdAt",
              },
            },
            projects: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

    res.status(200).json({

      success: true,

      analytics: {

        patientAnalytics,

        projectAnalytics,

      },

    });

  } catch (error) {

    console.error(
      "Monthly Analytics Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};