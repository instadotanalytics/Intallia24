import express from "express";
import {
  login,
  getMe,
  logout,
  createAdmin,
  changePassword,
} from "../controllers/auth.controller.js";
import { protect, superAdminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);
router.post("/create-admin", protect, superAdminOnly, createAdmin);
router.patch("/change-password", protect, changePassword);

export default router;
