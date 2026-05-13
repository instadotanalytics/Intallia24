import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaShieldAlt,
  FaUsers,
  FaRocket,
  FaPhone,
} from "react-icons/fa";
import styles from "./ReadySection.module.css";

const FEATURES = [
  {
    icon: <FaShieldAlt />,
    title: "100% Secure",
    desc: "Enterprise-grade security and NDA protection.",
  },
  {
    icon: <FaUsers />,
    title: "Expert Team",
    desc: "Certified developers with 5+ years experience.",
  },
  {
    icon: <FaRocket />,
    title: "On-Time Delivery",
    desc: "95% of projects delivered on schedule.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Flexible Engagement",
    desc: "Fixed price, T&M, or dedicated team models.",
  },
];

const INDICATORS = [
  { num: "200+", label: "Projects Delivered" },
  { num: "50+", label: "Expert Developers" },
  { num: "98%", label: "Client Satisfaction" },
  { num: "5+", label: "Years Experience" },
];

export default function ReadySection() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        }),
      { threshold: 0.1 },
    );
    cardsRef.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Ready to Start Your Project?</h2>
          <p className={styles.subtitle}>
            Partner with a team that turns your vision into reality. Let's build
            something extraordinary together.
          </p>

          <div className={styles.actionButtons}>
            <Link to="/contact" className={styles.btnPrimary}>
              <FaPhone /> Start a Project
              <FaArrowRight className={styles.btnArrow} />
            </Link>
            <Link to="/about" className={styles.btnSecondary}>
              <FaUsers /> Meet Our Team
              <FaArrowRight className={styles.btnArrow} />
            </Link>
          </div>

          <div className={styles.featuresGrid}>
            {FEATURES.map((f, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className={styles.featureCard}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className={styles.featureIcon}>{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.trustIndicators}>
            {INDICATORS.map((ind, i) => (
              <div key={i} className={styles.indicator}>
                <span className={styles.indicatorNum}>{ind.num}</span>
                <span className={styles.indicatorLabel}>{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
