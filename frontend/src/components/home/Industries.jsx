import { useState, useEffect, useRef, useCallback } from "react";
import {
  FaHeartbeat,
  FaGraduationCap,
  FaShoppingCart,
  FaUniversity,
  FaIndustry,
  FaTruck,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
} from "react-icons/fa";
import styles from "./Industries.module.css";

const INDUSTRIES = [
  {
    icon: <FaHeartbeat />,
    color: "#ef4444",
    title: "Healthcare & MedTech",
    desc: "Transforming healthcare delivery with HIPAA-compliant software, telemedicine platforms, and AI-powered diagnostics.",
    features: [
      "EHR/EMR Systems",
      "Telemedicine Platforms",
      "AI Diagnostics",
      "Patient Management",
    ],
    bgGradient: "linear-gradient(135deg, #ef4444, #dc2626)",
  },
  {
    icon: <FaGraduationCap />,
    color: "#3b82f6",
    title: "Education & EdTech",
    desc: "Revolutionizing learning with LMS platforms, interactive content, and AI-driven personalized learning experiences.",
    features: [
      "LMS Platforms",
      "Virtual Classrooms",
      "Student Analytics",
      "E-Learning Tools",
    ],
    bgGradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
  },
  {
    icon: <FaShoppingCart />,
    color: "#f59e0b",
    title: "E-Commerce & Retail",
    desc: "Powering retail growth with scalable e-commerce platforms, inventory management, and customer analytics solutions.",
    features: [
      "E-Commerce Platforms",
      "Inventory Management",
      "Customer Analytics",
      "Payment Integration",
    ],
    bgGradient: "linear-gradient(135deg, #f59e0b, #d97706)",
  },
  {
    icon: <FaUniversity />,
    color: "#8b5cf6",
    title: "Finance & FinTech",
    desc: "Delivering secure, compliant financial technology including banking platforms, payment systems, and investment tools.",
    features: [
      "Banking Platforms",
      "Payment Systems",
      "Risk Management",
      "Investment Analytics",
    ],
    bgGradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  },
  {
    icon: <FaIndustry />,
    color: "#10b981",
    title: "Manufacturing & IoT",
    desc: "Optimizing manufacturing with IoT integration, predictive maintenance, and real-time production monitoring systems.",
    features: [
      "IoT Integration",
      "Predictive Maintenance",
      "Production Monitoring",
      "Supply Chain Optimization",
    ],
    bgGradient: "linear-gradient(135deg, #10b981, #059669)",
  },
  {
    icon: <FaTruck />,
    color: "#06b6d4",
    title: "Logistics & Supply Chain",
    desc: "Streamlining logistics operations with route optimization, real-time tracking, and automated warehouse management.",
    features: [
      "Route Optimization",
      "Real-time Tracking",
      "Warehouse Management",
      "Fleet Management",
    ],
    bgGradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
  },
];

const TOTAL = INDUSTRIES.length;

export default function Industries() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd]     = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Refs — inhe update karne se re-render nahi hota
  const isHoveredRef = useRef(false);
  const timerRef     = useRef(null);

  // ── FIX 1: functional update → stale closure nahi hoga ──────────
  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % TOTAL);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + TOTAL) % TOTAL);
  }, []);

  const goToSlide = useCallback((index) => {
    setActiveIdx(index);
  }, []);

  // ── FIX 2: auto-play — timer interval ke andar hover check ──────
  const stopAuto = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    timerRef.current = setInterval(() => {
      // sirf tab slide karo jab hover nahi hai
      if (!isHoveredRef.current) {
        setActiveIdx((prev) => (prev + 1) % TOTAL);
      }
    }, 2000);
  }, [stopAuto]);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  // ── Hover handlers (ref update, no re-render) ────────────────────
  const handleMouseEnterCarousel = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeaveCarousel = () => {
    isHoveredRef.current = false;
    // drag bhi reset karo agar cursor bahar gaya
    setIsDragging(false);
    setTouchStart(0);
    setTouchEnd(0);
  };

  // ── Touch swipe ──────────────────────────────────────────────────
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    setTouchStart(0);
    setTouchEnd(0);
  };

  // ── Mouse drag ───────────────────────────────────────────────────
  const handleMouseDown = (e) => {
    setTouchStart(e.clientX);
    setTouchEnd(e.clientX);
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    setIsDragging(false);
    setTouchStart(0);
    setTouchEnd(0);
  };

  // ── Visible cards ────────────────────────────────────────────────
  const getVisibleIndices = () =>
    [-2, -1, 0, 1, 2].map((pos) => ({
      index: (activeIdx + pos + TOTAL) % TOTAL,
      position: pos,
    }));

  // position number → CSS class name
  // CSS modules mein hyphen allowed nahi, isliye neg prefix
  const posClass = (pos) => {
    if (pos === -2) return styles["position-2"];
    if (pos === -1) return styles["position-1"];
    if (pos ===  0) return styles["position0"];
    if (pos ===  1) return styles["position1"];
    if (pos ===  2) return styles["position2"];
    return "";
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <FaIndustry />
            <span>Industries We Serve</span>
          </div>
          <h1 className={styles.title}>
            <span className={styles.titleLight}>
              Transforming Industries with
            </span>
            <span className={styles.gradientText}> Intelligent Solutions</span>
          </h1>
          <p className={styles.subtitle}>
            Delivering domain-specific software solutions that address unique
            business challenges, industry workflows, and regulatory compliance
            requirements.
          </p>
        </div>

        {/* Carousel — single onMouseLeave, no conflict */}
        <div
          className={styles.carouselContainer}
          onMouseEnter={handleMouseEnterCarousel}
          onMouseLeave={handleMouseLeaveCarousel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Prev button */}
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>

          {/* Next button */}
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            aria-label="Next slide"
          >
            <FaChevronRight />
          </button>

          {/* Cards */}
          <div className={styles.cardsWrapper}>
            {getVisibleIndices().map(({ index, position }) => {
              const industry = INDUSTRIES[index];
              const isActive = position === 0;

              return (
                <div
                  key={`${index}-${position}`}
                  className={`${styles.cardWrapper} ${posClass(position)} ${isActive ? styles.active : ""}`}
                  onClick={() => !isActive && goToSlide(index)}
                >
                  <div
                    className={styles.card}
                    style={{
                      background: isActive ? industry.bgGradient : "#ffffff",
                      borderColor: isActive ? "transparent" : industry.color + "20",
                    }}
                  >
                    {isActive ? (
                      <>
                        <div className={styles.cardIconLarge}>{industry.icon}</div>
                        <h3 className={styles.cardTitle}>{industry.title}</h3>
                        <p className={styles.cardDesc}>{industry.desc}</p>
                        <ul className={styles.featureList}>
                          {industry.features.map((feature) => (
                            <li key={feature}>
                              <FaCheck className={styles.checkIcon} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <div className={styles.inactiveContent}>
                        <div
                          className={styles.cardIconSmall}
                          style={{ background: industry.color }}
                        >
                          {industry.icon}
                        </div>
                        <h4 className={styles.cardTitleSmall}>
                          {industry.title}
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress dots */}
          <div className={styles.progressBar}>
            {INDUSTRIES.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.progressDot} ${idx === activeIdx ? styles.activeDot : ""}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span className={styles.dotInner} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}