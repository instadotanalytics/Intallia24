import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";

// ─── Protect Routes ───────────────────────────────────────────
export const protect = async (req, res, next) => {
  try {
    let token;

    // Token ko Authorization header se nikalo
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Admin ko DB se fetch karo
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found. Token invalid.",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is deactivated.",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token." });
    }
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({
          success: false,
          message: "Token expired. Please login again.",
        });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Superadmin Only ──────────────────────────────────────────
export const superAdminOnly = (req, res, next) => {
  if (req.admin.role !== "superadmin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Superadmin only.",
    });
  }
  next();
};
