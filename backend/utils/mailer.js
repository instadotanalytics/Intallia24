import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// ─── Transporter ─────────────────────────────────────────────
// Gmail use kar rahe hain — App Password required (2FA enable hona chahiye)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // tumhara Gmail
    pass: process.env.MAIL_PASS, // Gmail App Password (not actual password)
  },
});

// Verify connection on startup
transporter.verify((err) => {
  if (err) console.error("❌ Mail transporter error:", err.message);
  else console.log("✅ Mail transporter ready");
});

export default transporter;
