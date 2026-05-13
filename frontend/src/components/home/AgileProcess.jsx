import { useEffect, useRef } from "react";
import {
  FaSearch,
  FaDraftingCompass,
  FaCode,
  FaVial,
  FaRocket,
  FaCheck,
} from "react-icons/fa";
import styles from "./AgileProcess.module.css";

const TIMELINE = [
  { icon: <FaSearch />, label: "Discovery" },
  { icon: <FaDraftingCompass />, label: "Design" },
  { icon: <FaCode />, label: "Develop" },
  { icon: <FaVial />, label: "Test" },
  { icon: <FaRocket />, label: "Launch" },
];

const PROCESS_CARDS = [
  {
    num: "01",
    title: "Discovery & Planning",
    desc: "We begin with a thorough analysis of your business requirements, goals, and constraints.",
    side: "left",
    activities: [
      "Stakeholder interviews & workshops",
      "Market & competitor research",
      "Technical feasibility assessment",
      "Project roadmap creation",
    ],
  },
  {
    num: "02",
    title: "Design & Prototyping",
    desc: "Our design team creates intuitive UI/UX designs with interactive prototypes for early feedback.",
    side: "right",
    activities: [
      "Wireframing & user flows",
      "UI/UX design system creation",
      "Interactive prototype development",
      "Design review & iterations",
    ],
  },
  {
    num: "03",
    title: "Agile Development",
    desc: "Development in 2-week sprints ensures continuous delivery and rapid adaptability.",
    side: "left",
    activities: [
      "Sprint planning & backlog grooming",
      "Daily standups & progress tracking",
      "Continuous integration & delivery",
      "Code reviews & documentation",
    ],
  },
  {
    num: "04",
    title: "Quality Assurance",
    desc: "Comprehensive testing across all levels to ensure a flawless, production-ready product.",
    side: "right",
    activities: [
      "Automated unit & integration tests",
      "Performance & load testing",
      "Security vulnerability scanning",
      "User acceptance testing (UAT)",
    ],
  },
  {
    num: "05",
    title: "Deployment & Support",
    desc: "Smooth deployment to production with ongoing monitoring, maintenance, and enhancements.",
    side: "left",
    activities: [
      "CI/CD pipeline deployment",
      "Infrastructure setup & scaling",
      "Performance monitoring & alerts",
      "Post-launch support & updates",
    ],
  },
];

export default function AgileProcess() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.animated);
        }),
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );
    cardsRef.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Agile Development Process</h2>
          <p className={styles.desc}>
            A proven, iterative approach that ensures transparency, quality, and
            on-time delivery for every project we undertake.
          </p>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          <div className={styles.timelineItems}>
            {TIMELINE.map((t, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineIcon}>{t.icon}</div>
                <span className={styles.timelineLabel}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Cards */}
        <div className={styles.cardsContainer}>
          {PROCESS_CARDS.map((card, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`${styles.card} ${card.side === "left" ? styles.cardLeft : styles.cardRight}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className={styles.cardNum}>Phase {card.num}</span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
              <h4 className={styles.activitiesTitle}>Key Activities</h4>
              <ul className={styles.activitiesList}>
                {card.activities.map((a) => (
                  <li key={a}>
                    <FaCheck className={styles.checkIcon} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
