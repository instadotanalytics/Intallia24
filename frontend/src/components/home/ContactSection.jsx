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

function validate(form) {
  const errors = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email))
    errors.email = "Enter a valid email address.";
  if (!/^[\+]?[0-9\s\-\(\)]{10,15}$/.test(form.phone))
    errors.phone = "Enter a valid phone number (10 digits).";
  if (!form.message.trim() || form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Field ka error clear karo jab user type kare
    if (errors[name]) setErrors((err) => ({ ...err, [name]: "" }));
    // Submit-level error bhi clear karo
    if (errors.submit) setErrors((err) => ({ ...err, submit: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // Server se aayi specific error dikhao
        setErrors({
          submit: data.message || "Something went wrong. Please try again.",
        });
        return;
      }

      // Success — confirmation screen dikhao
      setSubmitted(true);
    } catch (_) {
      setErrors({
        submit: "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* Left Column - Contact Information */}
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
                    P13–14, Ground Floor, Metro Tower, Vijay Nagar, Scheme No
                    54, Indore, Madhya Pradesh
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
                  <p className={styles.phoneNumber}>+91 99811 21216</p>
                  <span className={styles.timing}>Mon–Sat: 10AM – 7PM</span>
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

          {/* Right Column - Form */}
          <div className={styles.right}>
            {submitted ? (
              <div className={styles.success}>
                <FaCheckCircle className={styles.successIcon} />
                <h3>Message Sent Successfully!</h3>
                <p>
                  Thank you for reaching out. Our Team will contact you within
                  24 hours.
                </p>
                <button className={styles.resetBtn} onClick={handleReset}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {/* Row 1: Full Name + Email */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>FULL NAME</label>
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
                      <span className={styles.errorMsg}>{errors.name}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>EMAIL ADDRESS</label>
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
                      <span className={styles.errorMsg}>{errors.email}</span>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone + Service */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>PHONE NUMBER</label>
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
                      <span className={styles.errorMsg}>{errors.phone}</span>
                    )}
                  </div>

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
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className={styles.selectArrow} />
                    </div>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>YOUR MESSAGE</label>
                  <div className={styles.inputWrapper}>
                    <FaComment
                      className={`${styles.inputIconLeft} ${styles.textareaIcon}`}
                    />
                    <textarea
                      name="message"
                      placeholder="Tell us about your query or what you'd like to learn..."
                      rows={5}
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
                    <span className={styles.errorMsg}>{errors.message}</span>
                  )}
                </div>

                {/* ── Submit-level error (network/server error) ── */}
                {errors.submit && (
                  <div className={styles.submitError}>{errors.submit}</div>
                )}

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
