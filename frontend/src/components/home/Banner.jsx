import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaShieldAlt,
  FaChevronRight,
  FaCogs,
  FaBrain,
  FaUsers,
} from "react-icons/fa";
import styles from "./Banner.module.css";

// Import video correctly
import backgroundVideo from "../../assets/images/backgroundvideo.mp4";

const TYPEWRITER_WORDS = [
  "Job Simulation",
  "Financial AI",
  "Business Services",
];

const PRODUCT_CARDS = [
  {
    icon: <FaCogs />,
    title: "Aprentie Job Engine",
    desc: "From idea to launch, we build products that solve real-world problems and Algorithms. Gain real-world experience while learning with companies offering apprenticeship, trainee.",
    hover:
      "End-to-end development with focus on scalability and user experience.",
  },
  {
    icon: <FaBrain />,
    title: "AI-Driven Consulting",
    desc: "The financial world generates huge volumes of data every second — AI helps convert that data into actionable insights efficiently. Intelligent and deliver business insights for future growth.",
    hover:
      "Custom AI solutions for automation, analytics, and decision making.",
  },
  {
    icon: <FaUsers />,
    title: "Data Solutions",
    desc: "Business Management Services Suites are integrated sets of software and professional services designed to help organizations plan, run, monitor, and optimize their business operations.",
    hover: "Dedicated teams of developers, designers, and QA specialists.",
  },
];

export default function Banner() {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[wordIdx];
    let timeout;
    if (!deleting) {
      if (charIdx < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.substring(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 100);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1500);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.substring(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, 50);
      } else {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % TYPEWRITER_WORDS.length);
        timeout = setTimeout(() => {}, 400);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx]);

  return (
    <section className={styles.banner} id="home">
      {/* Video Background */}
      <div className={styles.videoBg}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.videoEl}
          key={backgroundVideo}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoOverlay}></div>
      </div>

      <div className={styles.container}>
        {/* Content */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <div className={styles.badgeContent}>
              <FaShieldAlt className={styles.badgeIcon} />
              <span>Enterprise Technology Solutions</span>
              <FaChevronRight className={styles.badgeArrow} />
            </div>
          </div>

          <h1 className={styles.heading}>
            <span>Powered by Technology</span>
            <span>
              Delivered by{" "}
              <span className={styles.typewriterContainer}>
                <span className={styles.typewriterText}>{displayText}</span>
                <span className={styles.cursor}>|</span>
              </span>
            </span>
          </h1>

          <p className={styles.desc}>
            Expert software development company delivering custom web
            applications, mobile apps, AI solutions, and enterprise software
            development services to businesses worldwide. Transform your ideas
            into scalable, high-performance software solutions.
          </p>

          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.btnPrimary}>
              <span>Get a Quote</span>
              <span className={styles.arrowAnim}>
                <FaArrowRight />
                <FaArrowRight />
                <FaArrowRight />
              </span>
            </Link>
            <Link to="#" className={styles.btnSecondary}>
              <span>Explore Services</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* Product Cards */}
        <div className={styles.cards} id="products">
          {PRODUCT_CARDS.map((card, i) => (
            <div
              key={i}
              className={`${styles.card} ${hoveredCard === i ? styles.cardHovered : ""}`}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={styles.cardFront}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
              </div>
              <div className={styles.cardBack}>
                <p>{card.hover}</p>
                <a href="#" className={styles.cardLink}>
                  Learn More <FaArrowRight />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
