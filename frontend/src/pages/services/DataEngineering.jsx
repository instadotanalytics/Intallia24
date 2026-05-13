import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaDatabase,
  FaArrowRight,
  FaChartLine,
  FaStream,
  FaCloud,
  FaBolt,
  FaCogs,
  FaShieldAlt,
  FaTools,
  FaCode,
  FaProjectDiagram,
  FaTachometerAlt,
  FaExpandArrowsAlt,
  FaDollarSign,
  FaSearch,
  FaSyncAlt,
  FaCheckCircle,
  FaUsers,
  FaChartBar,
  FaChessKing,
  FaChevronDown,
  FaComments,
  FaBookOpen,
  FaStar,
  FaAws,
  FaWindows,
} from "react-icons/fa";
import styles from "./DataEngineering.module.css";

const heroStats = [
  { value: 150, suffix: "+", label: "Data Pipelines Built" },
  { value: 99.5, suffix: "%", label: "Data Accuracy", isDecimal: true },
  { value: 1000, suffix: "+", label: "TB Processed Daily" },
  { value: 95, suffix: "%", label: "Faster Insights" },
];

const services = [
  {
    icon: <FaStream />,
    title: "Data Pipeline Development",
    description:
      "End-to-end data pipeline architecture with ETL/ELT processes, data validation, and workflow orchestration for reliable data processing.",
  },
  {
    icon: <FaCloud />,
    title: "Cloud Data Platforms",
    description:
      "Modern data lakes, warehouses, and lakehouses on AWS, Azure, and GCP with scalable storage and compute resources.",
  },
  {
    icon: <FaBolt />,
    title: "Real-Time Data Processing",
    description:
      "Streaming data solutions with Apache Kafka, Spark Streaming, and Flink for immediate insights and event-driven architectures.",
  },
  {
    icon: <FaCogs />,
    title: "DataOps & MLOps",
    description:
      "Automated data workflows, CI/CD for data pipelines, and machine learning operations for production-ready AI models.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Data Governance & Quality",
    description:
      "Comprehensive data governance frameworks, quality monitoring, lineage tracking, and compliance management.",
  },
];

const technologies = [
  {
    icon: <FaCloud />,
    title: "Cloud Platforms",
    description:
      "AWS (Redshift, Glue, EMR), Azure (Synapse, Data Factory), GCP (BigQuery, Dataflow) for scalable cloud data solutions.",
  },
  {
    icon: <FaCode />,
    title: "Processing Frameworks",
    description:
      "Apache Spark, Hadoop, Flink, Airflow, dbt for distributed processing and workflow orchestration.",
  },
  {
    icon: <FaDatabase />,
    title: "Databases & Warehouses",
    description:
      "Snowflake, Redshift, BigQuery, PostgreSQL, MongoDB for structured and unstructured data storage.",
  },
  {
    icon: <FaProjectDiagram />,
    title: "Orchestration & Monitoring",
    description:
      "Apache Airflow, Prefect, Dagster, Grafana, Datadog for pipeline orchestration and performance monitoring.",
  },
];

const excellenceItems = [
  {
    icon: <FaDatabase />,
    title: "Scalable Architecture",
    description:
      "Horizontally scalable data platforms that grow with your business needs and data volumes.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Enterprise Security",
    description:
      "End-to-end data encryption, access controls, audit trails, and compliance with industry standards.",
  },
  {
    icon: <FaSyncAlt />,
    title: "Real-Time Processing",
    description:
      "Stream processing capabilities for immediate insights and decision-making from live data streams.",
  },
  {
    icon: <FaChartLine />,
    title: "Advanced Analytics Ready",
    description:
      "Data platforms optimized for machine learning, AI, and advanced analytical workloads.",
  },
];

const featureCards = [
  {
    icon: <FaTachometerAlt />,
    title: "High Performance",
    description:
      "Optimized queries and processing with sub-second response times for large datasets.",
  },
  {
    icon: <FaExpandArrowsAlt />,
    title: "Elastic Scalability",
    description:
      "Automatically scale resources based on workload demands and data volumes.",
  },
  {
    icon: <FaDollarSign />,
    title: "Cost Optimization",
    description:
      "Intelligent resource management and cost monitoring for cloud data platforms.",
  },
  {
    icon: <FaSearch />,
    title: "Data Discovery",
    description:
      "Comprehensive metadata management and data cataloging for easy discovery.",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Assessment & Strategy",
    description:
      "Data landscape analysis, requirements gathering, and architecture planning for optimal data solutions.",
  },
  {
    number: "2",
    title: "Architecture Design",
    description:
      "Data model design, pipeline architecture, and technology selection for scalable solutions.",
  },
  {
    number: "3",
    title: "Development & Integration",
    description:
      "Pipeline development, data integration, and quality implementation with agile methodology.",
  },
  {
    number: "4",
    title: "Deployment & Optimization",
    description:
      "Production deployment, performance tuning, monitoring setup, and ongoing optimization.",
  },
];

const platformSuccess = [
  {
    icon: <FaCheckCircle />,
    title: "Data Quality & Reliability",
    description:
      "Comprehensive data validation, monitoring, and quality assurance for trustworthy analytics.",
  },
  {
    icon: <FaUsers />,
    title: "Self-Service Analytics",
    description:
      "Empowering business users with easy-to-use tools for data exploration and visualization.",
  },
  {
    icon: <FaChartBar />,
    title: "Performance & Insights",
    description:
      "High-performance queries and dashboards that deliver insights in seconds, not hours.",
  },
];

const testimonials = [
  {
    quote:
      "Intallia24 transformed our fragmented data systems into a unified analytics platform. Our reporting time reduced from days to minutes, and data-driven decisions increased by 300%.",
    author: "Michael Chen",
    role: "CDO, FinTech Solutions Inc.",
  },
  {
    quote:
      "Their real-time data pipeline architecture enabled us to process 10TB of daily transaction data with 99.99% accuracy. The system scaled seamlessly as our business grew.",
    author: "Sarah Johnson",
    role: "VP Data, Retail Dynamics",
  },
  {
    quote:
      "The data governance framework they implemented solved our compliance challenges while improving data accessibility across departments. A game-changer for our analytics maturity.",
    author: "Robert Williams",
    role: "Head of Analytics, HealthFirst Corp",
  },
];

const strategyCards = [
  {
    title: "Modernization Strategy",
    description:
      "Legacy system assessment and migration to cloud-native architectures with minimal disruption. Data platform modernization achieving 5-10x performance improvements and 30-50% cost reduction.",
  },
  {
    title: "Performance & Scalability",
    description:
      "Sub-second query performance on billion-row datasets, 99.9% pipeline reliability, elastic scaling from GB to PB. Cost optimization keeping cloud spend 20-40% below industry benchmarks.",
  },
  {
    title: "Operational Excellence",
    description:
      "Automated monitoring, alerting, and incident response. DataOps practices reducing deployment time by 70%. Continuous data quality monitoring with automated anomaly detection.",
  },
];

const faqs = [
  {
    question: "What is data engineering and why is it important?",
    answer:
      "Data engineering involves designing, building, and maintaining the systems and infrastructure that enable data collection, storage, processing, and analysis. It's crucial because raw data is useless without proper engineering—data engineers create the pipelines and platforms that transform data into actionable insights, power analytics, and enable machine learning applications.",
  },
  {
    question: "How much does data engineering cost?",
    answer:
      "Data engineering costs vary based on complexity, data volume, and technology choices. Basic data pipelines start from $25,000, while enterprise data platforms with real-time processing, advanced analytics, and machine learning capabilities can range from $100,000 to $500,000+. We provide detailed proposals after assessing your specific data landscape and requirements.",
  },
  {
    question: "How long does it take to build a data platform?",
    answer:
      "Implementation timelines depend on data complexity and platform scope. A basic data pipeline can be delivered in 4-8 weeks, while comprehensive enterprise data platforms typically take 3-6 months. We follow an agile approach with incremental deliveries, ensuring you see value early in the process.",
  },
  {
    question: "Do you help with data migration from legacy systems?",
    answer:
      "Yes, we specialize in modernizing legacy data systems and migrating them to cloud-native architectures. Our approach includes assessment, planning, incremental migration, validation, and cutover strategies to minimize disruption. We've successfully migrated systems from on-premise Hadoop, Oracle, SQL Server, and other legacy platforms to modern cloud data platforms.",
  },
  {
    question: "How do you ensure data security and compliance?",
    answer:
      "We implement multiple security layers including data encryption (at rest and in transit), fine-grained access controls, audit logging, data masking, and tokenization. We ensure compliance with GDPR, CCPA, HIPAA, PCI-DSS, and other regulations through proper data handling, retention policies, and privacy by design principles.",
  },
  {
    question: "What about ongoing maintenance and support?",
    answer:
      "We offer comprehensive maintenance and support packages that include 24/7 monitoring, performance optimization, cost management, security updates, and regular enhancements. Our DataOps approach ensures continuous improvement with automated testing, deployment, and monitoring of your data infrastructure.",
  },
  {
    question: "Can you help with real-time data processing?",
    answer:
      "Absolutely. We build real-time data pipelines using technologies like Apache Kafka, Spark Streaming, Flink, and cloud-native streaming services. Our solutions enable real-time analytics, event-driven architectures, and immediate insights from live data streams with sub-second latency.",
  },
  {
    question: "Do you provide training for our team?",
    answer:
      "Yes, we offer comprehensive training programs for your data engineers, analysts, and business users. Training covers platform usage, data pipeline management, best practices, and troubleshooting. We ensure knowledge transfer so your team can effectively manage and extend the data platform.",
  },
];

function AnimatedCounter({ target, suffix, isDecimal = false, duration = 2000 }) {
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
              setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, isDecimal]);

  return (
    <span ref={countRef}>
      {isDecimal ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

export default function DataEngineeringSolutions() {
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
            <FaDatabase className={styles.titleIcon} />
            <h1 className={styles.mainTitle}>
              Data Engineering <span className={styles.highlight}>Solutions</span>
            </h1>
          </div>
          <p className={styles.heroDescription}>
            We build robust, scalable data pipelines and infrastructure that transform raw data into strategic assets. Our data engineering services help organizations harness the power of their data through modern data platforms, real-time processing, and AI-ready data ecosystems that drive informed decision-making and business growth.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/contact" className={styles.btnPrimary}>
              Start Your Data Project <FaArrowRight />
            </Link>
            <Link to="#" className={styles.btnSecondary}>
              View Case Studies <FaChartLine />
            </Link>
          </div>
          <div className={styles.statsContainer}>
            {heroStats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.counter}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
                </div>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Engineering Services Section */}
      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>Data Engineering Services</h2>
        <p className={styles.sectionDescription}>
          From data ingestion to advanced analytics, we create comprehensive data solutions that transform your information infrastructure and unlock actionable business insights.
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
          We leverage industry-leading data engineering technologies, frameworks, and cloud platforms to build scalable, performant data infrastructure with sub-second query performance, efficient resource utilization, and enterprise-grade reliability.
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
        <h2 className={styles.sectionTitle}>Why Choose Our Data Engineering</h2>
        <p className={styles.sectionDescription}>
          We create data infrastructure that doesn't just collect and store information—it delivers real-time insights with sub-second latency, scales effortlessly from gigabytes to petabytes, maintains 99.9% uptime, and transforms raw data into measurable business value.
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
        <h2 className={styles.sectionTitle}>Our Data Engineering Process</h2>
        <p className={styles.sectionDescription}>
          From data assessment to production deployment, our proven process ensures your data infrastructure delivers reliable, actionable insights and business value.
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

      {/* Platform Success Section */}
      <section className={styles.platformSection}>
        <h2 className={styles.sectionTitle}>Data Platform Success</h2>
        <p className={styles.sectionDescription}>
          We deliver end-to-end data platform solutions that ensure data reliability, accessibility, and actionable insights for business users across your organization.
        </p>
        <div className={styles.platformCards}>
          {platformSuccess.map((item, index) => (
            <div key={index} className={styles.platformCard}>
              <div className={styles.platformIcon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
        <p className={styles.sectionDescription}>
          Hear from organizations that transformed their data capabilities with our engineering solutions
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
          <h2 className={styles.sectionTitle}>Data Engineering Strategy</h2>
        </div>
        <p className={styles.sectionDescription}>
          From legacy system modernization to building cloud-native data platforms achieving 10x faster insights. Our proven data engineering approach encompasses comprehensive data strategy, architecture design, and continuous optimization for sustainable data-driven growth.
        </p>
        <div className={styles.strategyCards}>
          {strategyCards.map((card, index) => (
            <div key={index} className={styles.strategyCard}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.cloudCards}>
          <div className={`${styles.cloudCard} ${styles.awsCard}`}>
            <FaAws className={styles.cloudIcon} />
            <h3>AWS Data Stack</h3>
            <ul>
              <li>Redshift, Athena, Glue</li>
              <li>EMR, Kinesis, Lake Formation</li>
              <li>QuickSight, SageMaker</li>
            </ul>
          </div>
          <div className={`${styles.cloudCard} ${styles.azureCard}`}>
            <FaWindows className={styles.cloudIcon} />
            <h3>Azure Data Platform</h3>
            <ul>
              <li>Synapse, Data Factory, Databricks</li>
              <li>Data Lake Storage, Stream Analytics</li>
              <li>Power BI, Machine Learning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Data Engineering FAQ</h2>
        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${activeFaq === index ? styles.active : ""}`}
            >
              <div className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
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
          Ready to Transform Your Data Infrastructure?
        </h2>
        <p className={styles.ctaDescription}>
          Empower your organization with professionally engineered data solutions that deliver reliable, scalable, and actionable insights. Transform raw data into strategic assets that drive informed decision-making, operational efficiency, and competitive advantage in today's data-driven world.
        </p>
        <div className={styles.ctaButtons}>
          <Link to="/contact" className={styles.btnCtaPrimary}>
            Get Data Strategy Consultation <FaComments />
          </Link>
          <Link to="#" className={styles.btnCtaSecondary}>
            View Data Success Stories <FaBookOpen />
          </Link>
        </div>
      </section>
    </main>
  );
}