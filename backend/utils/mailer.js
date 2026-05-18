import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

// only for logs
transporter.verify((err) => {
  if (err) {
    console.error("❌ Mail transporter error:", err.message);
  } else {
    console.log("✅ Mail transporter ready");
  }
});

export default transporter;