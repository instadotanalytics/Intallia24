import express from "express";
import {
  subscribe,
  unsubscribe,
  getAllSubscribers,
} from "../controllers/newsletter.controller.js";

const router = express.Router();

router.post("/", subscribe);
router.post("/unsubscribe", unsubscribe);

// Admin
router.get("/", getAllSubscribers);

export default router;
