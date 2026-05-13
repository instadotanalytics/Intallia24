import express from "express";
import {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  bulkDeleteContacts,
} from "../controllers/contact.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// ─── Public ───────────────────────────────────────────────────
router.post("/", submitContact);

// ─── Admin Protected ──────────────────────────────────────────
router.get("/", protect, getAllContacts);
router.get("/:id", protect, getContactById);
router.patch("/:id/status", protect, updateContactStatus);
router.delete("/bulk", protect, bulkDeleteContacts);
router.delete("/:id", protect, deleteContact);

export default router;
