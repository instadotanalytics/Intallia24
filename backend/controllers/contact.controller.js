import Contact from "../models/Contact.model.js";
import transporter from "../utils/mailer.js";
import {
  contactAdminTemplate,
  contactUserTemplate,
} from "../utils/emailTemplates.js";

// ─────────────────────────────────────────────────────────────
// Helper: Send emails in background (non-blocking)
// ─────────────────────────────────────────────────────────────
const sendEmailsInBackground = (adminTemplate, userTemplate, email) => {
  // setImmediate Render par reliable nahi hai, isliye setTimeout(0) use karo
  setTimeout(async () => {
    try {
      const results = await Promise.allSettled([
        transporter.sendMail({
          from: `"Intallia Contact" <${process.env.MAIL_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: adminTemplate.subject,
          html: adminTemplate.html,
        }),
        transporter.sendMail({
          from: `"Intallia" <${process.env.MAIL_USER}>`,
          to: email,
          subject: userTemplate.subject,
          html: userTemplate.html,
        }),
      ]);

      results.forEach((result, i) => {
        const label = i === 0 ? "Admin" : "User";
        if (result.status === "fulfilled") {
          console.log(`✅ ${label} email sent successfully`);
        } else {
          console.error(`❌ ${label} email failed:`, result.reason?.message);
        }
      });
    } catch (err) {
      console.error("❌ Background email error:", err.message);
    }
  }, 0);
};

// ─────────────────────────────────────────────────────────────
// POST /api/contact
// ─────────────────────────────────────────────────────────────
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // ── Validation ──────────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // ── Save to DB ──────────────────────────────────────────
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      service: service?.trim(),
      message: message.trim(),
    });

    // ── Prepare email templates ─────────────────────────────
    const adminTemplate = contactAdminTemplate({
      name,
      email,
      phone,
      service,
      message,
    });

    const userTemplate = contactUserTemplate({ name });

    // ── Send response IMMEDIATELY (fast API) ────────────────
    res.status(201).json({
      success: true,
      message: "Message received successfully",
      data: { id: contact._id },
    });

    // ── Send emails in background (non-blocking) ────────────
    sendEmailsInBackground(adminTemplate, userTemplate, email);
  } catch (error) {
    console.error("❌ Contact submit error:", error);

    // Agar response pehle nahi gaya to error bhejo
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    }
  }
};

// ─────────────────────────────────────────────────────────────
// GET /api/contact  (Admin only)
// ─────────────────────────────────────────────────────────────
export const getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = status ? { status } : {};

    const [contacts, total, stats] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .lean(),
      Contact.countDocuments(filter),
      Contact.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    ]);

    const statusStats = { new: 0, read: 0, replied: 0 };
    stats.forEach((s) => {
      if (s._id) statusStats[s._id] = s.count;
    });

    return res.json({
      success: true,
      data: contacts,
      stats: statusStats,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ getAllContacts error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
// GET /api/contact/:id  (Admin only)
// ─────────────────────────────────────────────────────────────
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    // Auto mark as read jab admin dekhta hai
    if (contact.status === "new") {
      contact.status = "read";
      await contact.save();
    }

    return res.json({ success: true, data: contact });
  } catch (error) {
    console.error("❌ getContactById error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
// PATCH /api/contact/:id/status  (Admin only)
// ─────────────────────────────────────────────────────────────
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["new", "read", "replied"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    return res.json({ success: true, data: contact });
  } catch (error) {
    console.error("❌ updateContactStatus error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
// DELETE /api/contact/:id  (Admin manually delete)
// ─────────────────────────────────────────────────────────────
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    return res.json({
      success: true,
      message: "Contact deleted successfully.",
    });
  } catch (error) {
    console.error("❌ deleteContact error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
// DELETE /api/contact/bulk  (Admin bulk delete)
// ─────────────────────────────────────────────────────────────
export const bulkDeleteContacts = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No IDs provided." });
    }

    const result = await Contact.deleteMany({ _id: { $in: ids } });

    return res.json({
      success: true,
      message: `${result.deletedCount} contacts deleted.`,
    });
  } catch (error) {
    console.error("❌ bulkDeleteContacts error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
