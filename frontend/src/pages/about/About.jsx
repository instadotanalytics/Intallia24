import { useEffect, useRef, useState } from "react";
import {
  FaEye,
  FaBullseye,
  FaGem,
  FaUsers,
  FaCode,
  FaCloud,
  FaShieldAlt,
  FaLightbulb,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import styles from "./About.module.css";
import siddharthImg from "../../assets/images/profile-pic/siddharth.jpg";
import ranasirImg   from "../../assets/images/profile-pic/ranasir.jpg";
import nipunImg     from "../../assets/images/profile-pic/faiz.jpg";   // jo bhi sahi image ho
import jeetuImg     from "../../assets/images/profile-pic/jeetu.jpg";

const DEVELOPERS_DATA = [
  {
    name: "Siddharth Gupta",
    role: "Co Founder & CTO",
    exp: "15+ years",
    tech: "Data Science, AI/ML",
    img: siddharthImg,
  },
  {
    name: "Prof. Jairaj Singh Rana",
    role: "Director & Founder",
    exp: "25+ years",
    tech: "Statistics and Operations Research",
    img: ranasirImg,
  },
  {
    name: "Nipun Sethi",
    role: "Sales Force Developer, CRM Architect",
    exp: "5+ years",
    tech: "Salesforce, CRM Architect, Cloud Solutions",
    img: nipunImg,
  },
  {
    name: "Jeetendra Sahu",
    role: "MERN Stack Developer",
    exp: "1+ years",
    tech: "MERN Stack, Full-Stack Development",
    img: jeetuImg,
  },
];

const VALUES = [
  {
    icon: <FaLightbulb />,
    title: "Innovation First",
    desc: "We embrace cutting-edge technologies and creative solutions to solve complex business challenges.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Quality & Integrity",
    desc: "Every line of code and every design decision reflects our commitment to excellence and ethical practices.",
  },
  {
    icon: <FaUsers />,
    title: "Client Partnership",
    desc: "We work as an extension of your team, not just a vendor, ensuring alignment with your business goals.",
  },
  {
    icon: <FaCloud />,
    title: "Scalability Focus",
    desc: "We build solutions designed to grow with your business, from startup to enterprise scale.",
  },
];

const NUMBERS = [
  {
    icon: <FaCode />,
    count: 200,
    label: "Projects Delivered",
    desc: "Across 15+ industries globally",
  },
  {
    icon: <FaUsers />,
    count: 50,
    label: "Expert Developers",
    desc: "Full-time engineers & designers",
  },
  {
    icon: <FaCalendarAlt />,
    count: 5,
    label: "Years of Excellence",
    desc: "Building innovative solutions",
  },
  {
    icon: <FaShieldAlt />,
    count: 98,
    label: "Client Satisfaction %",
    desc: "Based on post-project surveys",
  },
];

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const steps = 60;
          const increment = target / steps;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCount(Math.floor(current));
          }, 2000 / steps);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}</span>;
}

const FAQS = [
  {
    q: "What makes Intallia24 different from other tech companies?",
    a: "We combine deep technical expertise with genuine partnership. Our team doesn't just build what you ask — we help you define what to build, ensuring technology serves your business goals.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "We work with both! Our flexible engagement models — from MVP development for startups to large-scale enterprise transformations — make us suitable for any stage of business.",
  },
  {
    q: "How do you handle intellectual property and confidentiality?",
    a: "All our engagements are covered by comprehensive NDAs. Upon project completion, full intellectual property rights are transferred to you. We take IP protection very seriously.",
  },
];

export default function About() {
  const [typeText, setTypeText] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const fullText = "Intallia24";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypeText(fullText.substring(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 120);
    return () => clearInterval(timer);
  }, []);

  const visibleDevs = showAll ? DEVELOPERS_DATA : DEVELOPERS_DATA.slice(0, 8);

  return (
    <main>
      {/* About Section */}
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h1 className={styles.mainHeading}>
              We are{" "}
              <span className={styles.typewriter}>
                {typeText}
                <span className={styles.cursor}>|</span>
              </span>
            </h1>
            <p className={styles.sectionSubtitle}>
              Building Tomorrow's Workforce
            </p>
          </div>
          <div className={styles.aboutContent}>
            <p>
              Intallia24 is a forward-thinking technology company established
              with the vision of building tomorrow's workforce. We combine
              cutting-edge technology with human expertise to deliver solutions
              that transform businesses and create lasting value for our clients
              worldwide.
            </p>
            <p>
              With a team of 50+ dedicated engineers, designers, and data
              scientists, we have successfully delivered 200+ projects across
              healthcare, fintech, e-commerce, education, and manufacturing
              sectors. Our commitment to quality, innovation, and client
              satisfaction drives everything we do.
            </p>
            <p>
              We don't just write code — we craft experiences. Our team of
              passionate technologists brings deep domain expertise and a
              collaborative spirit to every engagement, ensuring your vision
              becomes a market-leading reality.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className={styles.vmSection}>
        <div className={styles.container}>
          <div className={styles.cardsRow}>
            <div className={`${styles.vmCard} ${styles.visionCard}`}>
              <div className={styles.vmHeader}>
                <div className={`${styles.vmIcon} ${styles.visionIcon}`}>
                  <FaEye />
                </div>
                <h2 className={`${styles.vmTitle} ${styles.visionTitle}`}>
                  Our Vision
                </h2>
              </div>
              <p>
                To be the global leader in building tomorrow's tech workforce —
                creating a world where exceptional talent and innovative
                technology work in harmony to solve humanity's greatest
                challenges.
              </p>
              <p>
                We envision a future where every business, regardless of size or
                location, has access to world-class technology expertise and the
                transformative power of digital innovation.
              </p>
            </div>
            <div className={`${styles.vmCard} ${styles.missionCard}`}>
              <div className={styles.vmHeader}>
                <div className={`${styles.vmIcon} ${styles.missionIcon}`}>
                  <FaBullseye />
                </div>
                <h2 className={`${styles.vmTitle} ${styles.missionTitle}`}>
                  Our Mission
                </h2>
              </div>
              <p>
                To empower businesses with innovative software solutions that
                drive growth, efficiency, and competitive advantage — while
                nurturing the next generation of world-class tech professionals.
              </p>
              <p>
                We achieve this through relentless focus on quality, continuous
                learning, and building genuine long-term partnerships with our
                clients based on transparency, trust, and measurable results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleWithIcon}>
              <FaGem className={styles.sectionIcon} />
              <h2 className={styles.sectionTitle}>Our Core Values</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              The principles that guide every decision we make
            </p>
          </div>
          <div className={styles.valuesGrid}>
            {VALUES.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developers */}
      <section className={styles.devsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Meet Our Developers</h2>
            <p className={styles.sectionSubtitle}>
              The talented minds behind every great solution we deliver
            </p>
          </div>
          <div className={styles.devsGrid}>
            {visibleDevs.map((dev, i) => (
              <div key={i} className={styles.devCard}>
                <img src={dev.img} alt={dev.name} className={styles.devImg} />
                <h3 className={styles.devName}>{dev.name}</h3>
                <p className={styles.devRole}>{dev.role}</p>
                <div className={styles.devExp}>
                  <FaCalendarAlt className={styles.expIcon} />
                  <span>{dev.exp}</span>
                </div>
                <span className={styles.devTech}>{dev.tech}</span>
              </div>
            ))}
          </div>
          <div className={styles.viewMoreWrap}>
            <button
              className={`${styles.viewMoreBtn} ${showAll ? styles.active : ""}`}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "View Less Developers" : "View More Developers"}
              {showAll ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className={styles.numbersSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>By the Numbers</h2>
            <p className={styles.sectionSubtitle}>
              Our track record speaks for itself
            </p>
          </div>
          <div className={styles.numbersGrid}>
            {NUMBERS.map((n, i) => (
              <div key={i} className={styles.numberCard}>
                <div className={styles.numberIcon}>{n.icon}</div>
                <div className={styles.numberCount}>
                  <AnimatedCounter target={n.count} />+
                </div>
                <h4 className={styles.numberLabel}>{n.label}</h4>
                <p className={styles.numberDesc}>{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqContainer}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`${styles.faqItem} ${openFaq === i ? styles.faqActive : ""}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <FaChevronDown
                    className={`${styles.faqIcon} ${openFaq === i ? styles.faqIconOpen : ""}`}
                  />
                </button>
                <div
                  className={`${styles.faqAnswer} ${openFaq === i ? styles.faqAnswerOpen : ""}`}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
