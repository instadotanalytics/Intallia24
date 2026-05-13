import { useState, useEffect, useRef } from "react";
import {
  FaCode,
  FaHandshake,
  FaChartLine,
  FaUsers,
  FaSearch,
  FaFileAlt,
  FaRocket,
  FaBug,
  FaServer,
  FaShieldAlt,
  FaComments,
  FaProjectDiagram,
  FaChevronDown,
} from "react-icons/fa";
import styles from "./OurWork.module.css";

const PRINCIPLES = [
  {
    icon: <FaCode />,
    title: "Clean Code Standards",
    desc: "We follow SOLID principles, write comprehensive tests, and conduct mandatory code reviews to ensure maintainable, scalable codebases.",
    color: "#10b981",
  },
  {
    icon: <FaHandshake />,
    title: "Transparent Communication",
    desc: "Weekly progress reports, real-time project dashboards, and open Slack channels keep you informed at every step.",
    color: "#06b6d4",
  },
  {
    icon: <FaChartLine />,
    title: "Data-Driven Decisions",
    desc: "Every design choice and technical decision is backed by data — user research, A/B testing, and performance metrics.",
    color: "#8b5cf6",
  },
  {
    icon: <FaUsers />,
    title: "Agile Collaboration",
    desc: "2-week sprints with demos, retrospectives, and backlog grooming sessions ensure continuous alignment with your evolving needs.",
    color: "#f59e0b",
  },
];

const JOURNEY = [
  {
    num: "01",
    icon: <FaSearch />,
    title: "Discovery Call",
    desc: "We understand your business goals, challenges, and technical requirements in a structured 60-minute session.",
  },
  {
    num: "02",
    icon: <FaFileAlt />,
    title: "Proposal & SOW",
    desc: "A detailed statement of work with timelines, milestones, team composition, and transparent pricing.",
  },
  {
    num: "03",
    icon: <FaProjectDiagram />,
    title: "Kickoff & Planning",
    desc: "Sprint planning, tooling setup, environment configuration, and team introductions.",
  },
  {
    num: "04",
    icon: <FaCode />,
    title: "Agile Development",
    desc: "Iterative builds with demos every 2 weeks and continuous feedback integration.",
  },
  {
    num: "05",
    icon: <FaBug />,
    title: "QA & Hardening",
    desc: "Comprehensive testing, security audits, and performance optimization before launch.",
  },
  {
    num: "06",
    icon: <FaRocket />,
    title: "Launch & Support",
    desc: "Smooth production deployment with 24/7 monitoring and dedicated support for the first 30 days.",
  },
];

const COLLABORATIVE = [
  {
    icon: <FaComments />,
    title: "Daily Standups",
    desc: "15-minute async or live standups to surface blockers and share progress across the team.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Quality Gates",
    desc: "Every PR goes through automated linting, tests, and peer code review before merging.",
  },
  {
    icon: <FaServer />,
    title: "CI/CD Pipelines",
    desc: "Automated build, test, and deployment pipelines ensure safe, fast, and repeatable releases.",
  },
  {
    icon: <FaUsers />,
    title: "Client Demos",
    desc: "Bi-weekly sprint demos keep you in the loop and give you early access to review working software.",
  },
];

const DEV_PROCESS = [
  {
    title: "Sprint Planning",
    desc: "Define sprint goals, estimate user stories, and assign tasks at the start of every 2-week sprint.",
    badge: "Every 2 Weeks",
  },
  {
    title: "Daily Development",
    desc: "Focused coding sessions with pair programming and continuous integration throughout the sprint.",
    badge: "Daily",
  },
  {
    title: "Sprint Review",
    desc: "Live demo of completed features with stakeholder feedback integrated into the next sprint backlog.",
    badge: "End of Sprint",
  },
];

const FAQS = [
  {
    q: "How do you handle changing requirements mid-project?",
    a: "We embrace change through our Agile process. Scope changes are logged, estimated, and prioritized in the next sprint. We never let requirement changes cause delivery surprises — everything is transparent and agreed upon upfront.",
  },
  {
    q: "What project management tools do you use?",
    a: "We adapt to your preferred tools — Jira, Linear, Notion, Trello, or Asana. We set up a shared workspace with real-time sprint boards, burndown charts, and milestone trackers visible to your entire team.",
  },
  {
    q: "Do you provide documentation?",
    a: "Yes — always. We deliver inline code comments, API documentation (Swagger/Postman), architecture decision records (ADRs), deployment runbooks, and user guides as part of every project handover.",
  },
];

export default function OurWork() {
  const [openFaq, setOpenFaq] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.cardVisible);
        }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    cardRefs.current.forEach((c) => c && obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>How We Work</h1>
          <p className={styles.heroSubtitle}>
            Our methodology is built on decades of combined experience, best
            practices, and a genuine commitment to delivering results that
            matter — on time and on budget.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Core Principles</h2>
            <p className={styles.sectionSub}>
              Four pillars that underpin every project we take on
            </p>
          </div>
          <div className={styles.principlesGrid}>
            {PRINCIPLES.map((p, i) => (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                className={styles.principleCard}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className={styles.principleIcon}
                  style={{ background: `${p.color}22`, color: p.color }}
                >
                  {p.icon}
                </div>
                <div
                  className={styles.principleAccent}
                  style={{ background: p.color }}
                />
                <h3 className={styles.principleTitle}>{p.title}</h3>
                <p className={styles.principleDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Journey */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Your Journey With Us</h2>
            <p className={styles.sectionSub}>
              A transparent, structured process from first contact to long-term
              partnership
            </p>
          </div>
          <div className={styles.journeyGrid}>
            {JOURNEY.map((j, i) => (
              <div
                key={i}
                ref={(el) => (cardRefs.current[PRINCIPLES.length + i] = el)}
                className={styles.journeyCard}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className={styles.journeyBadge}>{j.num}</div>
                <div className={styles.journeyIcon}>{j.icon}</div>
                <h3 className={styles.journeyTitle}>{j.title}</h3>
                <p className={styles.journeyDesc}>{j.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborative Practices */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Collaborative Practices</h2>
            <p className={styles.sectionSub}>
              How we keep quality high and everyone aligned throughout the
              project
            </p>
          </div>
          <div className={styles.collaborativeGrid}>
            {COLLABORATIVE.map((c, i) => (
              <div
                key={i}
                ref={(el) =>
                  (cardRefs.current[PRINCIPLES.length + JOURNEY.length + i] =
                    el)
                }
                className={styles.collaborativeCard}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={styles.collaborativeIcon}>{c.icon}</div>
                <h3 className={styles.collaborativeTitle}>{c.title}</h3>
                <p className={styles.collaborativeDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dev Process */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Development Rhythm</h2>
            <p className={styles.sectionSub}>
              Agile sprints keep delivery predictable and quality consistent
            </p>
          </div>
          <div className={styles.devProcessGrid}>
            {DEV_PROCESS.map((d, i) => (
              <div key={i} className={styles.devProcessCard}>
                <span className={styles.devBadge}>{d.badge}</span>
                <h3 className={styles.devTitle}>{d.title}</h3>
                <p className={styles.devDesc}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.faqContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqList}>
            {FAQS.map((f, i) => (
              <div
                key={i}
                className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ""}`}
              >
                <button
                  className={styles.faqQ}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <FaChevronDown
                    className={`${styles.faqChevron} ${openFaq === i ? styles.faqChevronOpen : ""}`}
                  />
                </button>
                <div
                  className={`${styles.faqA} ${openFaq === i ? styles.faqAOpen : ""}`}
                >
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
