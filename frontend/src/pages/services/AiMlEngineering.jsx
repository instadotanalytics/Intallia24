import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaBrain,
  FaArrowRight,
  FaEye,
  FaChartLine,
  FaLanguage,
  FaRobot,
  FaUserFriends,
  FaCogs,
  FaNetworkWired,
  FaCloud,
  FaChartBar,
  FaServer,
  FaShieldAlt,
  FaSyncAlt,
  FaExpandAlt,
  FaBolt,
  FaSearch,
  FaMoneyBillWave,
  FaChessKing,
  FaChevronDown,
  FaCheck,
  FaStar,
} from "react-icons/fa";
import styles from "./AiMlEngineering.module.css";

const heroStats = [
  { value: 35, suffix: "+", label: "AI Projects" },
  { value: 96, suffix: "%", label: "Model Accuracy" },
  { value: 15, suffix: "TB", label: "Data Processed" },
  { value: 45, suffix: "%", label: "Efficiency Gain" },
];

const services = [
  {
    icon: <FaChartLine />,
    title: "Predictive Analytics",
    description:
      "Advanced machine learning models for forecasting, trend analysis, and predictive insights that drive smarter business decisions and proactive strategies.",
  },
  {
    icon: <FaLanguage />,
    title: "Natural Language Processing",
    description:
      "Intelligent text analysis, sentiment detection, chatbots, and language translation systems that understand and process human language at scale.",
  },
  {
    icon: <FaEye />,
    title: "Computer Vision",
    description:
      "Image and video analysis systems for object detection, facial recognition, quality inspection, and visual pattern recognition applications.",
  },
  {
    icon: <FaRobot />,
    title: "Intelligent Automation",
    description:
      "AI-powered workflow automation, robotic process automation (RPA), and intelligent document processing that streamline operations and reduce manual effort.",
  },
  {
    icon: <FaUserFriends />,
    title: "Recommendation Systems",
    description:
      "Personalized recommendation engines for e-commerce, content platforms, and services that enhance user engagement and increase conversion rates.",
  },
];

const technologies = [
  {
    icon: <FaNetworkWired />,
    title: "Deep Learning Frameworks",
    description:
      "TensorFlow, PyTorch, Keras, MXNet for building and training sophisticated neural networks and deep learning models.",
  },
  {
    icon: <FaCloud />,
    title: "AI Cloud Platforms",
    description:
      "AWS SageMaker, Google Cloud AI, Azure Machine Learning, IBM Watson for scalable cloud-based AI development and deployment.",
  },
  {
    icon: <FaChartBar />,
    title: "ML Libraries & Tools",
    description:
      "Scikit-learn, XGBoost, LightGBM, Pandas, NumPy for machine learning model development, data processing, and analysis.",
  },
  {
    icon: <FaServer />,
    title: "MLOps & Deployment",
    description:
      "MLflow, Kubeflow, Docker, Kubernetes for model versioning, experiment tracking, and production deployment at scale.",
  },
];

const excellenceItems = [
  {
    icon: <FaCogs />,
    title: "End-to-End AI Solutions",
    description:
      "Complete AI lifecycle management from data preparation and model development to deployment and monitoring.",
  },
  {
    icon: <FaShieldAlt />,
    title: "AI Ethics & Compliance",
    description:
      "Responsible AI development with bias detection, explainability, and compliance with AI ethics guidelines and regulations.",
  },
  {
    icon: <FaSyncAlt />,
    title: "Real-Time AI Processing",
    description:
      "Streaming AI capabilities for immediate insights, real-time predictions, and automated decision-making workflows.",
  },
  {
    icon: <FaExpandAlt />,
    title: "Scalable AI Infrastructure",
    description:
      "Cloud-native AI architectures that scale seamlessly with data volume and computational complexity.",
  },
];

const featureCards = [
  {
    icon: <FaBolt />,
    title: "High Accuracy Models",
    description:
      "State-of-the-art algorithms achieving 96%+ accuracy across diverse use cases and industries.",
  },
  {
    icon: <FaSearch />,
    title: "Pattern Recognition",
    description:
      "Advanced algorithms that uncover hidden patterns and correlations in complex datasets.",
  },
  {
    icon: <FaRobot />,
    title: "Automated Learning",
    description:
      "Self-improving systems that continuously learn and adapt from new data and feedback.",
  },
  {
    icon: <FaChartLine />,
    title: "Performance Optimization",
    description:
      "Continuous model refinement and optimization for improved accuracy and efficiency.",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Problem Definition",
    description:
      "Understanding business objectives, defining success metrics, and identifying the right AI approach for your specific challenges.",
  },
  {
    number: "2",
    title: "Data Preparation",
    description:
      "Data collection, cleaning, labeling, and feature engineering to create high-quality training datasets for AI models.",
  },
  {
    number: "3",
    title: "Model Development",
    description:
      "Building, training, and validating machine learning models with iterative experimentation and hyperparameter tuning.",
  },
  {
    number: "4",
    title: "Deployment & Monitoring",
    description:
      "Production deployment, A/B testing, performance monitoring, and continuous improvement of AI systems.",
  },
];

const impactCards = [
  {
    icon: <FaMoneyBillWave />,
    title: "Revenue Growth",
    description:
      "AI-driven personalization, pricing optimization, and demand forecasting that increase sales and customer lifetime value.",
  },
  {
    icon: <FaCogs />,
    title: "Operational Efficiency",
    description:
      "Process automation, predictive maintenance, and resource optimization that reduce costs and improve productivity.",
  },
  {
    icon: <FaUserFriends />,
    title: "Customer Experience",
    description:
      "Intelligent chatbots, personalized recommendations, and sentiment analysis that enhance customer satisfaction and loyalty.",
  },
];

const testimonials = [
  {
    quote:
      "Their predictive maintenance system reduced our equipment downtime by 65% and saved over $2M in maintenance costs. The ROI exceeded our expectations.",
    author: "Robert Chen",
    role: "Operations Director, Manufacturing Corp",
  },
  {
    quote:
      "The AI-powered recommendation engine increased our average order value by 38% and customer retention by 25%. The results were transformative.",
    author: "Sarah Johnson",
    role: "CEO, E-Commerce Platform",
  },
  {
    quote:
      "Their fraud detection AI reduced false positives by 75% while catching 99% of fraudulent transactions. The accuracy and speed are remarkable.",
    author: "Michael Williams",
    role: "Head of Security, FinTech Company",
  },
];

const strategyCards = [
  {
    title: "AI Strategy & Roadmap",
    description:
      "Comprehensive AI readiness assessment, use case identification, and strategic roadmap development aligned with business objectives and technical capabilities.",
  },
  {
    title: "Model Development & Validation",
    description:
      "96%+ model accuracy with rigorous testing, cross-validation, and A/B testing frameworks. Real-time model performance monitoring and drift detection.",
  },
  {
    title: "Production & MLOps",
    description:
      "Seamless model deployment with MLOps practices, automated retraining pipelines, and ongoing performance optimization as data patterns evolve.",
  },
];

const faqs = [
  {
    question: "What types of AI/ML projects do you handle?",
    answer:
      "We handle a wide range of AI/ML projects including predictive analytics, natural language processing, computer vision, recommendation systems, fraud detection, anomaly detection, time series forecasting, customer segmentation, and intelligent automation. Our expertise spans across industries including finance, healthcare, retail, manufacturing, logistics, and technology.",
  },
  {
    question: "How do you ensure AI model accuracy and reliability?",
    answer:
      "We implement rigorous model validation frameworks including cross-validation, A/B testing, and continuous monitoring. Our processes include data quality assurance, bias detection, explainability analysis, and performance benchmarking. We achieve 96%+ accuracy through iterative refinement and hyperparameter optimization.",
  },
  {
    question: "What is your typical AI project timeline?",
    answer:
      "AI project timelines vary based on complexity. A proof-of-concept can be delivered in 4-6 weeks, while comprehensive AI solutions typically take 3-6 months. We follow agile methodologies with regular deliverables and stakeholder reviews to ensure alignment and timely delivery.",
  },
  {
    question: "Do you provide ongoing AI model maintenance and updates?",
    answer:
      "Yes, we offer comprehensive AI maintenance packages including model monitoring, performance optimization, regular retraining, and updates as data patterns evolve. We provide SLAs for response times and have dedicated MLOps teams for ongoing maintenance and enhancement of AI systems.",
  },
  {
    question: "How do you handle AI ethics and bias?",
    answer:
      "We implement AI ethics frameworks including bias detection, fairness testing, explainability analysis, and transparency measures. We follow responsible AI principles, conduct regular ethics reviews, and implement governance processes to ensure our AI systems are fair, transparent, and accountable.",
  },
  {
    question: "Can you work with our existing data infrastructure?",
    answer:
      "Yes, we have extensive experience integrating with various data platforms including cloud services (AWS, Azure, GCP), on-premise systems, data warehouses, and business applications. We can work with your existing infrastructure or recommend improvements based on your AI requirements.",
  },
  {
    question: "How do you measure the success of AI projects?",
    answer:
      "We establish clear KPIs and success metrics aligned with business objectives before project initiation. Success is measured through model accuracy, business impact metrics (revenue increase, cost reduction), user adoption rates, and ROI calculations. We provide regular reporting on these metrics throughout the project lifecycle.",
  },
  {
    question: "Do you provide AI training and knowledge transfer?",
    answer:
      "Yes, we offer comprehensive AI training programs, documentation, and knowledge transfer sessions to ensure your team can effectively use and maintain the AI solutions we deliver. We believe in empowering your organization with the skills needed for ongoing AI-driven decision making.",
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

export default function AiMlEngineering() {
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
            <FaBrain className={styles.titleIcon} />
            <h1 className={styles.mainTitle}>
              AI/ML <span className={styles.highlight}>Engineering</span>
            </h1>
          </div>
          <p className={styles.heroDescription}>
            We build intelligent systems that learn, adapt, and transform
            businesses. Our AI/ML engineering services help organizations
            harness the power of artificial intelligence to automate processes,
            gain predictive insights, and create competitive advantages through
            data-driven decision making.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/contact" className={styles.btnPrimary}>
              Start Your AI Project <FaArrowRight />
            </Link>
            <Link to="#" className={styles.btnSecondary}>
              View AI Solutions <FaEye />
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

      {/* AI/ML Services Section */}
      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>AI/ML Engineering Services</h2>
        <p className={styles.sectionDescription}>
          From predictive analytics to autonomous systems, we deliver
          comprehensive AI solutions that transform data into actionable
          intelligence and automate complex business processes.
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

      {/* AI Technologies Section */}
      <section className={styles.techSection}>
        <div className={styles.techHeader}>
          <FaCogs className={styles.techHeaderIcon} />
          <h2 className={styles.sectionTitle}>AI Technologies & Frameworks</h2>
        </div>
        <p className={styles.sectionDescription}>
          We leverage cutting-edge AI technologies, machine learning frameworks,
          and cloud platforms to deliver scalable, accurate, and
          production-ready AI solutions that drive business transformation.
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
          Why Choose Our AI/ML Engineering
        </h2>
        <p className={styles.sectionDescription}>
          We deliver AI solutions that don't just run algorithms—they provide
          actionable intelligence with 96%+ model accuracy, real-time processing
          capabilities, scalable architectures, and measurable business impact
          that drives revenue growth and operational efficiency.
        </p>
        <div className={styles.whyChooseContent}>
          <div className={styles.excellenceList}>
            <h3>Built for AI Excellence</h3>
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
        <h2 className={styles.sectionTitle}>Our AI Development Process</h2>
        <p className={styles.sectionDescription}>
          From problem definition to production deployment, our proven
          methodology ensures your AI initiatives deliver maximum business value
          and measurable outcomes.
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
        <h2 className={styles.sectionTitle}>AI Business Impact</h2>
        <p className={styles.sectionDescription}>
          We focus on delivering measurable business outcomes and tangible ROI
          through AI-powered automation, optimization, and intelligent decision
          support.
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
          transformed their business with our AI solutions
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
          <h2 className={styles.sectionTitle}>AI Strategy & Implementation</h2>
        </div>
        <p className={styles.sectionDescription}>
          From AI readiness assessment through model development to production
          deployment achieving 96%+ accuracy rates. Our comprehensive AI
          strategy encompasses data governance, model ops, and continuous
          improvement for sustainable AI-driven transformation.
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
              <li>
                <FaCheck /> Predictive Analytics & Forecasting
              </li>
              <li>
                <FaCheck /> Natural Language Processing
              </li>
              <li>
                <FaCheck /> Computer Vision & Image Analysis
              </li>
            </ul>
          </div>
          <div className={`${styles.solutionCard} ${styles.automationCard}`}>
            <FaRobot className={styles.solutionIcon} />
            <h3>Intelligent Automation</h3>
            <ul>
              <li>
                <FaCheck /> Process Automation (RPA)
              </li>
              <li>
                <FaCheck /> Intelligent Document Processing
              </li>
              <li>
                <FaCheck /> Workflow Optimization
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>AI/ML Engineering FAQ</h2>
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
      <section className={styles.transformSection}>
        <h2 className={styles.sectionTitle}>
          Ready to Transform Your Business with AI?
        </h2>
        <p className={styles.sectionDescription}>
          Unlock the power of artificial intelligence with our expert AI/ML
          engineering solutions. Transform data into intelligent systems that
          automate processes, optimize operations, and create sustainable
          competitive advantages for your organization.
        </p>
        <div className={styles.transformButtons}>
          <Link to="/contact" className={styles.btnTransformPrimary}>
            Get Free AI Assessment <FaBrain />
          </Link>
          <Link to="#" className={styles.btnTransformSecondary}>
            View Case Studies <FaChartBar />
          </Link>
        </div>
      </section>
    </main>
  );
}
