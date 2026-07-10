import Project from "../models/Project.js";

/* =====================================================
   Create Project
   POST /api/projects
===================================================== */

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      mentor,
      department,
      hospitalName,
      fundingAgency,
      fundingAmount,
      startDate,
      endDate,
      status,
      priority,
      members,
    } = req.body;

    // Validate Required Fields
    if (
      !title ||
      !description ||
      !category ||
      !mentor ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Create Project
    const project = await Project.create({
      title,
      description,
      category,
      mentor,
      department,
      hospitalName,
      fundingAgency,
      fundingAmount,
      startDate,
      endDate,
      status,
      priority,
      members,

      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });

  } catch (error) {

    console.error("Create Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* =====================================================
   Get All Projects
   GET /api/projects
===================================================== */

export const getProjects = async (req, res) => {
  try {
    const {
      search,
      category,
      status,
      priority,
    } = req.query;

    // Build Filter
    const filter = {};

    // Show only current user's projects
    filter.createdBy = req.user._id;

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          mentor: {
            $regex: search,
            $options: "i",
          },
        },
        {
          hospitalName: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    const projects = await Project.find(filter)
      .populate("createdBy", "fullName email")
      .populate("patients", "fullName mobile")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      totalProjects: projects.length,
      projects,
    });

  } catch (error) {

    console.error("Get Projects Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


/* =====================================================
   Get Project By ID
   GET /api/projects/:id
===================================================== */

export const getProjectById = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id)
      .populate("createdBy", "fullName email")
      .populate("patients");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // Security Check
    if (
      project.createdBy._id.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });

  } catch (error) {

    console.error("Get Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* =====================================================
   Update Project
   PUT /api/projects/:id
===================================================== */

export const updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      mentor,
      department,
      hospitalName,
      fundingAgency,
      fundingAmount,
      startDate,
      endDate,
      status,
      priority,
      members,
      patients,
      projectImage,
      documents,
    } = req.body;

    // Find Project
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // Authorization Check
    if (
      project.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    // Update Fields
    project.title = title ?? project.title;

    project.description =
      description ?? project.description;

    project.category =
      category ?? project.category;

    project.mentor =
      mentor ?? project.mentor;

    project.department =
      department ?? project.department;

    project.hospitalName =
      hospitalName ?? project.hospitalName;

    project.fundingAgency =
      fundingAgency ?? project.fundingAgency;

    project.fundingAmount =
      fundingAmount ?? project.fundingAmount;

    project.startDate =
      startDate ?? project.startDate;

    project.endDate =
      endDate ?? project.endDate;

    project.status =
      status ?? project.status;

    project.priority =
      priority ?? project.priority;

    project.projectImage =
      projectImage ?? project.projectImage;

    if (members) {
      project.members = members;
    }

    if (patients) {
      project.patients = patients;
    }

    if (documents) {
      project.documents = documents;
    }

    // Save Changes
    await project.save();

    // Return Updated Project
    const updatedProject = await Project.findById(project._id)
      .populate("createdBy", "fullName email")
      .populate("patients", "fullName mobile");

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project: updatedProject,
    });

  } catch (error) {

    console.error("Update Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/* =====================================================
   Delete Project
   DELETE /api/projects/:id
===================================================== */

export const deleteProject = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // Authorization Check
    if (
      project.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });

  } catch (error) {

    console.error("Delete Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



/* =====================================================
   Search Projects
   GET /api/projects/search
===================================================== */

export const searchProjects = async (req, res) => {
  try {

    const keyword = req.query.keyword || "";

    const projects = await Project.find({
      createdBy: req.user._id,

      $or: [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          mentor: {
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
        {
          category: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      total: projects.length,
      projects,
    });

  } catch (error) {

    console.error("Search Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



/* =====================================================
   Project Statistics
   GET /api/projects/statistics
===================================================== */

export const projectStatistics = async (req, res) => {
  try {

    const userId = req.user._id;

    const totalProjects = await Project.countDocuments({
      createdBy: userId,
    });

    const ongoingProjects = await Project.countDocuments({
      createdBy: userId,
      status: "Ongoing",
    });

    const completedProjects = await Project.countDocuments({
      createdBy: userId,
      status: "Completed",
    });

    const planningProjects = await Project.countDocuments({
      createdBy: userId,
      status: "Planning",
    });

    const cancelledProjects = await Project.countDocuments({
      createdBy: userId,
      status: "Cancelled",
    });

    const highPriority = await Project.countDocuments({
      createdBy: userId,
      priority: "High",
    });

    const mediumPriority = await Project.countDocuments({
      createdBy: userId,
      priority: "Medium",
    });

    const lowPriority = await Project.countDocuments({
      createdBy: userId,
      priority: "Low",
    });

    return res.status(200).json({
      success: true,

      statistics: {

        totalProjects,

        ongoingProjects,

        completedProjects,

        planningProjects,

        cancelledProjects,

        priority: {

          high: highPriority,

          medium: mediumPriority,

          low: lowPriority,

        },

      },

    });

  } catch (error) {

    console.error("Project Statistics Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};