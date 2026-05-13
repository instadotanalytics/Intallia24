import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaDatabase,
  FaArrowRight,
  FaEye,
  FaChartLine,
  FaBrain,
  FaCogs,
  FaCloud,
  FaShieldAlt,
  FaSyncAlt,
  FaExpandAlt,
  FaBolt,
  FaSearch,
  FaMoneyBillWave,
  FaUserFriends,
  FaChessKing,
  FaChevronDown,
  FaComments,
  FaBookOpen,
  FaStar,
  FaCheck,
  FaChartPie,
  FaServer,
} from "react-icons/fa";
import styles from "./DataIntelligenceSolutions.module.css";

const heroStats = [
  { value: 200, suffix: "+", label: "Data Sources Integrated" },
  { value: 5, suffix: "x", label: "Faster Decisions" },
  { value: 98, suffix: "%", label: "Data Accuracy" },
  { value: 45, suffix: "%", label: "Cost Savings" },
];

const services = [
  {
    icon: <FaDatabase />,
    title: "Data Integration & Unification",
    description:
      "Seamless integration of disparate data sources into a unified intelligence platform for a single source of truth across your organization.",
  },
  {
    icon: <FaBrain />,
    title: "Intelligent Analytics Engine",
    description:
      "AI-powered analytics that automatically discover patterns, generate insights, and provide actionable recommendations without manual analysis.",
  },
  {
    icon: <FaChartPie />,
    title: "Real-Time Intelligence Dashboards",
    description:
      "Dynamic, interactive dashboards providing real-time business intelligence with drill-down capabilities and automated alerting.",
  },
  {
    icon: <FaCloud />,
    title: "Cloud Data Intelligence",
    description:
      "Cloud-native data intelligence solutions that scale with your business, providing enterprise-grade security and sub-second query performance.",
  },
  {
    icon: <FaServer />,
    title: "Data Governance & Quality",
    description:
      "Comprehensive data governance frameworks ensuring data quality, lineage tracking, catalog management, and regulatory compliance.",
  },
];

const excellenceItems = [
  {
    icon: <FaBolt />,
    title: "Real-Time Intelligence",
    description:
      "Streaming data processing and real-time analytics for immediate insights and proactive decision-making across the organization.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Enterprise-Grade Security",
    description:
      "End-to-end data encryption, fine-grained access controls, audit trails, and compliance with GDPR, HIPAA, and industry standards.",
  },
  {
    icon: <FaSyncAlt />,
    title: "Automated Insights",
    description:
      "AI-powered automated insight generation that identifies trends, anomalies, and opportunities without manual intervention.",
  },
  {
    icon: <FaExpandAlt />,
    title: "Scalable Intelligence",
    description:
      "Cloud-native architecture that scales from gigabytes to petabytes, supporting growing data volumes and user concurrency.",
  },
];

const featureCards = [
  {
    icon: <FaSearch />,
    title: "Data Discovery",
    description:
      "Intelligent data discovery and cataloging for easy access to all organizational data assets.",
  },
  {
    icon: <FaChartLine />,
    title: "Predictive Intelligence",
    description:
      "Advanced predictive models that forecast trends and identify future opportunities and risks.",
  },
  {
    icon: <FaCogs />,
    title: "Automated Reporting",
    description:
      "Self-service analytics with automated report generation and distribution across the organization.",
  },
  {
    icon: <FaUserFriends />,
    title: "Collaborative Intelligence",
    description:
      "Shared dashboards, annotations, and collaborative features for team-based data-driven decision making.",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Data Assessment",
    description:
      "Comprehensive evaluation of data sources, quality, and integration requirements to build the intelligence foundation.",
  },
  {
    number: "2",
    title: "Platform Architecture",
    description:
      "Designing scalable data intelligence architecture with appropriate technologies, storage, and processing frameworks.",
  },
  {
    number: "3",
    title: "Integration & Development",
    description:
      "Seamless data integration, analytics development, dashboard creation, and quality implementation.",
  },
  {
    number: "4",
    title: "Deployment & Enablement",
    description:
      "Production deployment, user training, and ongoing optimization for sustained intelligence value.",
  },
];

const impactCards = [
  {
    icon: <FaMoneyBillWave />,
    title: "Revenue Intelligence",
    description:
      "Data-driven insights that identify revenue opportunities, optimize pricing, and maximize customer lifetime value.",
  },
  {
    icon: <FaCogs />,
    title: "Operational Intelligence",
    description:
      "Real-time operational insights that improve efficiency, reduce costs, and eliminate process bottlenecks.",
  },
  {
    icon: <FaUserFriends />,
    title: "Customer Intelligence",
    description:
      "360-degree customer insights enabling personalized experiences, improved retention, and higher satisfaction.",
  },
];

const testimonials = [
  {
    quote:
      "Their data intelligence platform transformed how we make decisions. Real-time insights reduced our operational costs by 35% and improved customer satisfaction significantly.",
    author: "Priya Sharma",
    role: "Chief Data Officer, Enterprise Solutions",
  },
  {
    quote:
      "The unified data intelligence solution eliminated data silos across our 12 departments. Single source of truth with self-service analytics empowered every team.",
    author: "Rajesh Kumar",
    role: "VP Analytics, Global Retail Corp",
  },
  {
    quote:
      "Their predictive intelligence models helped us forecast demand with 95% accuracy, reducing inventory costs by 40% while improving product availability.",
    author: "Anita Patel",
    role: "Director of Supply Chain, Manufacturing Inc.",
  },
];

const strategyCards = [
  {
    title: "Data Intelligence Strategy",
    description:
      "Comprehensive strategy development including data assessment, platform selection, governance framework, and implementation roadmap for enterprise-wide intelligence.",
  },
  {
    title: "Analytics Maturity Model",
    description:
      "Assessment of current analytics maturity with clear progression path from descriptive to prescriptive analytics, including technology and talent requirements.",
  },
  {
    title: "ROI & Value Realization",
    description:
      "Detailed ROI modeling for data intelligence investments with measurable KPIs, value tracking, and quarterly business impact reviews.",
  },
];

const faqs = [
  {
    question: "What is data intelligence and how is it different from BI?",
    answer:
      "Data intelligence goes beyond traditional Business Intelligence by incorporating AI and machine learning to automatically discover patterns, generate insights, and provide predictive and prescriptive recommendations. While BI focuses on historical reporting and dashboards, data intelligence enables proactive, automated decision-making with real-time processing and advanced analytics capabilities.",
  },
  {
    question:
      "How long does it take to implement a data intelligence platform?",
    answer:
      "Implementation timelines depend on data complexity and scope. A basic intelligence platform with key dashboards can be delivered in 6-8 weeks, while comprehensive enterprise-wide solutions typically take 3-5 months. We follow an agile approach with incremental deliveries to provide value early in the process.",
  },
  {
    question: "Can you integrate with our existing data systems?",
    answer:
      "Absolutely. Our data intelligence solutions are designed to integrate seamlessly with existing data infrastructure including databases, data warehouses, cloud services, business applications, and legacy systems. We support connectors for 200+ data sources and can build custom integrations for any system.",
  },
  {
    question: "How do you ensure data quality and accuracy?",
    answer:
      "We implement comprehensive data quality frameworks including automated data profiling, validation rules, anomaly detection, data cleansing pipelines, and quality monitoring dashboards. Our solutions include data lineage tracking and automated quality alerts to maintain 98%+ data accuracy.",
  },
  {
    question: "Is the platform accessible to non-technical users?",
    answer:
      "Yes, our data intelligence solutions are designed for business users with intuitive self-service interfaces, natural language querying, drag-and-drop dashboard builders, and automated insight generation. No coding or technical expertise required for day-to-day use.",
  },
  {
    question: "What about data security and compliance?",
    answer:
      "We implement enterprise-grade security including data encryption (at rest and in transit), role-based access controls, comprehensive audit logging, data masking for sensitive information, and compliance with GDPR, HIPAA, CCPA, and other regulations.",
  },
  {
    question: "Do you provide training and ongoing support?",
    answer:
      "Yes, we provide comprehensive training programs for administrators, analysts, and business users. Our support includes 24/7 monitoring, regular updates, performance optimization, and ongoing enhancements. We also offer dedicated support teams for enterprise clients.",
  },
  {
    question: "How do you measure the ROI of data intelligence?",
    answer:
      "We establish clear KPIs including time saved in decision-making, cost reductions achieved, revenue improvements, user adoption rates, and data accuracy metrics. We provide detailed ROI dashboards and conduct quarterly business reviews to track and optimize value realization.",
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

export default function DataIntelligenceSolutions() {
  const [activeFaq, setActiveFaq] = useState(null);
  const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

  return (
    <main className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.titleContainer}>
            <FaDatabase className={styles.titleIcon} />
            <h1 className={styles.mainTitle}>
              Data Intelligence{" "}
              <span className={styles.highlight}>Solutions</span>
            </h1>
          </div>
          <p className={styles.heroDescription}>
            Transform scattered data into unified, actionable intelligence. Our
            data intelligence solutions integrate, analyze, and visualize your
            data to provide real-time insights that drive smarter decisions,
            optimize operations, and create sustainable competitive advantages.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/contact" className={styles.btnPrimary}>
              Get Intelligence Assessment <FaArrowRight />
            </Link>
            <Link to="#" className={styles.btnSecondary}>
              View Success Stories <FaEye />
            </Link>
          </div>
          <div className={styles.statsContainer}>
            {heroStats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.counter}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>Data Intelligence Services</h2>
        <p className={styles.sectionDescription}>
          From data integration to intelligent analytics, we deliver
          comprehensive solutions that transform your data ecosystem into a
          strategic business asset.
        </p>
        <div className={styles.servicesCards}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.whyChooseSection}>
        <h2 className={styles.sectionTitle}>
          Why Choose Our Data Intelligence
        </h2>
        <p className={styles.sectionDescription}>
          We deliver intelligence solutions that don't just show data—they
          provide AI-powered insights, real-time processing, and predictive
          capabilities that transform decision-making.
        </p>
        <div className={styles.whyChooseContent}>
          <div className={styles.excellenceList}>
            <h3>Built for Intelligence Excellence</h3>
            {excellenceItems.map((item, index) => (
              <div key={index} className={styles.excellenceItem}>
                <span className={styles.excellenceIcon}>{item.icon}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.featureCards}>
            {featureCards.map((card, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{card.icon}</div>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <h2 className={styles.sectionTitle}>Our Intelligence Process</h2>
        <p className={styles.sectionDescription}>
          Our proven methodology ensures your data intelligence platform
          delivers maximum business value with reliable, actionable insights.
        </p>
        <div className={styles.processCards}>
          {processSteps.map((step, index) => (
            <div key={index} className={styles.processCard}>
              <div className={styles.processNumber}>{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.impactSection}>
        <h2 className={styles.sectionTitle}>Intelligence Impact</h2>
        <p className={styles.sectionDescription}>
          Our data intelligence solutions deliver measurable business outcomes
          across revenue, operations, and customer experience.
        </p>
        <div className={styles.impactCards}>
          {impactCards.map((card, index) => (
            <div key={index} className={styles.impactCard}>
              <div className={styles.impactIcon}>{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
        <p className={styles.sectionDescription}>
          Hear from organizations that transformed their decision-making with
          our intelligence solutions
        </p>
        <div className={styles.testimonialCards}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <FaStar className={styles.quoteIcon} />
                <p>{testimonial.quote}</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <h4>{testimonial.author}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.strategySection}>
        <div className={styles.techHeader}>
          <FaChessKing className={styles.techHeaderIcon} />
          <h2 className={styles.sectionTitle}>Intelligence Strategy</h2>
        </div>
        <p className={styles.sectionDescription}>
          From data maturity assessment to enterprise-wide intelligence
          deployment, our strategic approach ensures sustainable data-driven
          transformation.
        </p>
        <div className={styles.strategyCards}>
          {strategyCards.map((card, index) => (
            <div key={index} className={styles.strategyCard}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.solutionCards}>
          <div className={`${styles.solutionCard} ${styles.mlCard}`}>
            <FaBrain className={styles.solutionIcon} />
            <h3>Analytics Solutions</h3>
            <ul>
              <li>
                <FaCheck /> Descriptive & Diagnostic Analytics
              </li>
              <li>
                <FaCheck /> Predictive Intelligence Models
              </li>
              <li>
                <FaCheck /> Prescriptive Recommendations
              </li>
            </ul>
          </div>
          <div className={`${styles.solutionCard} ${styles.biCard}`}>
            <FaChartPie className={styles.solutionIcon} />
            <h3>Visualization & Reporting</h3>
            <ul>
              <li>
                <FaCheck /> Interactive Dashboards
              </li>
              <li>
                <FaCheck /> Automated Report Generation
              </li>
              <li>
                <FaCheck /> Real-Time KPI Monitoring
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Data Intelligence FAQ</h2>
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
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>
          Ready to Unlock Your Data Intelligence?
        </h2>
        <p className={styles.ctaDescription}>
          Transform your data into strategic intelligence that drives growth,
          optimizes operations, and creates lasting competitive advantage for
          your organization.
        </p>
        <div className={styles.ctaButtons}>
          <Link to="/contact" className={styles.btnCtaPrimary}>
            Get Free Consultation <FaComments />
          </Link>
          <Link to="#" className={styles.btnCtaSecondary}>
            Explore Success Stories <FaBookOpen />
          </Link>
        </div>
      </section>
    </main>
  );
}
