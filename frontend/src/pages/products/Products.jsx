import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaRocket,
  FaArrowRight,
  FaCheck,
  FaStar,
  FaShieldAlt,
  FaBolt,
  FaSyncAlt,
  FaCloud,
  FaUsers,
  FaChartLine,
  FaDatabase,
  FaBrain,
  FaMobileAlt,
  FaGlobe,
  FaCogs,
  FaChevronDown,
  FaComments,
  FaPlay,
  FaQuoteLeft,
  FaTrophy,
  FaAward,
  FaHandshake,
  FaHeadset,
  FaLock,
  FaServer,
  FaCode,
} from "react-icons/fa";
import styles from "./Products.module.css";

const heroStats = [
  { value: 500, suffix: "+", label: "Enterprise Clients" },
  { value: 99.9, suffix: "%", label: "Uptime Guarantee" },
  { value: 50, suffix: "ms", label: "Response Time" },
  { value: 24, suffix: "/7", label: "Support" },
];

const products = [
  {
    icon: <FaBrain />,
    title: "IntelliSuite AI Platform",
    badge: "Flagship",
    description:
      "Enterprise-grade AI platform that combines machine learning, natural language processing, and computer vision into a unified solution for intelligent automation and decision-making.",
    features: [
      "Pre-trained AI models for rapid deployment",
      "Custom model training with AutoML capabilities",
      "Real-time inference with sub-50ms latency",
      "Seamless integration with existing systems",
    ],
    stats: [
      { label: "Model Accuracy", value: "97%" },
      { label: "Processing Speed", value: "50ms" },
      { label: "API Calls/Day", value: "10M+" },
    ],
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
  },
  {
    icon: <FaDatabase />,
    title: "DataFusion Analytics",
    badge: "Popular",
    description:
      "Comprehensive data analytics platform that unifies data from multiple sources, provides real-time insights, and empowers teams with self-service analytics capabilities.",
    features: [
      "200+ pre-built data connectors",
      "Interactive dashboards with drill-down",
      "Automated report generation and scheduling",
      "AI-powered anomaly detection",
    ],
    stats: [
      { label: "Data Sources", value: "200+" },
      { label: "Query Speed", value: "<1s" },
      { label: "Users Supported", value: "50K+" },
    ],
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    icon: <FaMobileAlt />,
    title: "AppForge Studio",
    badge: "New",
    description:
      "Low-code application development platform that enables rapid creation of web and mobile applications with drag-and-drop interface and pre-built components.",
    features: [
      "Drag-and-drop visual builder",
      "Pre-built templates and components",
      "One-click deployment to cloud",
      "Built-in analytics and monitoring",
    ],
    stats: [
      { label: "Dev Speed", value: "10x" },
      { label: "Templates", value: "500+" },
      { label: "Deploy Time", value: "<5min" },
    ],
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
  },
  {
    icon: <FaCloud />,
    title: "CloudOps Manager",
    badge: "Enterprise",
    description:
      "Intelligent cloud infrastructure management platform that optimizes costs, automates operations, and ensures security compliance across multi-cloud environments.",
    features: [
      "Multi-cloud cost optimization",
      "Automated scaling and provisioning",
      "Security compliance monitoring",
      "Real-time infrastructure analytics",
    ],
    stats: [
      { label: "Cost Savings", value: "40%" },
      { label: "Cloud Providers", value: "AWS/Azure/GCP" },
      { label: "Auto-fixes", value: "24/7" },
    ],
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
  },
];

const features = [
  {
    icon: <FaShieldAlt />,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified with end-to-end encryption, role-based access controls, and comprehensive audit logging.",
  },
  {
    icon: <FaBolt />,
    title: "Lightning Performance",
    description:
      "Sub-50ms response times with global CDN and edge computing for optimal user experience worldwide.",
  },
  {
    icon: <FaSyncAlt />,
    title: "Seamless Integration",
    description:
      "500+ pre-built integrations with popular tools and platforms. Custom API support for any system.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Expert Support",
    description:
      "Dedicated support team with 15-minute response SLA. Comprehensive documentation and training resources.",
  },
  {
    icon: <FaLock />,
    title: "Data Privacy",
    description:
      "GDPR, HIPAA, and CCPA compliant. Data residency options with complete control over your data.",
  },
  {
    icon: <FaServer />,
    title: "99.9% Uptime SLA",
    description:
      "Enterprise-grade reliability with redundant infrastructure and automated failover across regions.",
  },
];

const testimonials = [
  {
    quote:
      "IntelliSuite transformed our operations. We automated 70% of manual processes and reduced decision time from days to minutes. The ROI exceeded our expectations within the first quarter.",
    author: "Rajesh Mehta",
    role: "CTO, FinTech Innovations Ltd.",
  },
  {
    quote:
      "DataFusion gave us a single source of truth across 12 departments. Self-service analytics empowered every team to make data-driven decisions without depending on IT.",
    author: "Priya Sharma",
    role: "VP Analytics, RetailMega Corp",
  },
  {
    quote:
      "AppForge Studio reduced our development cycle from months to weeks. We launched 5 customer-facing apps in 2 months with a team of just 3 developers.",
    author: "Arun Kumar",
    role: "Head of Digital, HealthPlus",
  },
];

// const pricingPlans = [
//   {
//     name: "Starter",
//     price: "999",
//     period: "/month",
//     description: "Perfect for small teams getting started",
//     features: [
//       "Up to 10 users",
//       "Basic analytics",
//       "Email support",
//       "5GB storage",
//       "API access",
//     ],
//     popular: false,
//   },
//   {
//     name: "Professional",
//     price: "2,499",
//     period: "/month",
//     description: "Best for growing businesses",
//     features: [
//       "Up to 50 users",
//       "Advanced analytics",
//       "Priority support",
//       "50GB storage",
//       "API access",
//       "Custom integrations",
//     ],
//     popular: true,
//   },
//   {
//     name: "Enterprise",
//     price: "Custom",
//     period: "",
//     description: "For large organizations with custom needs",
//     features: [
//       "Unlimited users",
//       "Full analytics suite",
//       "Dedicated support",
//       "Unlimited storage",
//       "API access",
//       "Custom integrations",
//       "SLA guarantee",
//       "On-premise option",
//     ],
//     popular: false,
//   },
// ];

const faqs = [
  {
    question: "What products does Intallia offer?",
    answer:
      "We offer four flagship products: IntelliSuite AI Platform for artificial intelligence and machine learning, DataFusion Analytics for comprehensive data analytics, AppForge Studio for rapid application development, and CloudOps Manager for cloud infrastructure management. Each product is available individually or as part of our enterprise suite with integrated pricing.",
  },
  {
    question: "Do you offer free trials?",
    answer:
      "Yes, all our products come with a 14-day free trial with full feature access. No credit card required. During the trial, you get access to all features, documentation, and standard support. Our team can also provide a guided demo and proof of concept tailored to your use case.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We offer flexible pricing models including monthly subscriptions, annual contracts (with 20% discount), and enterprise licensing. Pricing is based on usage metrics appropriate to each product - users, data volume, API calls, or compute resources. Enterprise plans include custom pricing with volume discounts and dedicated support.",
  },
  {
    question: "Can products be customized for our needs?",
    answer:
      "Absolutely. All our products support customization including white-labeling, custom integrations, workflow modifications, and feature extensions. Enterprise clients get access to dedicated customization services. We also offer professional services for complex customizations and migrations.",
  },
  {
    question: "How do you handle data security and compliance?",
    answer:
      "Security is built into every product from the ground up. We maintain SOC 2 Type II certification, support GDPR/HIPAA/CCPA compliance, provide data encryption at rest and in transit, offer SSO and MFA, maintain comprehensive audit logs, and provide data residency options across multiple regions.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer 24/7 support across all plans. Starter includes email support (4hr response), Professional includes priority email and chat (1hr response), and Enterprise includes dedicated support manager (15min response SLA). All plans include access to documentation, tutorials, and community forums.",
  },
  {
    question: "Can we integrate with our existing tools?",
    answer:
      "Yes, our platforms support 500+ pre-built integrations with popular business tools including Salesforce, SAP, Oracle, Microsoft, Google Workspace, Slack, Jira, and more. We also provide robust REST APIs and webhook support for custom integrations with any system.",
  },
  {
    question: "Is training and onboarding provided?",
    answer:
      "Yes, we provide comprehensive onboarding and training. This includes personalized onboarding sessions, video tutorials, documentation, best practices guides, and regular webinars. Enterprise clients receive dedicated training programs and ongoing enablement support for their teams.",
  },
];

function AnimatedCounter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const isDecimal = target % 1 !== 0;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(
                isDecimal
                  ? parseFloat(current.toFixed(1))
                  : Math.floor(current),
              );
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function Products() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeProduct, setActiveProduct] = useState(0);

  const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <FaRocket />
            <span>Our Products</span>
          </div>
          <h1 className={styles.heroTitle}>
            Powerful Products for{" "}
            <span className={styles.heroHighlight}>Digital Transformation</span>
          </h1>
          <p className={styles.heroDescription}>
            Discover our suite of enterprise-grade products designed to
            accelerate innovation, automate operations, and drive measurable
            business growth through cutting-edge technology.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/contact" className={styles.btnPrimary}>
              Schedule a Demo <FaPlay />
            </Link>
            <Link to="/contact" className={styles.btnSecondary}>
              Start Free Trial <FaArrowRight />
            </Link>
          </div>
          <div className={styles.statsContainer}>
            {heroStats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statValue}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Cards Grid */}
      <section className={styles.productsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore Our Products</h2>
          <p className={styles.sectionDescription}>
            Choose from our suite of integrated products designed to solve your
            most complex business challenges
          </p>
        </div>
        <div className={styles.productsGrid}>
          {products.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <div
                className={styles.productBadge}
                style={{ background: product.gradient }}
              >
                {product.badge}
              </div>
              <div
                className={styles.productIconWrap}
                style={{ background: `${product.color}15` }}
              >
                <div
                  className={styles.productIcon}
                  style={{ color: product.color }}
                >
                  {product.icon}
                </div>
              </div>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.productDesc}>{product.description}</p>

              <ul className={styles.productFeatures}>
                {product.features.map((feature, fIdx) => (
                  <li key={fIdx}>
                    <FaCheck style={{ color: product.color }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.productStats}>
                {product.stats.map((stat, sIdx) => (
                  <div key={sIdx} className={styles.productStatItem}>
                    <span
                      className={styles.productStatValue}
                      style={{ color: product.color }}
                    >
                      {stat.value}
                    </span>
                    <span className={styles.productStatLabel}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className={styles.productBtn}
                style={{ background: product.gradient }}
              >
                Learn More <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose Our Products</h2>
          <p className={styles.sectionDescription}>
            Every product is built with enterprise-grade reliability, security,
            and performance at its core
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIconWrap}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section
      <section className={styles.pricingSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Flexible Pricing Plans</h2>
          <p className={styles.sectionDescription}>
            Choose the plan that fits your needs. All plans include a 14-day
            free trial.
          </p>
        </div>
        <div className={styles.pricingGrid}>
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`${styles.pricingCard} ${plan.popular ? styles.popularCard : ""}`}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}
              <h3 className={styles.pricingName}>{plan.name}</h3>
              <div className={styles.pricingAmount}>
                <span className={styles.pricingCurrency}>₹</span>
                <span className={styles.pricingValue}>{plan.price}</span>
                <span className={styles.pricingPeriod}>{plan.period}</span>
              </div>
              <p className={styles.pricingDesc}>{plan.description}</p>
              <ul className={styles.pricingFeatures}>
                {plan.features.map((f, fIdx) => (
                  <li key={fIdx}>
                    <FaCheck /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`${styles.pricingBtn} ${plan.popular ? styles.pricingBtnPopular : ""}`}
              >
                Get Started <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </section> */}

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Trusted by Industry Leaders</h2>
          <p className={styles.sectionDescription}>
            See how organizations are transforming with our products
          </p>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.quoteIconWrap}>
                <FaQuoteLeft />
              </div>
              <p className={styles.testimonialQuote}>{testimonial.quote}</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4>{testimonial.author}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
              <div className={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={styles.starIcon} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className={styles.awardsSection}>
        <div className={styles.awardsGrid}>
          <div className={styles.awardItem}>
            <FaTrophy className={styles.awardIcon} />
            <h4>Best AI Platform 2024</h4>
            <p>TechInnovation Awards</p>
          </div>
          <div className={styles.awardItem}>
            <FaAward className={styles.awardIcon} />
            <h4>Enterprise Choice</h4>
            <p>Gartner Peer Insights</p>
          </div>
          <div className={styles.awardItem}>
            <FaHandshake className={styles.awardIcon} />
            <h4>Top 10 Analytics</h4>
            <p>Forrester Wave Report</p>
          </div>
          <div className={styles.awardItem}>
            <FaStar className={styles.awardIcon} />
            <h4>4.8/5 Rating</h4>
            <p>Trusted by 500+ Enterprises</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p className={styles.sectionDescription}>
            Got questions? We've got answers about our products and services
          </p>
        </div>
        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${activeFaq === index ? styles.faqActive : ""}`}
            >
              <div
                className={styles.faqQuestion}
                onClick={() => toggleFaq(index)}
              >
                <h3>{faq.question}</h3>
                <FaChevronDown
                  className={`${styles.faqIcon} ${activeFaq === index ? styles.faqIconRotated : ""}`}
                />
              </div>
              <div
                className={`${styles.faqAnswer} ${activeFaq === index ? styles.faqAnswerOpen : ""}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Transform Your Business?</h2>
          <p className={styles.ctaDescription}>
            Start your 14-day free trial today. No credit card required.
            Experience the power of our enterprise-grade products.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.btnCtaPrimary}>
              Start Free Trial <FaRocket />
            </Link>
            <Link to="/contact" className={styles.btnCtaSecondary}>
              Talk to Sales <FaComments />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
