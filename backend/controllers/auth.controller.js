import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";

// Token generate helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// ─── POST /api/auth/login ─────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email aur password dono required hain.",
      });
    }

    // Admin dhundo with password (select: false tha isliye +password)
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Password match karo
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated.",
      });
    }

    // Last login update karo
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = generateToken(admin._id);

    return res.json({
      success: true,
      message: "Login successful!",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── GET /api/auth/me ─────────────────────────────────────────
export const getMe = async (req, res) => {
  return res.json({
    success: true,
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
      avatar: req.admin.avatar,
      lastLogin: req.admin.lastLogin,
    },
  });
};

// ─── POST /api/auth/logout ────────────────────────────────────
export const logout = async (req, res) => {
  // JWT stateless hota hai, frontend se token delete hoga
  return res.json({ success: true, message: "Logged out successfully." });
};

// ─── POST /api/auth/create-admin (Superadmin only) ───────────
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered." });
    }

    const admin = await Admin.create({ name, email, password, role });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── PATCH /api/auth/change-password ────────────────────────
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id).select("+password");
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect." });
    }

    admin.password = newPassword;
    await admin.save();

    return res.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
