import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaArrowRight,
} from "react-icons/fa";
import styles from "./Footer.module.css";

const currentYear = new Date().getFullYear();

const serviceLinks = [
  {
    label: "Data Science & Engineering",
    path: "/services/data-science-analytics",
  },
  {
    label: "AI Consulting",
    path: "/services/ai-consulting",
  },
  {
    label: "Data Intelligence Solutions",
    path: "/services/data-intelligence-solutions",
  },
  { label: "AI / ML Engineering", path: "/services/ai-ml-engineering" },
  { label: "Data Engineering Solutions", path: "/services/data-engineering" },
  { label: "Automation & Workflows", path: "/services/automation-workflows" },
];

const companyLinks = [
  { label: "Home", path: "/" },
  { label: "Our Company", path: "/about" },
  { label: "How We Work", path: "/about/how-we-work" },
  { label: "Our Values", path: "/about/our-values" },
  { label: "Our Working Culture", path: "/about/working-culture" },
];

const socialLinks = [
  { icon: <FaFacebookF />, href: "", label: "Facebook" },
  { icon: <FaTwitter />, href: "", label: "Twitter" },
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/intallia24/", label: "LinkedIn" },
  { icon: <FaInstagram />, href: "", label: "Instagram" },
  { icon: <FaYoutube />, href: "", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [subError, setSubError] = useState(""); // error message state

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Clear previous states
    setSubError("");

    // Client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setSubError("Please enter your email address.");
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setSubError("Please enter a valid email address.");
      return;
    }

    setSubLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Already subscribed ya server error
        setSubError(data.message || "Subscription failed. Please try again.");
        return;
      }

      // Success
      setSubscribed(true);
      setEmail("");
      // 4 second baad success state reset karo
      setTimeout(() => setSubscribed(false), 4000);
    } catch (_) {
      setSubError("Network error. Please check your connection.");
    } finally {
      setSubLoading(false);
    }
  };

  // Input change pe error clear karo
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (subError) setSubError("");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.footerMain}>
          {/* Company Info Column */}
          <div className={styles.companyCol}>
            <h2 className={styles.companyName}>INTALLIA</h2>
            <p className={styles.companyTagline}>
              Building Tomorrow's Workforce
            </p>
            <p className={styles.companyDesc}>
              Technology is at the core of everything we do—but it's our people
              who make the real difference. At Intallia, we bring together a
              curated team of innovators, problem-solvers, and domain experts
              who blend deep technical skills with a product-first mindset.
            </p>
          </div>

          {/* Services Column */}
          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>Services</h3>
            <ul className={styles.footerList}>
              {serviceLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className={styles.footerLink}>
                    {link.label}
                    <FaArrowRight className={styles.linkArrow} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links Column */}
          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>Company</h3>
            <ul className={styles.footerList}>
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className={styles.footerLink}>
                    {link.label}
                    <FaArrowRight className={styles.linkArrow} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div className={styles.contactCol}>
            <h3 className={styles.colTitle}>Get In Touch</h3>
            <ul className={styles.contactList}>
              <li>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>
                  P13–14, Ground Floor, Metro Tower, Vijay Nagar, Scheme No 54,
                  Indore, Madhya Pradesh
                </span>
              </li>
              <li>
                <FaPhoneAlt className={styles.contactIcon} />
                <span>+91 99811 21216</span>
              </li>
              <li>
                <FaEnvelope className={styles.contactIcon} />
                <span>iamgrootright24@gmail.com</span>
              </li>
            </ul>

            <div className={styles.newsletterBox}>
              <p className={styles.newsletterTitle}>
                Subscribe to our newsletter
              </p>

              <form
                onSubmit={handleSubscribe}
                className={styles.newsletterForm}
                noValidate
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`${styles.newsletterInput} ${subError ? styles.newsletterInputError : ""}`}
                  disabled={subLoading}
                />

                <button
                  type="submit"
                  className={styles.subscribeBtn}
                  disabled={subLoading || subscribed}
                >
                  {subLoading ? (
                    "Sending..."
                  ) : subscribed ? (
                    "Subscribed! ✓"
                  ) : (
                    <>
                      Subscribe
                      <FaPaperPlane className={styles.subscribeIcon} />
                    </>
                  )}
                </button>
              </form>

              {/* Error message — validation ya server error */}
              {subError && <p className={styles.newsletterError}>{subError}</p>}

              {/* Success message */}
              {subscribed && (
                <p className={styles.newsletterSuccess}>
                  🎉 Check your inbox for a welcome email!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>© {currentYear} Intallia. All rights reserved.</p>
            <div className={styles.legalLinks}>
              <Link to="#">Privacy Policy</Link>
              <span className={styles.separator}>|</span>
              <Link to="#">Terms of Service</Link>
            </div>
          </div>

          <div className={styles.socialWrapper}>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <Link to="/contact" className={styles.quoteBtn}>
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
