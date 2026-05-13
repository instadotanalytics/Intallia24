import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaGem,
  FaArrowRight,
  FaLightbulb,
  FaUsers,
  FaHandshake,
  FaBolt,
  FaUserGraduate,
  FaHandsHelping,
  FaChartLine,
  FaSmile,
  FaProjectDiagram,
  FaRetweet,
  FaCode,
  FaMicrochip,
  FaPaintBrush,
  FaComments,
  FaHeart,
  FaGraduationCap,
  FaBalanceScale,
  FaAward,
  FaGlobeAmericas,
  FaTrophy,
  FaMapMarkerAlt,
  FaCogs,
  FaFileCode,
  FaSearch,
  FaSyncAlt,
  FaTachometerAlt,
  FaFlag,
  FaQuestionCircle,
  FaStar,
  FaChevronDown,
  FaRocket,
} from "react-icons/fa";
import styles from "./OurValues.module.css";

const pillars = [
  {
    icon: <FaLightbulb />,
    title: "Be Innovative",
    description:
      "We champion forward-thinking technologies and creative problem-solving to deliver next-generation solutions that anticipate tomorrow's needs.",
    features: [
      "Cutting-edge technology adoption",
      "Creative problem-solving",
      "Future-ready solutions",
      "Continuous R&D investment",
    ],
  },
  {
    icon: <FaUsers />,
    title: "Customer-Centric Mindset",
    description:
      "We put our clients first. Through personalized solutions, proactive support, and a deep understanding of your goals, we build partnerships that last.",
    features: [
      "Personalized solutions",
      "Proactive support",
      "Deep goal understanding",
      "Long-term partnerships",
    ],
  },
  {
    icon: <FaHandshake />,
    title: "Earn Trust Through Reliability",
    description:
      "Transparency, accountability, and consistent results are the pillars of our client relationships—and the reason clients come back.",
    features: [
      "Complete transparency",
      "Full accountability",
      "Consistent results",
      "Reliable partnerships",
    ],
  },
  {
    icon: <FaBolt />,
    title: "Be Agile",
    description:
      "In a world that never stops evolving, we stay flexible and responsive—adapting quickly to market changes while ensuring consistent delivery of value and excellence.",
    features: [
      "Rapid adaptation",
      "Flexible methodologies",
      "Quick market response",
      "Consistent value delivery",
    ],
  },
  {
    icon: <FaUserGraduate />,
    title: "Invest in Talent",
    description:
      "Our people are our greatest asset. We invest in skilled professionals who bring passion, curiosity, and craftsmanship to every line of code.",
    features: [
      "Skilled professionals",
      "Continuous learning",
      "Passion-driven work",
      "Quality craftsmanship",
    ],
  },
  {
    icon: <FaHandsHelping />,
    title: "Collaborate to Innovate",
    description:
      "We foster a culture of shared ownership, open communication, and team-driven problem-solving—because the best ideas are built together.",
    features: [
      "Shared ownership",
      "Open communication",
      "Team problem-solving",
      "Collective innovation",
    ],
  },
];

const stats = [
  {
    icon: <FaSmile />,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Our customer-centric approach delivers results",
  },
  {
    icon: <FaProjectDiagram />,
    value: 20,
    suffix: "",
    label: "Projects Delivered",
    description: "Innovation and agility in every solution",
  },
  {
    icon: <FaUsers />,
    value: 15,
    suffix: "",
    label: "Team Members",
    description: "Talented professionals driving excellence",
  },
  {
    icon: <FaRetweet />,
    value: 95,
    suffix: "%",
    label: "Client Retention",
    description: "Trust and reliability that brings clients back",
  },
];

const cultureCards = [
  {
    icon: <FaLightbulb />,
    title: "Innovation Culture",
    subtitle: "We encourage experimentation and celebrate creative solutions.",
    features: [
      { icon: <FaCode />, text: "Hackathons & Innovation Days" },
      { icon: <FaMicrochip />, text: "Technology Exploration" },
      { icon: <FaPaintBrush />, text: "Creative Freedom" },
      { icon: <FaComments />, text: "Idea Sharing Sessions" },
    ],
  },
  {
    icon: <FaHeart />,
    title: "People First",
    subtitle: "We prioritize our team's growth and well-being.",
    features: [
      { icon: <FaGraduationCap />, text: "Professional Development" },
      { icon: <FaBalanceScale />, text: "Work-Life Balance" },
      { icon: <FaAward />, text: "Recognition Programs" },
      { icon: <FaHandsHelping />, text: "Mental Health Support" },
    ],
  },
  {
    icon: <FaGlobeAmericas />,
    title: "Global Mindset",
    subtitle: "We think globally while acting locally for our clients.",
    features: [
      { icon: <FaUsers />, text: "Diverse Perspectives" },
      { icon: <FaTrophy />, text: "Global Best Practices" },
      { icon: <FaHandsHelping />, text: "Cultural Awareness" },
      { icon: <FaMapMarkerAlt />, text: "Local Market Understanding" },
    ],
  },
  {
    icon: <FaCogs />,
    title: "Technical Excellence",
    subtitle: "We maintain the highest standards in everything we build.",
    features: [
      { icon: <FaFileCode />, text: "Code Quality Standards" },
      { icon: <FaSearch />, text: "Peer Reviews" },
      { icon: <FaSyncAlt />, text: "Continuous Integration" },
      { icon: <FaTachometerAlt />, text: "Performance Optimization" },
    ],
  },
];

const beliefs = [
  {
    icon: <FaFlag />,
    title: "Ownership",
    description:
      "We take responsibility for our work and its impact, ensuring accountability and commitment to excellence in every project.",
  },
  {
    icon: <FaQuestionCircle />,
    title: "Curiosity",
    description:
      "We question, explore, and never stop learning. Continuous improvement and innovation drive our approach to problem-solving.",
  },
  {
    icon: <FaStar />,
    title: "Excellence",
    description:
      "We strive for perfection in every detail, maintaining the highest standards of quality in our work and deliverables.",
  },
  {
    icon: <FaComments />,
    title: "Communication",
    description:
      "We believe in clear, honest, and open dialogue that fosters transparency, collaboration, and mutual understanding.",
  },
];

const faqs = [
  {
    question: "What are Intallia24's core values?",
    answer:
      "Our six core values guide everything we do: Be Innovative (championing forward-thinking technologies), Be Agile (staying flexible and responsive to change), Customer-Centric Mindset (putting clients first), Invest in Talent (nurturing our people), Earn Trust Through Reliability (transparency and accountability), and Collaborate to Innovate (team-driven problem-solving). These aren't just words—they're reflected in our daily decisions and actions.",
  },
  {
    question: "How does Intallia24 foster innovation?",
    answer:
      "We foster innovation through regular hackathons, innovation days, dedicated R&D time, technology exploration sessions, and a culture that encourages creative problem-solving. Our teams are empowered to experiment with new technologies and approaches, and we celebrate both successes and learning opportunities from experiments.",
  },
  {
    question: "What does customer-centricity mean at Intallia24?",
    answer:
      "Customer-centricity means truly understanding our clients' business goals, challenges, and success metrics. We go beyond just delivering code to become strategic partners who proactively identify opportunities, provide regular progress updates, and adapt to changing needs. Our success is measured by our clients' success.",
  },
  {
    question: "How do you maintain work-life balance?",
    answer:
      "We promote work-life balance through flexible work hours, remote work options, mental health support programs, and a culture that respects personal time. We encourage our team members to take regular breaks, use their vacation time, and maintain healthy boundaries between work and personal life.",
  },
  {
    question: "What is the team collaboration culture like?",
    answer:
      "Our collaboration culture is built on mutual respect, open communication, and shared ownership. We practice regular team sync-ups, pair programming, code reviews, and cross-functional collaboration. We believe that diverse perspectives lead to better solutions, and we create psychological safety for team members to share ideas and feedback.",
  },
  {
    question: "How does Intallia24 invest in talent development?",
    answer:
      "We invest in talent through continuous learning opportunities, mentorship programs, conference sponsorships, certification support, and regular skill development sessions. Each team member has a personalized development plan, and we provide resources and time for professional growth aligned with both individual career goals and company needs.",
  },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);

  useState(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function OurValues() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleWithIcon}>
              <FaGem className={styles.heroIcon} />
              <h1 className={styles.mainHeading}>Our Values</h1>
            </div>
            <p className={styles.sectionSubtitle}>
              At Intallia24, our values are the guiding principles behind
              everything we do—from the way we build products to how we
              collaborate with clients and nurture our team.
            </p>
            <div className={styles.valuesIntro}>
              <p>
                These core values shape our culture, guide our decisions, and
                drive our commitment to delivering exceptional results for every
                client.
              </p>
            </div>
            <Link to="/contact" className={styles.joinTeamBtn}>
              Join Our Team <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Six Pillars Section */}
      <section className={styles.pillarsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Six Pillars of Excellence</h2>
            <p className={styles.sectionSubtitle}>
              These core values shape our culture, guide our decisions, and
              drive our commitment to delivering exceptional results for every
              client.
            </p>
          </div>
          <div className={styles.pillarsCards}>
            {pillars.map((pillar, index) => (
              <div key={index} className={styles.pillarCard}>
                <div className={styles.pillarIcon}>{pillar.icon}</div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDescription}>{pillar.description}</p>
                <div className={styles.pillarFeatures}>
                  {pillar.features.map((feature, idx) => (
                    <span key={idx}>
                      <FaHandshake className={styles.checkIcon} />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values in Action Section */}
      <section className={styles.valuesActionSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleWithIcon}>
              <FaChartLine className={styles.actionIcon} />
              <h2 className={styles.sectionTitle}>Values in Action</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              Our values aren't just words on a wall—they're reflected in our
              results and the relationships we build with clients and team
              members alike.
            </p>
          </div>
          <div className={styles.valuesActionIntro}>
            <p>
              These numbers represent the tangible outcomes of living our values
              every day. They demonstrate our commitment to excellence,
              innovation, and building lasting relationships.
            </p>
          </div>
          <div className={styles.valuesStatsCards}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.valuesStatCard}>
                <div className={styles.valuesStatIcon}>{stat.icon}</div>
                <h3 className={styles.valuesStatCount}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </h3>
                <p className={styles.valuesStatLabel}>{stat.label}</p>
                <p className={styles.valuesStatDescription}>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thriving Culture Section */}
      <section className={styles.cultureSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Building a Thriving Culture</h2>
            <p className={styles.sectionSubtitle}>
              Our values create a culture where innovation flourishes, people
              grow, and exceptional work becomes the natural outcome.
            </p>
          </div>
          <div className={styles.cultureIntro}>
            <p>
              We foster an environment that encourages creativity, supports
              growth, and celebrates achievements. Our culture is built on
              mutual respect, collaboration, and a shared passion for
              excellence.
            </p>
          </div>
          <div className={styles.cultureCards}>
            {cultureCards.map((card, index) => (
              <div key={index} className={styles.cultureCard}>
                <div className={styles.cultureCardHeader}>
                  <div className={styles.cultureCardIcon}>{card.icon}</div>
                  <h3 className={styles.cultureCardTitle}>{card.title}</h3>
                  <p className={styles.cultureCardSubtitle}>{card.subtitle}</p>
                </div>
                <div className={styles.cultureCardFeatures}>
                  {card.features.map((feature, idx) => (
                    <span key={idx}>
                      <span className={styles.featureIcon}>{feature.icon}</span>
                      {feature.text}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe In Section */}
      <section className={styles.beliefsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What We Believe In</h2>
            <p className={styles.sectionSubtitle}>
              These fundamental beliefs shape how we work together and approach
              every challenge.
            </p>
          </div>
          <div className={styles.beliefsIntro}>
            <p>
              Our beliefs guide our daily interactions, decision-making
              processes, and overall approach to delivering exceptional value to
              our clients and team members.
            </p>
          </div>
          <div className={styles.beliefsCards}>
            {beliefs.map((belief, index) => (
              <div key={index} className={styles.beliefCard}>
                <div className={styles.beliefIcon}>{belief.icon}</div>
                <h3 className={styles.beliefTitle}>{belief.title}</h3>
                <p className={styles.beliefDescription}>{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Values & Culture FAQ</h2>
            <p className={styles.sectionSubtitle}>
              Learn more about our values and company culture
            </p>
          </div>
          <div className={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${activeFaq === index ? styles.active : ""}`}
              >
                <div
                  className={styles.faqQuestion}
                  onClick={() => toggleFaq(index)}
                >
                  <h3>{faq.question}</h3>
                  <FaChevronDown className={styles.faqIcon} />
                </div>
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Experience{" "}
              <span className={styles.highlight}>Values-Driven</span>{" "}
              Excellence?
            </h2>
            <p className={styles.ctaSubtitle}>
              Join us in building something extraordinary. Our values aren't
              just principles—they're the foundation of every successful
              partnership we create.
            </p>
            <div className={styles.ctaButtons}>
              <Link
                to="/contact"
                className={`${styles.ctaBtn} ${styles.primaryBtn}`}
              >
                Join Our Team <FaUsers />
              </Link>
              <Link
                to="/contact"
                className={`${styles.ctaBtn} ${styles.secondaryBtn}`}
              >
                Start Your Project <FaRocket />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
