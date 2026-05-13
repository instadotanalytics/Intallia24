// src/pages/Login/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdError,
} from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.password) errs.password = "Password required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setGlobalError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setGlobalError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
    setGlobalError("");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <div className={styles.logoIcon}>i</div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>INTALLIA 24</span>
            <span className={styles.logoTagline}>
              Building Tomorrow's Workforce
            </span>
          </div>
        </div>

        <h1 className={styles.heading}>Admin Login</h1>
        <p className={styles.subheading}>Sign in to access your dashboard</p>

        {globalError && (
          <div className={styles.globalError}>
            <MdError size={16} />
            {globalError}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>
                <MdEmail />
              </span>
              <input
                className={`${styles.input} ${errors.email ? styles.error : ""}`}
                type="email"
                name="email"
                placeholder="admin@intallia24.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <span className={styles.errorMsg}>{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>
                <MdLock />
              </span>
              <input
                className={`${styles.input} ${errors.password ? styles.error : ""}`}
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.togglePass}
                onClick={() => setShowPass((p) => !p)}
                tabIndex={-1}
              >
                {showPass ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
            {errors.password && (
              <span className={styles.errorMsg}>{errors.password}</span>
            )}
          </div>

          <button className={styles.btn} type="submit" disabled={loading}>
            {loading && <span className={styles.spinner} />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className={styles.footer}>
          © {new Date().getFullYear()} Intallia 24 · Admin Portal
        </p>
      </div>
    </div>
  );
}
