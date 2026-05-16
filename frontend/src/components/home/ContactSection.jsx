import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCogs,
  FaComment,
  FaPaperPlane,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaChevronDown,
} from "react-icons/fa";
import styles from "./ContactSection.module.css";

const SERVICES = [
  "Data Science & Analytics",
  "AI / ML Engineering",
  "Data Intelligence Solutions",
  "AI Consulting",
  "Data Engineering",
  "Automation & Workflows",
];

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://intallia24-backend.onrender.com/api";

function validate(form) {
  const errors = {};

  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (!/^[\+]?[0-9\s\-\(\)]{10,15}$/.test(form.phone)) {
    errors.phone = "Enter a valid phone number (10 digits).";
  }

  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ─────────────────────────────────────────
  // Handle Input Change
  // ─────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear submit error
    if (errors.submit) {
      setErrors((prev) => ({
        ...prev,
        submit: "",
      }));
    }
  };

  // ─────────────────────────────────────────
  // Handle Submit
  // ─────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          submit:
            data.message || "Something went wrong. Please try again.",
        });

        return;
      }

      // Success
      setSubmitted(true);

      // Reset Form
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact Form Error:", error);

      setErrors({
        submit:
          "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────
  // Reset Form
  // ─────────────────────────────────────────
  const handleReset = () => {
    setSubmitted(false);

    setForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });

    setErrors({});
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* LEFT SIDE */}
          <div className={styles.left}>
            <h2 className={styles.leftHeading}>Contact Information</h2>

            <p className={styles.leftSubtitle}>
              Fill up the form and our team will get back to you within 24
              hours.
            </p>

            <div className={styles.infoList}>
              {/* Location */}
              <div className={styles.infoCard}>
                <div className={styles.infoIconWrap}>
                  <FaMapMarkerAlt />
                </div>

                <div className={styles.infoText}>
                  <h4>OUR LOCATION</h4>

                  <p>
                    P13–14, Ground Floor, Metro Tower, Vijay Nagar,
                    Scheme No 54, Indore, Madhya Pradesh
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className={styles.infoCard}>
                <div className={styles.infoIconWrap}>
                  <FaPhoneAlt />
                </div>

                <div className={styles.infoText}>
                  <h4>PHONE</h4>

                  <p className={styles.phoneNumber}>
                    +91 99811 21216
                  </p>

                  <span className={styles.timing}>
                    Mon–Sat: 10AM – 7PM
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className={styles.infoCard}>
                <div className={styles.infoIconWrap}>
                  <FaEnvelope />
                </div>

                <div className={styles.infoText}>
                  <h4>EMAIL</h4>

                  <p>iamgrootright24@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className={styles.right}>
            {submitted ? (
              <div className={styles.success}>
                <FaCheckCircle className={styles.successIcon} />

                <h3>Message Sent Successfully!</h3>

                <p>
                  Thank you for reaching out. Our Team will contact you
                  within 24 hours.
                </p>

                <button
                  className={styles.resetBtn}
                  onClick={handleReset}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Row 1 */}
                <div className={styles.formRow}>
                  {/* Name */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      FULL NAME
                    </label>

                    <div className={styles.inputWrapper}>
                      <FaUser className={styles.inputIconLeft} />

                      <input
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className={
                          errors.name
                            ? styles.inputFieldError
                            : form.name
                              ? styles.inputFieldSuccess
                              : styles.inputField
                        }
                      />
                    </div>

                    {errors.name && (
                      <span className={styles.errorMsg}>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      EMAIL ADDRESS
                    </label>

                    <div className={styles.inputWrapper}>
                      <FaEnvelope className={styles.inputIconLeft} />

                      <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        className={
                          errors.email
                            ? styles.inputFieldError
                            : form.email
                              ? styles.inputFieldSuccess
                              : styles.inputField
                        }
                      />
                    </div>

                    {errors.email && (
                      <span className={styles.errorMsg}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2 */}
                <div className={styles.formRow}>
                  {/* Phone */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      PHONE NUMBER
                    </label>

                    <div className={styles.inputWrapper}>
                      <FaPhone className={styles.inputIconLeft} />

                      <input
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        className={
                          errors.phone
                            ? styles.inputFieldError
                            : form.phone
                              ? styles.inputFieldSuccess
                              : styles.inputField
                        }
                      />
                    </div>

                    {errors.phone && (
                      <span className={styles.errorMsg}>
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Service */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      SERVICE (OPTIONAL)
                    </label>

                    <div className={styles.selectWrapper}>
                      <FaCogs className={styles.inputIconLeft} />

                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={styles.selectField}
                      >
                        <option value="">Select a Service</option>

                        {SERVICES.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>

                      <FaChevronDown className={styles.selectArrow} />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    YOUR MESSAGE
                  </label>

                  <div className={styles.inputWrapper}>
                    <FaComment
                      className={`${styles.inputIconLeft} ${styles.textareaIcon}`}
                    />

                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell us about your query or what you'd like to learn..."
                      value={form.message}
                      onChange={handleChange}
                      className={
                        errors.message
                          ? styles.inputFieldError
                          : form.message
                            ? styles.inputFieldSuccess
                            : styles.inputField
                      }
                    />
                  </div>

                  {errors.message && (
                    <span className={styles.errorMsg}>
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className={styles.submitError}>
                    {errors.submit}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      SEND MESSAGE <FaPaperPlane />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}