import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./FaqSection.module.css";

const FAQS = [
  {
    q: "What technologies do you specialize in?",
    a: "We specialize in MERN stack, Python, React Native, Flutter, AWS, Azure, and cutting-edge AI/ML frameworks including TensorFlow, PyTorch, and Hugging Face transformers.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary based on complexity. A basic web app may take 4-8 weeks, while enterprise platforms can take 6-12 months. We provide detailed timelines during our discovery phase.",
  },
  {
    q: "Do you offer post-launch support and maintenance?",
    a: "Yes, we offer comprehensive post-launch support including bug fixes, security patches, performance optimization, and feature enhancements. We have flexible maintenance plans.",
  },
  {
    q: "How do you ensure the security of our project?",
    a: "We implement industry best practices including code reviews, security audits, penetration testing, encrypted data storage, and compliance with GDPR, HIPAA, and SOC 2 standards.",
  },
  {
    q: "What is your development methodology?",
    a: "We follow Agile/Scrum methodology with 2-week sprints, daily standups, and regular client demos. This ensures transparency, rapid iteration, and consistent delivery.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Absolutely! We offer staff augmentation services where our developers seamlessly integrate with your existing team, adopting your tools, workflows, and processes.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Everything you need to know about working with us. Can't find the
            answer? <a href="/contact">Reach out directly.</a>
          </p>
        </div>

        <div className={styles.accordion}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`${styles.item} ${openIdx === i ? styles.active : ""}`}
            >
              <button
                className={styles.question}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span>{faq.q}</span>
                <div
                  className={`${styles.toggleIcon} ${openIdx === i ? styles.rotated : ""}`}
                >
                  <FaChevronDown />
                </div>
              </button>
              <div
                className={`${styles.answer} ${openIdx === i ? styles.answerOpen : ""}`}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
