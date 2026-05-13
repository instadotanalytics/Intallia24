import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaChevronDown, FaArrowRight, FaPhone } from "react-icons/fa";
import styles from "./ServicePageTemplate.module.css";

/**
 * Reusable template for all service pages.
 * Props:
 *  - hero: { badge, title, subtitle, stats: [{value, suffix, label}] }
 *  - services: [{icon, title, desc}]
 *  - techStack: [{icon, name, category}]
 *  - processSteps: [{num, title, desc, activities:[]}]
 *  - faqs: [{q, a}]
 *  - color: primary accent color hex
 */

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const isDecimal = String(target).includes(".");
          let cur = 0;
          const steps = 60;
          const inc = target / steps;
          const timer = setInterval(() => {
            cur += inc;
            if (cur >= target) {
              cur = target;
              clearInterval(timer);
            }
            setCount(isDecimal ? parseFloat(cur.toFixed(1)) : Math.floor(cur));
          }, 2000 / steps);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function ServicePageTemplate({
  hero,
  services,
  techStack,
  processSteps,
  faqs,
  color = "#10b981",
}) {
  const [openFaq, setOpenFaq] = useState(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.cardVisible);
        }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );
    cardsRef.current.forEach((c) => c && obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className={styles.hero} style={{ "--accent": color }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContainer}>
          {hero.badge && <div className={styles.heroBadge}>{hero.badge}</div>}
          <h1 className={styles.heroTitle}>{hero.title}</h1>
          <p className={styles.heroSubtitle}>{hero.subtitle}</p>

          {hero.stats && (
            <div className={styles.heroStats}>
              {hero.stats.map((s, i) => (
                <div key={i} className={styles.heroStat}>
                  <div className={styles.heroStatNum}>
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className={styles.heroStatLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.heroCtas}>
            <Link to="/#contact" className={styles.ctaPrimary}>
              <FaPhone /> Start Your Project <FaArrowRight />
            </Link>
            <Link to="/#contact" className={styles.ctaSecondary}>
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services / Offerings ── */}
      {services && services.length > 0 && (
        <section className={styles.servicesSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>What We Offer</h2>
            <p className={styles.sectionSub}>
              Comprehensive solutions tailored to your specific needs
            </p>
            <div className={styles.servicesGrid}>
              {services.map((svc, i) => (
                <div
                  key={i}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className={styles.serviceCard}
                  style={{ transitionDelay: `${i * 0.08}s`, "--accent": color }}
                >
                  <div
                    className={styles.serviceIcon}
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}44)`,
                      color,
                    }}
                  >
                    {svc.icon}
                  </div>
                  <h3 className={styles.serviceTitle}>{svc.title}</h3>
                  <p className={styles.serviceDesc}>{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Tech Stack ── */}
      {techStack && techStack.length > 0 && (
        <section className={styles.techSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Technologies We Use</h2>
            <p className={styles.sectionSub}>
              Industry-leading tools and frameworks for best-in-class solutions
            </p>
            <div className={styles.techGrid}>
              {techStack.map((t, i) => (
                <div key={i} className={styles.techCard}>
                  <div className={styles.techIcon} style={{ color }}>
                    {t.icon}
                  </div>
                  <div className={styles.techName}>{t.name}</div>
                  {t.category && (
                    <div className={styles.techCategory}>{t.category}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Process ── */}
      {processSteps && processSteps.length > 0 && (
        <section className={styles.processSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Process</h2>
            <p className={styles.sectionSub}>
              A structured approach that delivers consistent, high-quality
              results
            </p>
            <div className={styles.processGrid}>
              {processSteps.map((step, i) => (
                <div
                  key={i}
                  className={styles.processCard}
                  style={{ borderTopColor: color }}
                >
                  <div className={styles.processNum} style={{ color }}>
                    {step.num}
                  </div>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processDesc}>{step.desc}</p>
                  {step.activities && (
                    <ul className={styles.processActivities}>
                      {step.activities.map((a) => (
                        <li key={a}>
                          <FaCheck
                            className={styles.checkIcon}
                            style={{ color }}
                          />
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {faqs && faqs.length > 0 && (
        <section className={styles.faqSection}>
          <div className={styles.faqContainer}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqAccordion}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`${styles.faqItem} ${openFaq === i ? styles.faqActive : ""}`}
                  style={{ "--accent": color }}
                >
                  <button
                    className={styles.faqQ}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <FaChevronDown
                      className={`${styles.faqChevron} ${openFaq === i ? styles.faqChevronOpen : ""}`}
                    />
                  </button>
                  <div
                    className={`${styles.faqA} ${openFaq === i ? styles.faqAOpen : ""}`}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className={styles.ctaBanner}>
        <div
          className={styles.ctaBannerInner}
          style={{ background: `linear-gradient(135deg, ${color}, #06b6d4)` }}
        >
          <h2 className={styles.ctaBannerTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaBannerSub}>
            Let's discuss your project and build something amazing together.
          </p>
          <div className={styles.ctaBannerBtns}>
            <Link to="/#contact" className={styles.ctaBannerBtnPrimary}>
              Get a Free Quote
            </Link>
            <Link to="/about" className={styles.ctaBannerBtnSecondary}>
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
