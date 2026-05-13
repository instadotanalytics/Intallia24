import { useEffect, useRef, useState } from "react";
import { FaTrophy, FaRocket, FaChartBar } from "react-icons/fa";
import styles from "./SuccessStories.module.css";

const STORIES = [
  {
    icon: <FaRocket />,
    title: "FinTech Startup Scaling",
    industry: "Financial Services",
    challenge:
      "The client needed to scale their payment infrastructure to handle 10x growth.",
    solution:
      "We built a microservices-based architecture with auto-scaling capabilities.",
    stats: [
      { value: 10, suffix: "x", label: "Faster Processing" },
      { value: 99.9, suffix: "%", label: "Uptime Achieved" },
      { value: 40, suffix: "%", label: "Cost Reduction" },
    ],
  },
  {
    icon: <FaChartBar />,
    title: "Healthcare AI Platform",
    industry: "Healthcare & MedTech",
    challenge:
      "Hospital needed AI-assisted diagnostics to reduce misdiagnosis rates.",
    solution:
      "We developed an ML model trained on millions of medical records for accurate predictions.",
    stats: [
      { value: 96, suffix: "%", label: "Accuracy Rate" },
      { value: 3, suffix: "x", label: "Faster Diagnosis" },
      { value: 1.2, suffix: "M", label: "Patients Served" },
    ],
  },
  {
    icon: <FaTrophy />,
    title: "E-Commerce Transformation",
    industry: "Retail & E-Commerce",
    challenge:
      "Legacy platform couldn't handle peak sale traffic leading to revenue loss.",
    solution:
      "Complete platform rewrite with cloud-native architecture and CDN optimization.",
    stats: [
      { value: 5, suffix: "x", label: "Traffic Handled" },
      { value: 35, suffix: "%", label: "Revenue Increase" },
      { value: 0.8, suffix: "s", label: "Page Load Time" },
    ],
  },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const isDecimal = target % 1 !== 0;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCount(
              isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current),
            );
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function SuccessStories() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.pill}>
          <div className={styles.pillIcon}>
            <FaTrophy />
          </div>
          <span>Success Stories</span>
        </div>
        <h2 className={styles.title}>Client Success Stories</h2>
        <p className={styles.subtitle}>
          Real results from real projects — see how we've helped businesses
          transform their operations.
        </p>

        <div className={styles.cards}>
          {STORIES.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardIconWrap}>{s.icon}</div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <span className={styles.industryTag}>{s.industry}</span>

              <div className={styles.contentSection}>
                <p className={styles.label}>CHALLENGE</p>
                <p className={styles.text}>{s.challenge}</p>
              </div>

              <div className={styles.contentSection}>
                <p className={styles.label}>OUR SOLUTION</p>
                <p className={styles.text}>{s.solution}</p>
              </div>

              <div className={styles.stats}>
                {s.stats.map((stat, j) => (
                  <div key={j} className={styles.statItem}>
                    <div className={styles.statNum}>
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>
                    <small className={styles.statLabel}>{stat.label}</small>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
