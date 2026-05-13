import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaRobot,
  FaLaptopCode,
  FaDatabase,
  FaMobileAlt,
  FaCogs,
} from "react-icons/fa";
import styles from "./Services.module.css";

// Image URLs from Picsum (Royalty Free)
// You should replace these with your actual optimized service images
const imageMap = {
  data: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600", // Data visualization abstract
  ai: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600", // AI Brain/Neural
  web: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600", // Code on screen
  engineering:
    "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600", // Server/Cloud
  mobile:
    "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=600", // Person holding phone
  automation:
    "https://images.pexels.com/photos/3735702/pexels-photo-3735702.jpeg?auto=compress&cs=tinysrgb&w=600", // Robotic arm/gears
};

const SERVICES = [
  {
    icon: <FaChartLine />,
    title: "Data Science & Analytics",
    desc: "Transform raw data into actionable insights with advanced analytics and visualization tools.",
    path: "/services/data-science-analytics",
    bgImage: imageMap.data,
  },
  {
    icon: <FaRobot />,
    title: "AI / ML Engineering",
    desc: "Build intelligent systems with machine learning and AI algorithms for automation and personalization.",
    path: "/services/ai-ml-engineering",
    bgImage: imageMap.ai,
  },
  {
    icon: <FaLaptopCode />,
    title: "Data Intelligence Solutions",
    desc: "High-performance, secure, and scalable data solutions built with modern technologies and frameworks.",
    path: "/services/data-intelligence-solutions",
    bgImage: imageMap.web,
  },
  {
    icon: <FaDatabase />,
    title: "Data Engineering Solutions",
    desc: "Design and implement robust data pipelines and infrastructure for seamless data processing.",
    path: "/services/data-engineering",
    bgImage: imageMap.engineering,
  },
  {
    icon: <FaMobileAlt />,
    title: "AI Consulting",
    desc: "Leverage the power of artificial intelligence to drive innovation and efficiency in your business.",
    path: "/services/ai-consulting",
    bgImage: imageMap.mobile,
  },
  {
    icon: <FaCogs />,
    title: "Automation & Workflows",
    desc: "Streamline business processes with automated workflows and intelligent process automation solutions.",
    path: "/services/automation-workflows",
    bgImage: imageMap.automation,
  },
];

export default function Services() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    cardsRef.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        {/* Header Section - Kept same structure but updated styles */}
        <div className={styles.header}>
          <div className={styles.headingWrapper}>
            <div className={styles.headingIcon}>
              <FaCogs />
            </div>
            <h2 className={styles.headingLabel}>Our Services</h2>
          </div>
          <h1 className={styles.mainHeading}>
            Enterprise Software Development Services
          </h1>
          <p className={styles.desc}>
            End-to-end custom software development tailored to your business
            needs
          </p>
        </div>

        {/* Grid Section */}
        <div className={styles.grid}>
          {SERVICES.map((s, i) => (
            <Link
              to={s.path}
              key={i}
              className={styles.cardLink}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className={styles.card}
                style={{ backgroundImage: `url(${s.bgImage})` }}
              >
                {/* Overlay for text readability */}
                <div className={styles.overlay} />

                {/* Content */}
                <div className={styles.cardIcon}>{s.icon}</div>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>

                {/* Learn More Indicator */}
                <span className={styles.learnMore}>
                  Learn More <span className={styles.arrow}>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
