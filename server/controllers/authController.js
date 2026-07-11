import crypto from "crypto";
import User from "../models/User.js";
import generateToken from "../utils/jwt.js";
import sendEmail from "../utils/email.js";

/* =====================================================
   Register User
   POST /api/auth/register
===================================================== */

export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      hospitalName,
      department,
      designation,
      role,
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and password are required.",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Create new user
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password,
      phone,
      hospitalName,
      department,
      designation,
      role: role || "Doctor",
    });

    // Generate JWT
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Optional Welcome Email
    try {
      await sendEmail({
        to: user.email,
        subject: "Welcome to Mom's Care",
        html: `
          <div style="font-family: Arial, sans-serif; padding:20px;">
            <h2>Welcome to Mom's Care ❤️</h2>

            <p>Hello <strong>${user.fullName}</strong>,</p>

            <p>Your account has been created successfully.</p>

            <p>You can now log in and start managing patients and projects.</p>

            <br>

            <p>Regards,</p>

            <h3>Mom's Care Team</h3>
          </div>
        `,
      });
    } catch (emailError) {
      console.log("Welcome email could not be sent.");
    }

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Login User
   POST /api/auth/login
===================================================== */

export const loginUser = async (req, res) => {

  console.log("========== LOGIN REQUEST ==========");
  console.log("Request Body:", req.body);

  try {
    const { email, password } = req.body;

    console.log("Finding user...");

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    console.log("User Found:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    console.log("Checking password...");

    const isMatch = await user.matchPassword(password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id);

    const userResponse = user.toObject();
    delete userResponse.password;

    console.log("Login Successful!");

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: userResponse,
    });

  } catch (error) {

    console.error("LOGIN ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =====================================================
   Get Logged-in User
   GET /api/auth/profile
===================================================== */

export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =====================================================
   Forgot Password
   POST /api/auth/forgot-password
===================================================== */

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate Email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // Find User
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash Token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save token in database
    user.resetPasswordToken = hashedToken;

    // Token valid for 15 minutes
    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    // Reset URL
    const resetURL =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // Email HTML
    const html = `
      <div style="font-family:Arial;padding:25px;">

        <h2 style="color:#ec4899;">
          Mom's Care Password Reset
        </h2>

        <p>Hello <strong>${user.fullName}</strong>,</p>

        <p>
          We received a request to reset your password.
        </p>

        <p>
          Click the button below to create a new password.
        </p>

        <br>

        <a
          href="${resetURL}"
          style="
            background:#ec4899;
            color:white;
            padding:14px 24px;
            border-radius:8px;
            text-decoration:none;
            display:inline-block;
            font-weight:bold;
          "
        >
          Reset Password
        </a>

        <br><br>

        <p>
          This link is valid for
          <strong>15 minutes</strong>.
        </p>

        <p>
          If you did not request a password reset,
          please ignore this email.
        </p>

        <br>

        <p>
          Regards,
        </p>

        <h3>Mom's Care Team ❤️</h3>

      </div>
    `;

    // Send Email
    await sendEmail({
      to: user.email,
      subject: "Reset Your Mom's Care Password",
      html,
    });

    return res.status(200).json({
      success: true,
      message:
        "Password reset link has been sent to your email.",
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to process password reset request.",
    });
  }
};

/* =====================================================
   Reset Password
   POST /api/auth/reset-password/:token
===================================================== */

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "New password is required.",
      });
    }

    // Hash received token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset token is invalid or has expired.",
      });
    }

    // Update password
    user.password = password;

    // Clear reset token
    user.resetPasswordToken = "";
    user.resetPasswordExpire = undefined;

    await user.save();

    // Generate new JWT
    const tokenJWT = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Password reset successful.",
      token: tokenJWT,
    });

  } catch (error) {
    console.error("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


/* =====================================================
   Logout User
   POST /api/auth/logout
===================================================== */

export const logoutUser = async (req, res) => {
  try {

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });

  } catch (error) {

    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};