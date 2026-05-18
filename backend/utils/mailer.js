import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },

  pool: true,
  maxConnections: 5,
  maxMessages: 100,

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// only for logs (not blocking)
transporter.verify((err) => {
  if (err) {
    console.error("❌ Mail transporter error:", err.message);
  } else {
    console.log("✅ Mail transporter ready");
  }
});

export default transporter;