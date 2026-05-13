import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaArrowRight,
  FaEye,
  FaBrain,
  FaDatabase,
  FaChartBar,
  FaRobot,
  FaSearch,
  FaTools,
  FaCode,
  FaCloud,
  FaChartPie,
  FaServer,
  FaCogs,
  FaShieldAlt,
  FaSyncAlt,
  FaExpandAlt,
  FaBolt,
  FaMoneyBillWave,
  FaUserFriends,
  FaChessKing,
  FaChevronDown,
  FaStar,
} from "react-icons/fa";
import styles from "./DataScienceAnalytics.module.css";

const heroStats = [
  { value: 50, suffix: "+", label: "Data Projects" },
  { value: 95, suffix: "%", label: "Model Accuracy" },
  { value: 12, suffix: "TB", label: "Data Processed" },
  { value: 40, suffix: "%", label: "Cost Reduction" },
];

const services = [
  {
    icon: <FaBrain />,
    title: "Predictive Analytics & ML",
    description:
      "Advanced machine learning models for forecasting, pattern recognition, and predictive insights that drive smarter business decisions.",
  },
  {
    icon: <FaDatabase />,
    title: "Data Engineering & Warehousing",
    description:
      "Scalable data pipelines, ETL processes, and data warehouse solutions that ensure clean, accessible, and reliable data infrastructure.",
  },
  {
    icon: <FaChartBar />,
    title: "Business Intelligence & Dashboards",
    description:
      "Interactive dashboards and reporting tools that provide real-time insights and KPIs for informed decision-making at all levels.",
  },
  {
    icon: <FaRobot />,
    title: "AI & Deep Learning Solutions",
    description:
      "Neural networks and deep learning applications for complex pattern recognition, natural language processing, and computer vision.",
  },
  {
    icon: <FaSearch />,
    title: "Data Mining & Exploration",
    description:
      "Comprehensive data discovery and mining services to uncover hidden patterns, correlations, and business opportunities in your data.",
  },
];

const technologies = [
  {
    icon: <FaCode />,
    title: "Programming & Libraries",
    description:
      "Python, R, SQL, TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy for robust data manipulation and model development.",
  },
  {
    icon: <FaCloud />,
    title: "Cloud Platforms",
    description:
      "AWS SageMaker, Google Cloud AI, Azure Machine Learning, Databricks for scalable cloud-based data solutions and ML ops.",
  },
  {
    icon: <FaChartPie />,
    title: "Visualization Tools",
    description:
      "Tableau, Power BI, D3.js, Plotly for creating compelling data visualizations and interactive dashboards.",
  },
  {
    icon: <FaServer />,
    title: "Big Data Technologies",
    description:
      "Hadoop, Spark, Kafka, Airflow for processing large-scale data streams and building robust data pipelines.",
  },
];

const excellenceItems = [
  {
    icon: <FaCogs />,
    title: "End-to-End Data Solutions",
    description:
      "Complete data lifecycle management from collection and processing to analysis and actionable insights.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Data Security & Compliance",
    description:
      "Enterprise-grade security with encryption, access controls, and compliance with GDPR, HIPAA, and industry standards.",
  },
  {
    icon: <FaSyncAlt />,
    title: "Real-Time Analytics",
    description:
      "Streaming analytics and real-time dashboards for immediate insights and timely decision-making.",
  },
  {
    icon: <FaExpandAlt />,
    title: "Scalable Architecture",
    description:
      "Cloud-native solutions that scale seamlessly with your data volume and analytical complexity.",
  },
];

const featureCards = [
  {
    icon: <FaBolt />,
    title: "Predictive Power",
    description:
      "Advanced algorithms that forecast trends and behaviors with high accuracy.",
  },
  {
    icon: <FaSearch />,
    title: "Pattern Recognition",
    description:
      "Uncover hidden insights and correlations in complex datasets.",
  },
  {
    icon: <FaRobot />,
    title: "AI Automation",
    description:
      "Intelligent automation of data processing and decision workflows.",
  },
  {
    icon: <FaChartLine />,
    title: "Performance Tracking",
    description:
      "Comprehensive metrics and KPI tracking for continuous improvement.",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Discovery & Assessment",
    description:
      "Understanding business objectives, data landscape, and defining success metrics for your analytics initiative.",
  },
  {
    number: "2",
    title: "Data Preparation",
    description:
      "Data cleaning, transformation, and feature engineering to create analysis-ready datasets.",
  },
  {
    number: "3",
    title: "Model Development",
    description:
      "Building, training, and validating machine learning models with iterative refinement cycles.",
  },
  {
    number: "4",
    title: "Insight Delivery",
    description:
      "Deploying models, creating dashboards, and delivering actionable insights to stakeholders.",
  },
];

const impactCards = [
  {
    icon: <FaMoneyBillWave />,
    title: "Revenue Optimization",
    description:
      "Predictive models that identify growth opportunities, optimize pricing, and increase customer lifetime value.",
  },
  {
    icon: <FaCogs />,
    title: "Operational Efficiency",
    description:
      "Process optimization and automation that reduce costs, improve productivity, and eliminate waste.",
  },
  {
    icon: <FaUserFriends />,
    title: "Customer Intelligence",
    description:
      "Advanced segmentation, churn prediction, and personalization strategies that enhance customer experiences.",
  },
];

const testimonials = [
  {
    quote:
      "Their predictive models reduced our inventory costs by 35% while improving stock availability. The ROI was achieved within the first quarter.",
    author: "Siddharth Gupta",
    role: "Co Founder & CTO",
  },
  {
    quote:
      "The customer segmentation and recommendation engine increased our cross-sell revenue by 42%. The insights were both deep and actionable.",
    author: "Jairaj Singh Rana",
    role: "Director & Founder",
  },
  {
    quote:
      "Their fraud detection system reduced false positives by 60% while catching 98% of fraudulent transactions. Exceptional accuracy and performance.",
    author: "Nipun Sethi",
    role: "Sales Force Developer, CRM Architect",
  },
];

const strategyCards = [
  {
    title: "Data Architecture & Governance",
    description:
      "Designing scalable data architectures with proper governance, data quality frameworks, and compliance controls ensuring reliability and trust in data assets.",
  },
  {
    title: "Model Development & Validation",
    description:
      "95%+ model accuracy with rigorous testing, cross-validation, and A/B testing frameworks. Real-time model performance monitoring and drift detection.",
  },
  {
    title: "Production & Maintenance",
    description:
      "Seamless model deployment with MLOps practices, automated retraining pipelines, and ongoing performance optimization as data patterns evolve.",
  },
];

const faqs = [
  {
    question: "What types of data science projects do you handle?",
    answer:
      "We handle a wide range of data science projects including predictive analytics, machine learning model development, natural language processing, computer vision, recommendation systems, fraud detection, customer segmentation, time series forecasting, and business intelligence solutions. Our expertise spans across industries including finance, healthcare, retail, manufacturing, and technology.",
  },
  {
    question: "How do you ensure data quality and accuracy?",
    answer:
      "We implement rigorous data quality frameworks including data profiling, validation rules, anomaly detection, and automated cleaning pipelines. Our processes include cross-validation, A/B testing, and continuous monitoring to ensure model accuracy and reliability. We maintain data lineage tracking and implement governance practices throughout the data lifecycle.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Project timelines vary based on complexity. A basic analytics dashboard can be delivered in 4-6 weeks, while comprehensive machine learning solutions typically take 2-4 months. We follow agile methodologies with regular deliverables and stakeholder reviews to ensure alignment and timely delivery.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, we offer comprehensive support packages including model monitoring, performance optimization, regular updates, and retraining as data patterns evolve. We provide SLAs for response times and have dedicated teams for ongoing maintenance and enhancement of data solutions.",
  },
  {
    question: "How do you handle data security and privacy?",
    answer:
      "We implement enterprise-grade security measures including data encryption (at rest and in transit), access controls, audit logging, and anonymization techniques. We comply with regulations like GDPR, HIPAA, CCPA, and implement industry best practices for data protection and privacy.",
  },
  {
    question: "Can you work with our existing data infrastructure?",
    answer:
      "Yes, we have extensive experience integrating with various data platforms including cloud services (AWS, Azure, GCP), on-premise systems, data warehouses, and business applications. We can work with your existing infrastructure or recommend improvements based on your needs.",
  },
  {
    question: "How do you measure the success of data projects?",
    answer:
      "We establish clear KPIs and success metrics aligned with business objectives before project initiation. Success is measured through model accuracy, business impact metrics (revenue increase, cost reduction), user adoption rates, and ROI calculations. We provide regular reporting on these metrics throughout the project lifecycle.",
  },
  {
    question: "Do you provide training and knowledge transfer?",
    answer:
      "Yes, we offer comprehensive training programs, documentation, and knowledge transfer sessions to ensure your team can effectively use and maintain the data solutions we deliver. We believe in empowering your organization with the skills needed for ongoing data-driven decision making.",
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

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function DataScienceAnalytics() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.titleContainer}>
            <FaChartLine className={styles.titleIcon} />
            <h1 className={styles.mainTitle}>
              Data Science & <span className={styles.highlight}>Analytics</span>
            </h1>
          </div>
          <p className={styles.heroDescription}>
            We transform raw data into actionable insights and predictive
            intelligence. Our data science services help organizations uncover
            hidden patterns, automate decision-making, and drive growth through
            data-driven strategies, machine learning models, and comprehensive
            analytics solutions.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/contact" className={styles.btnPrimary}>
              Start Your Data Project <FaArrowRight />
            </Link>
            <Link to="#" className={styles.btnSecondary}>
              View Case Studies <FaEye />
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

      {/* Data Science Services Section */}
      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>Data Science Services</h2>
        <p className={styles.sectionDescription}>
          From predictive analytics to AI-powered insights, we deliver
          comprehensive data solutions that transform information into
          competitive advantage.
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

      {/* Technologies Section */}
      <section className={styles.techSection}>
        <div className={styles.techHeader}>
          <FaTools className={styles.techHeaderIcon} />
          <h2 className={styles.sectionTitle}>Technologies & Tools</h2>
        </div>
        <p className={styles.sectionDescription}>
          We leverage cutting-edge data science technologies, programming
          languages, and analytical tools to deliver scalable, accurate, and
          actionable insights that drive business transformation and competitive
          advantage.
        </p>
        <div className={styles.techCards}>
          {technologies.map((tech, index) => (
            <div key={index} className={styles.techCard}>
              <div className={styles.techCardIcon}>{tech.icon}</div>
              <h3>{tech.title}</h3>
              <p>{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className={styles.whyChooseSection}>
        <h2 className={styles.sectionTitle}>
          Why Choose Our Data Science Solutions
        </h2>
        <p className={styles.sectionDescription}>
          We deliver data science solutions that don't just generate
          reports—they provide actionable intelligence with 95%+ model accuracy,
          real-time processing capabilities, scalable architectures, and
          measurable business impact that drives revenue growth and operational
          efficiency.
        </p>
        <div className={styles.whyChooseContent}>
          <div className={styles.excellenceList}>
            <h3>Built for Data Excellence</h3>
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

      {/* Process Section */}
      <section className={styles.processSection}>
        <h2 className={styles.sectionTitle}>Our Analytics Process</h2>
        <p className={styles.sectionDescription}>
          From data discovery to insight delivery, our proven methodology
          ensures your data initiatives deliver maximum business value and
          actionable intelligence.
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

      {/* Impact Section */}
      <section className={styles.impactSection}>
        <h2 className={styles.sectionTitle}>Business Impact & ROI</h2>
        <p className={styles.sectionDescription}>
          We focus on delivering measurable business outcomes and tangible ROI
          through data-driven insights and predictive analytics.
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

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
        <p className={styles.sectionDescription}>
          Don't just take our word for it - hear from organizations that have
          transformed their business with our data solutions
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

      {/* Strategy Section */}
      <section className={styles.strategySection}>
        <div className={styles.techHeader}>
          <FaChessKing className={styles.techHeaderIcon} />
          <h2 className={styles.sectionTitle}>
            Data Strategy & Implementation
          </h2>
        </div>
        <p className={styles.sectionDescription}>
          From data architecture design through model deployment to ongoing
          optimization achieving 95%+ accuracy rates. Our comprehensive data
          strategy encompasses data governance, quality assurance, and
          continuous improvement for sustainable data-driven transformation.
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
            <h3>Machine Learning Solutions</h3>
            <ul>
              <li>Predictive Analytics & Forecasting</li>
              <li>Natural Language Processing</li>
              <li>Computer Vision & Image Recognition</li>
            </ul>
          </div>
          <div className={`${styles.solutionCard} ${styles.biCard}`}>
            <FaChartBar className={styles.solutionIcon} />
            <h3>Business Intelligence</h3>
            <ul>
              <li>Interactive Dashboards & Reports</li>
              <li>Real-time KPI Monitoring</li>
              <li>Self-Service Analytics</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Data Science & Analytics FAQ</h2>
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

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>
          Ready to Transform Your Data into Intelligence?
        </h2>
        <p className={styles.ctaDescription}>
          Unlock the full potential of your data with our expert data science
          and analytics solutions. Transform information into actionable
          insights that drive smarter decisions, optimize operations, and create
          sustainable competitive advantages for your business.
        </p>
        <div className={styles.ctaButtons}>
          <Link to="/contact" className={styles.btnCtaPrimary}>
            Get Free Data Assessment <FaChartLine />
          </Link>
          <Link to="#" className={styles.btnCtaSecondary}>
            View Success Metrics <FaChartBar />
          </Link>
        </div>
      </section>
    </main>
  );
}
