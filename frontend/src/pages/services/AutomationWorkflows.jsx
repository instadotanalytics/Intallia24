import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaRobot,
  FaArrowRight,
  FaChartLine,
  FaCogs,
  FaProjectDiagram,
  FaBrain,
  FaExchangeAlt,
  FaChartBar,
  FaTools,
  FaCode,
  FaCloud,
  FaPlug,
  FaBolt,
  FaShieldAlt,
  FaSyncAlt,
  FaTachometerAlt,
  FaExpandArrowsAlt,
  FaUsers,
  FaFileInvoiceDollar,
  FaHeadset,
  FaIndustry,
  FaChessKing,
  FaChevronDown,
  FaComments,
  FaBookOpen,
  FaStar,
} from "react-icons/fa";
import styles from "./AutomationWorkflows.module.css";

const heroStats = [
  { value: 85, suffix: "%", label: "Time Saved" },
  { value: 99, suffix: "%", label: "Accuracy" },
  { value: 300, suffix: "+", label: "Processes Automated" },
  { value: 60, suffix: "%", label: "Cost Reduction" },
];

const services = [
  {
    icon: <FaCogs />,
    title: "Process Automation",
    description:
      "End-to-end automation of repetitive business processes using RPA, workflow automation, and intelligent document processing.",
  },
  {
    icon: <FaProjectDiagram />,
    title: "Workflow Orchestration",
    description:
      "Design and implementation of complex multi-system workflows with conditional logic, approvals, and integrations.",
  },
  {
    icon: <FaBrain />,
    title: "AI-Powered Automation",
    description:
      "Intelligent automation using machine learning, natural language processing, and cognitive automation for complex decision-making.",
  },
  {
    icon: <FaExchangeAlt />,
    title: "System Integration",
    description:
      "Seamless integration between disparate systems, applications, and data sources to create unified automated workflows.",
  },
  {
    icon: <FaChartBar />,
    title: "Analytics & Monitoring",
    description:
      "Real-time monitoring, analytics, and reporting on automation performance, ROI, and process improvements.",
  },
];

const technologies = [
  {
    icon: <FaRobot />,
    title: "RPA Platforms",
    description:
      "UiPath, Automation Anywhere, Blue Prism for robotic process automation with attended and unattended bots.",
  },
  {
    icon: <FaCode />,
    title: "Workflow Engines",
    description:
      "Camunda, Activiti, Airflow, Prefect for complex workflow orchestration and business process management.",
  },
  {
    icon: <FaCloud />,
    title: "Low-Code Platforms",
    description:
      "Microsoft Power Automate, Zapier, Integromat for rapid automation development with minimal coding.",
  },
  {
    icon: <FaPlug />,
    title: "Integration Tools",
    description:
      "MuleSoft, Dell Boomi, Workato for enterprise-grade integration and API management across systems.",
  },
];

const excellenceItems = [
  {
    icon: <FaBolt />,
    title: "Rapid Implementation",
    description:
      "Quick deployment with minimal disruption, delivering ROI in weeks not months through agile automation development.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Enterprise Security",
    description:
      "Secure automation with role-based access, audit trails, data encryption, and compliance with industry standards.",
  },
  {
    icon: <FaSyncAlt />,
    title: "Scalable Architecture",
    description:
      "Modular design that grows with your business, handling increased volume without performance degradation.",
  },
  {
    icon: <FaChartLine />,
    title: "Measurable ROI",
    description:
      "Clear metrics and reporting showing time savings, cost reduction, error elimination, and productivity gains.",
  },
];

const featureCards = [
  {
    icon: <FaTachometerAlt />,
    title: "High Performance",
    description:
      "Optimized automation running 24/7 with sub-second response times and 99.9% uptime reliability.",
  },
  {
    icon: <FaExpandArrowsAlt />,
    title: "Flexible Scaling",
    description:
      "Automatically scale automation resources based on workload demands and business needs.",
  },
  {
    icon: <FaCogs />,
    title: "Easy Maintenance",
    description:
      "Simple monitoring, debugging, and updating of automation workflows with minimal IT intervention.",
  },
  {
    icon: <FaUsers />,
    title: "User-Centric Design",
    description:
      "Intuitive interfaces and notifications keeping human operators informed and in control.",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Process Discovery",
    description:
      "In-depth analysis of current processes, identification of automation opportunities, and ROI assessment.",
  },
  {
    number: "2",
    title: "Solution Design",
    description:
      "Architecture design, technology selection, and development of automation workflows with exception handling.",
  },
  {
    number: "3",
    title: "Development & Testing",
    description:
      "Automation development, rigorous testing, and validation with real data to ensure accuracy and reliability.",
  },
  {
    number: "4",
    title: "Deployment & Scaling",
    description:
      "Production deployment, user training, monitoring setup, and scaling across the organization.",
  },
];

const successStories = [
  {
    icon: <FaFileInvoiceDollar />,
    title: "Finance & Accounting",
    description:
      "Automated invoice processing, reconciliation, and reporting with 95% time reduction and 99.9% accuracy.",
  },
  {
    icon: <FaHeadset />,
    title: "Customer Service",
    description:
      "Automated ticket routing, response generation, and customer onboarding with 80% faster resolution.",
  },
  {
    icon: <FaIndustry />,
    title: "Manufacturing & Logistics",
    description:
      "Automated inventory management, order processing, and supply chain coordination with real-time tracking.",
  },
];

const testimonials = [
  {
    quote:
      "Intallia24 automated our manual invoice processing, reducing processing time from 15 minutes to 30 seconds per invoice. We saved 2,500 hours annually with 99.9% accuracy.",
    author: "Jennifer Martinez",
    role: "CFO, Global Manufacturing Corp",
  },
  {
    quote:
      "Their customer service automation reduced our response time by 80% and increased customer satisfaction scores from 78% to 94% in just three months.",
    author: "Thomas Reynolds",
    role: "VP Operations, TechSupport Solutions",
  },
  {
    quote:
      "The workflow automation system eliminated 90% of manual data entry errors and reduced our operational costs by 40% while improving compliance.",
    author: "Amanda Chen",
    role: "Director of Operations, HealthFirst Inc",
  },
];

const strategyCards = [
  {
    title: "Process Assessment & Prioritization",
    description:
      "Comprehensive process mining and analysis to identify high-ROI automation opportunities. Strategic prioritization based on complexity, ROI, and business impact for maximum value delivery.",
  },
  {
    title: "Technology Architecture",
    description:
      "Selection of appropriate automation platforms (RPA, workflow, integration) based on process requirements. Scalable architecture supporting 99.9% uptime, enterprise security, and future expansion.",
  },
  {
    title: "Governance & Scaling",
    description:
      "Center of Excellence (CoE) establishment, governance framework, and scaling strategy. Change management, training programs, and continuous optimization for sustainable automation success.",
  },
];

const faqs = [
  {
    question: "What is automation and how can it benefit my business?",
    answer:
      "Automation involves using technology to perform repetitive tasks and processes that were previously done manually. Benefits include significant time savings (typically 50-90%), cost reduction (30-70%), improved accuracy (99.9%+), faster processing, enhanced compliance, better employee satisfaction (by eliminating tedious work), and scalability to handle increased volume without adding staff.",
  },
  {
    question: "What types of processes are suitable for automation?",
    answer:
      "Ideal processes for automation are rule-based, repetitive, high-volume, prone to human error, time-consuming, and involve structured data. Common examples include data entry, report generation, invoice processing, customer onboarding, employee onboarding, inventory management, email processing, data validation, and system integrations. We conduct thorough process assessments to identify the best automation candidates in your organization.",
  },
  {
    question: "How long does it take to implement automation solutions?",
    answer:
      "Implementation timelines vary based on process complexity. Simple automations can be deployed in 2-4 weeks, while complex enterprise workflows typically take 6-12 weeks. We follow an agile approach with incremental deliveries, ensuring you see value early. The process includes discovery (1-2 weeks), design (1-2 weeks), development (2-6 weeks), testing (1-2 weeks), and deployment (1 week).",
  },
  {
    question: "What's the difference between RPA and workflow automation?",
    answer:
      "RPA (Robotic Process Automation) focuses on automating repetitive, rule-based tasks by mimicking human interactions with software applications. Workflow automation focuses on orchestrating end-to-end business processes that involve multiple steps, systems, people, and decisions. RPA is task-oriented, while workflow automation is process-oriented. Often, they work together—RPA handles individual tasks within larger workflows orchestrated by workflow automation tools.",
  },
  {
    question: "How do you ensure automation security and compliance?",
    answer:
      "We implement multiple security layers including role-based access controls, encryption of sensitive data, comprehensive audit trails, secure credential management, and compliance with regulations like GDPR, HIPAA, SOX, and PCI-DSS. Our automations include proper error handling, data validation, and exception management. We conduct security assessments and penetration testing before deployment.",
  },
  {
    question: "What about ongoing maintenance and support?",
    answer:
      "We offer comprehensive maintenance and support packages including 24/7 monitoring, performance optimization, regular updates, exception handling, and enhancement services. Our support includes monitoring automation performance, handling system changes, updating automation when applications change, and scaling automations as business needs evolve. We provide detailed analytics and regular reporting on automation performance and ROI.",
  },
  {
    question: "Can automation work with our existing systems?",
    answer:
      "Yes, automation solutions are designed to work with your existing systems without requiring major changes. Modern automation tools can interact with virtually any application—web-based, desktop, legacy systems, databases, APIs, and more. We use non-invasive techniques that work at the presentation layer (UI automation) or integration layer (APIs), avoiding the need for costly system modifications.",
  },
  {
    question: "How do you measure automation ROI?",
    answer:
      "We measure ROI through multiple metrics: time savings (hours reduced), cost reduction (FTE savings, error reduction costs), productivity gains (output increase), accuracy improvement (error rate reduction), compliance improvement (audit findings), and business impact (faster processing, better customer experience). We provide detailed dashboards showing real-time ROI metrics and conduct quarterly business reviews to track ongoing value.",
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

export default function AutomationWorkflows() {
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
            <FaRobot className={styles.titleIcon} />
            <h1 className={styles.mainTitle}>
              Automation & <span className={styles.highlight}>Workflows</span>
            </h1>
          </div>
          <p className={styles.heroDescription}>
            We design intelligent automation systems and streamlined workflows
            that transform manual processes into efficient, error-free
            operations. Our automation solutions help organizations reduce
            costs, increase productivity, eliminate human error, and scale
            operations seamlessly across departments and systems.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/contact" className={styles.btnPrimary}>
              Start Automation Project <FaArrowRight />
            </Link>
            <Link to="#" className={styles.btnSecondary}>
              View Case Studies <FaChartLine />
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

      {/* Automation Services Section */}
      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>Automation Services</h2>
        <p className={styles.sectionDescription}>
          From robotic process automation to complex workflow orchestration, we
          create intelligent automation solutions that transform manual
          operations into efficient, scalable digital processes.
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
          <h2 className={styles.sectionTitle}>Technologies & Platforms</h2>
        </div>
        <p className={styles.sectionDescription}>
          We leverage industry-leading automation technologies, RPA platforms,
          and workflow engines to build scalable automation solutions with 99.9%
          reliability, intelligent decision-making, and seamless integration
          capabilities.
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
          Why Choose Our Automation Solutions
        </h2>
        <p className={styles.sectionDescription}>
          We create automation solutions that don't just replace manual
          tasks—they transform entire business processes with intelligent
          decision-making, 99.9% accuracy, real-time monitoring, and measurable
          ROI that scales with your business growth.
        </p>
        <div className={styles.whyChooseContent}>
          <div className={styles.excellenceList}>
            <h3>Built for Operational Excellence</h3>
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
        <h2 className={styles.sectionTitle}>Our Automation Process</h2>
        <p className={styles.sectionDescription}>
          From process discovery to production deployment, our proven
          methodology ensures your automation delivers maximum efficiency,
          accuracy, and business value.
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

      {/* Success Stories Section */}
      <section className={styles.successSection}>
        <h2 className={styles.sectionTitle}>Automation Success Stories</h2>
        <p className={styles.sectionDescription}>
          We deliver automation solutions that transform business operations,
          reduce costs, and improve accuracy across industries and departments.
        </p>
        <div className={styles.successCards}>
          {successStories.map((story, index) => (
            <div key={index} className={styles.successCard}>
              <div className={styles.successIcon}>{story.icon}</div>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
        <p className={styles.sectionDescription}>
          Hear from organizations that transformed their operations with our
          automation solutions
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
          <h2 className={styles.sectionTitle}>Automation Strategy</h2>
        </div>
        <p className={styles.sectionDescription}>
          From process assessment to enterprise-wide automation deployment
          achieving 10x productivity gains. Our comprehensive automation
          strategy encompasses process optimization, technology selection, and
          continuous improvement for sustainable operational excellence.
        </p>
        <div className={styles.strategyCards}>
          {strategyCards.map((card, index) => (
            <div key={index} className={styles.strategyCard}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.platformCards}>
          <div className={`${styles.platformCard} ${styles.rpaCard}`}>
            <FaRobot className={styles.platformIcon} />
            <h3>RPA Solutions</h3>
            <ul>
              <li>UiPath, Automation Anywhere</li>
              <li>Attended & Unattended Bots</li>
              <li>Process Mining & Analytics</li>
            </ul>
          </div>
          <div className={`${styles.platformCard} ${styles.workflowCard}`}>
            <FaProjectDiagram className={styles.platformIcon} />
            <h3>Workflow Platforms</h3>
            <ul>
              <li>Camunda, Activiti, Airflow</li>
              <li>Business Process Management</li>
              <li>Complex Orchestration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Automation & Workflows FAQ</h2>
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
        <h2 className={styles.ctaTitle}>Ready to Transform Your Operations?</h2>
        <p className={styles.ctaDescription}>
          Empower your organization with intelligent automation solutions that
          eliminate manual work, reduce errors, and unlock new levels of
          efficiency. Transform your business processes with scalable automation
          that delivers measurable ROI, enhances employee satisfaction, and
          creates competitive advantage.
        </p>
        <div className={styles.ctaButtons}>
          <Link to="/contact" className={styles.btnCtaPrimary}>
            Get Auto-Assessment <FaComments />
          </Link>
          <Link to="#" className={styles.btnCtaSecondary}>
            View Success Stories <FaBookOpen />
          </Link>
        </div>
      </section>
    </main>
  );
}
