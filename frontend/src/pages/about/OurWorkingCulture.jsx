import { useEffect, useRef } from "react";
import {
  FaSmile,
  FaGraduationCap,
  FaLeaf,
  FaCode,
  FaCoffee,
  FaGamepad,
  FaTrophy,
  FaHeart,
  FaLaptopHouse,
  FaMedkit,
  FaPlane,
  FaChartLine,
} from "react-icons/fa";
import useCounter from "../../hooks/useCounter";
import styles from "./OurWorkingCulture.module.css";

const DIFFERENT_CARDS = [
  {
    icon: <FaSmile />,
    title: "Work-Life Balance",
    desc: "Flexible hours, remote-first culture, and respect for personal time. We believe happy teams build better products.",
    gradient: "linear-gradient(135deg,#43e97b,#38f9d7)",
  },
  {
    icon: <FaGraduationCap />,
    title: "Continuous Learning",
    desc: "Annual learning budget, internal tech talks, conference attendance, and structured mentorship programs.",
    gradient: "linear-gradient(135deg,#4facfe,#00f2fe)",
  },
  {
    icon: <FaLeaf />,
    title: "Sustainability",
    desc: "Remote-first minimizes commute emissions. We offset our digital carbon footprint and partner with eco-conscious clients.",
    gradient: "linear-gradient(135deg,#a18cd1,#fbc2eb)",
  },
  {
    icon: <FaCode />,
    title: "Open Source Culture",
    desc: "We contribute to and maintain open-source projects, fostering community growth and technical innovation.",
    gradient: "linear-gradient(135deg,#ffecd2,#fcb69f)",
  },
  {
    icon: <FaCoffee />,
    title: "Async-First",
    desc: "Thoughtful async communication over endless meetings. We respect deep work time and trust our teams.",
    gradient: "linear-gradient(135deg,#a1c4fd,#c2e9fb)",
  },
  {
    icon: <FaGamepad />,
    title: "Fun & Community",
    desc: "Virtual game nights, team retreats, hackathons, and a supportive Slack culture that celebrates wins together.",
    gradient: "linear-gradient(135deg,#f6d365,#fda085)",
  },
];

const STATS = [
  {
    value: 96,
    suffix: "%",
    label: "Employee Satisfaction",
    sub: "Based on annual surveys",
  },
  {
    value: 2.5,
    suffix: "x",
    label: "Career Growth Rate",
    sub: "vs industry average",
  },
  {
    value: 4.8,
    suffix: "/5",
    label: "Culture Rating",
    sub: "Glassdoor & internal",
  },
  {
    value: 32,
    suffix: "hrs",
    label: "Avg Work Week",
    sub: "No crunch culture",
  },
];

const PERKS = [
  {
    icon: <FaLaptopHouse />,
    title: "Remote-First",
    desc: "Work from anywhere in the world. We support your home office with a $1,000 setup stipend.",
  },
  {
    icon: <FaMedkit />,
    title: "Health & Wellness",
    desc: "Comprehensive health insurance, mental health days, and a wellness reimbursement program.",
  },
  {
    icon: <FaPlane />,
    title: "Paid Time Off",
    desc: "25 days PTO + local public holidays + birthday off. We want you rested and recharged.",
  },
  {
    icon: <FaTrophy />,
    title: "Performance Bonuses",
    desc: "Transparent bonus structure tied to company and individual performance milestones.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Learning Budget",
    desc: "$2,000/year for courses, certifications, books, and conferences of your choice.",
  },
  {
    icon: <FaHeart />,
    title: "Team Retreats",
    desc: "Annual in-person team retreats to bond, align, and celebrate our collective wins together.",
  },
];

const ENVIRONMENT = [
  {
    icon: <FaChartLine />,
    title: "Growth Mindset",
    desc: "Regular performance reviews, clear career ladders, and dedicated time for professional development every sprint.",
  },
  {
    icon: <FaCode />,
    title: "Engineering Excellence",
    desc: "20% time for exploring new tech, contributing to open source, or working on internal tooling improvements.",
  },
  {
    icon: <FaHeart />,
    title: "Psychological Safety",
    desc: "An environment where everyone can speak up, share ideas, make mistakes, and learn without fear of judgment.",
  },
  {
    icon: <FaSmile />,
    title: "Recognition Culture",
    desc: "Peer-to-peer kudos, monthly shoutouts, and leadership recognition for contributions big and small.",
  },
];

function StatCard({ value, suffix, label, sub }) {
  const [ref, count] = useCounter(value);
  return (
    <div className={styles.statCard} ref={ref}>
      <div className={styles.statNum}>
        {count}
        {suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statSub}>{sub}</div>
    </div>
  );
}

export default function OurWorkingCulture() {
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
          <h1 className={styles.heroTitle}>Our Working Culture</h1>
          <p className={styles.heroSubtitle}>
            We've built a culture where people love what they do, grow every
            day, and feel genuinely valued — because great culture builds great
            products.
          </p>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What Makes Us Different</h2>
            <p className={styles.sectionSub}>
              Six principles that define how we show up for our team every
              single day
            </p>
          </div>
          <div className={styles.differentGrid}>
            {DIFFERENT_CARDS.map((c, i) => (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                className={styles.differentCard}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className={styles.differentIcon}
                  style={{ background: c.gradient }}
                >
                  {c.icon}
                </div>
                <h3 className={styles.differentTitle}>{c.title}</h3>
                <p className={styles.differentDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2
              className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}
            >
              Culture By the Numbers
            </h2>
            <p className={`${styles.sectionSub} ${styles.sectionSubLight}`}>
              Data that shows our culture is more than just words
            </p>
          </div>
          <div className={styles.statsGrid}>
            {STATS.map((s, i) => (
              <StatCard key={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Work Environment */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Work Environment</h2>
            <p className={styles.sectionSub}>
              An environment engineered for focus, creativity, and continuous
              growth
            </p>
          </div>
          <div className={styles.environmentGrid}>
            {ENVIRONMENT.map((e, i) => (
              <div
                key={i}
                ref={(el) =>
                  (cardRefs.current[DIFFERENT_CARDS.length + i] = el)
                }
                className={styles.environmentCard}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={styles.environmentIcon}>{e.icon}</div>
                <div>
                  <h3 className={styles.environmentTitle}>{e.title}</h3>
                  <p className={styles.environmentDesc}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Perks & Benefits</h2>
            <p className={styles.sectionSub}>
              We invest in our people because they are our greatest asset
            </p>
          </div>
          <div className={styles.perksGrid}>
            {PERKS.map((p, i) => (
              <div
                key={i}
                ref={(el) =>
                  (cardRefs.current[
                    DIFFERENT_CARDS.length + ENVIRONMENT.length + i
                  ] = el)
                }
                className={styles.perkCard}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className={styles.perkIcon}>{p.icon}</div>
                <h3 className={styles.perkTitle}>{p.title}</h3>
                <p className={styles.perkDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Join Our Team</h2>
          <p className={styles.ctaSub}>
            Ready to be part of a culture that values you? We're always looking
            for passionate technologists.
          </p>
          <a href="mailto:careers@intallia24.com" className={styles.ctaBtn}>
            View Open Positions
          </a>
        </div>
      </section>
    </main>
  );
}
