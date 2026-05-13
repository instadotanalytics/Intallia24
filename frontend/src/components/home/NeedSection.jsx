import { Link } from "react-router-dom";
import styles from "./NeedSection.module.css";

export default function NeedSection() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          Need Expert Developers for Your Project?
        </h2>
        <p className={styles.subtitle}>
          Our team of skilled engineers, designers, and data scientists is ready
          to bring your vision to life. From startups to enterprises — we scale
          with you.
        </p>
        <div className={styles.buttons}>
          <Link to="/about" className={styles.btn}>
            Meet Our Team
          </Link>
          <Link to="/contact" className={`${styles.btn} ${styles.outline}`}>
            Get in Touch
          </Link>
          <Link to="/services/ai-ml-engineering" className={styles.btn}>
            AI / ML Solutions
          </Link>
          <Link to="/services/website-development" className={styles.btn}>
            Web Development
          </Link>
        </div>
      </div>
    </section>
  );
}
