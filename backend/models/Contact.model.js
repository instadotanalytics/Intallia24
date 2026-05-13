import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      match: [/^[\+]?[0-9\s\-\(\)]{10,15}$/, "Invalid phone number"],
    },
    service: {
      type: String,
      enum: [
        "",
        "Data Science & Analytics",
        "AI / ML Engineering",
        "AI Consulting",
        "Data Intelligence Solutions",
        "Data Engineering",
        "Automation & Workflows",
      ],
      default: "",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [10, "Message must be at least 10 characters"],
    },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto-generate honge
  },
);

// Index for faster queries in admin panel
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
