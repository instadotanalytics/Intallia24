import { useState } from "react";
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaCogs } from "react-icons/fa";
import styles from "./ConsultationModal.module.css";

const SERVICES = [
  "Data Analytics",
  "Data Science",
  "AI Powered Platform",
  "Data Engineering",
  "Automation & Workflows",
];

export default function ConsultationModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to backend
      await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Get Free Consultation</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className={styles.modalBody}>
          {submitted ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h4>Thank You!</h4>
              <p>Our team will contact you within 24 hours.</p>
              <button className={styles.submitBtn} onClick={onClose}>
                Close
              </button>
            </div>
          ) : (
            <>
              <p className={styles.subText}>
                Fill out the form and our experts will contact you within 24
                hours.
              </p>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <FaUser className={styles.inputIcon} />
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <FaPhone className={styles.inputIcon} />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <FaCogs className={styles.inputIcon} />
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
