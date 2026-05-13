import Contact from "../models/Contact.model.js";
import transporter from "../utils/mailer.js";
import {
  contactAdminTemplate,
  contactUserTemplate,
} from "../utils/emailTemplates.js";

// ─── POST /api/contact ────────────────────────────────────────
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      service,
      message,
    });

    const adminTemplate = contactAdminTemplate({
      name,
      email,
      phone,
      service,
      message,
    });
    const userTemplate = contactUserTemplate({ name });

    await Promise.allSettled([
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

    return res.status(201).json({
      success: true,
      message: "Message received! We'll get back to you within 24 hours.",
      data: { id: contact._id },
    });
  } catch (error) {
    console.error("Contact submit error:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    return res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong. Please try again.",
      });
  }
};

// ─── GET /api/contact  (Admin only) ──────────────────────────
export const getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = status ? { status } : {};

    const [contacts, total] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .lean(),
      Contact.countDocuments(filter),
    ]);

    // Stats bhi bhejo
    const stats = await Contact.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const statusStats = { new: 0, read: 0, replied: 0 };
    stats.forEach((s) => {
      statusStats[s._id] = s.count;
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
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── GET /api/contact/:id  (Admin only) ──────────────────────
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact)
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });

    // Auto mark as read jab admin dekhta hai
    if (contact.status === "new") {
      contact.status = "read";
      await contact.save();
    }

    return res.json({ success: true, data: contact });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── PATCH /api/contact/:id/status  (Admin only) ─────────────
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!contact)
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });

    return res.json({ success: true, data: contact });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── DELETE /api/contact/:id  (Admin manually delete) ────────
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact)
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });

    return res.json({
      success: true,
      message: "Contact deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── DELETE /api/contact/bulk  (Admin bulk delete) ───────────
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
    return res.status(500).json({ success: false, message: error.message });
  }
};
