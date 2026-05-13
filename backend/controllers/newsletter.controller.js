import Newsletter from "../models/Newsletter.model.js";
import transporter from "../utils/mailer.js";
import { newsletterWelcomeTemplate } from "../utils/emailTemplates.js";

// ─── POST /api/newsletter ─────────────────────────────────────
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please enter a valid email address.",
        });
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });

    if (existing) {
      if (existing.isSubscribed) {
        return res.status(409).json({
          success: false,
          message: "This email is already subscribed!",
        });
      }
      // Re-subscribe karna chahta hai
      existing.isSubscribed = true;
      existing.subscribedAt = new Date();
      existing.unsubscribedAt = null;
      await existing.save();
    } else {
      await Newsletter.create({ email });
    }

    // Welcome email bhejo
    const template = newsletterWelcomeTemplate(email);
    await transporter.sendMail({
      from: `"Intallia Newsletter" <${process.env.MAIL_USER}>`,
      to: email,
      subject: template.subject,
      html: template.html,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully subscribed! Check your inbox for a welcome email.",
    });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Subscription failed. Please try again.",
      });
  }
};

// ─── POST /api/newsletter/unsubscribe ────────────────────────
export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber || !subscriber.isSubscribed) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Email not found in subscriber list.",
        });
    }

    subscriber.isSubscribed = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    return res.json({
      success: true,
      message: "You've been unsubscribed successfully.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Unsubscribe failed. Please try again.",
      });
  }
};

// ─── GET /api/newsletter (Admin panel ke liye) ───────────────
export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isSubscribed: true })
      .sort({ subscribedAt: -1 })
      .lean();

    return res.json({
      success: true,
      data: subscribers,
      total: subscribers.length,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
