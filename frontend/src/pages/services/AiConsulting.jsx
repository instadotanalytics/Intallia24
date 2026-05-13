import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaLightbulb,
  FaArrowRight,
  FaEye,
  FaChartLine,
  FaBrain,
  FaCogs,
  FaHandshake,
  FaShieldAlt,
  FaUsers,
  FaRocket,
  FaSearch,
  FaSyncAlt,
  FaExpandAlt,
  FaBolt,
  FaMoneyBillWave,
  FaUserFriends,
  FaChessKing,
  FaChevronDown,
  FaComments,
  FaBookOpen,
  FaStar,
  FaCheck,
  FaProjectDiagram,
} from "react-icons/fa";
import styles from "./AiConsulting.module.css";

const heroStats = [
  { value: 40, suffix: "+", label: "AI Strategies Delivered" },
  { value: 85, suffix: "%", label: "Adoption Success" },
  { value: 3, suffix: "x", label: "Avg. ROI Achieved" },
  { value: 60, suffix: "%", label: "Cost Optimization" },
];

const services = [
  {
    icon: <FaLightbulb />,
    title: "AI Readiness Assessment",
    description:
      "Comprehensive evaluation of your organization's data infrastructure, technical capabilities, and business processes to determine AI readiness and identify high-impact opportunities.",
  },
  {
    icon: <FaProjectDiagram />,
    title: "AI Strategy & Roadmap",
    description:
      "Custom AI strategy development aligned with business objectives, including technology selection, implementation roadmap, and ROI projections for sustainable AI adoption.",
  },
  {
    icon: <FaCogs />,
    title: "AI Implementation Planning",
    description:
      "Detailed implementation plans covering resource allocation, timeline management, risk mitigation, and change management for successful AI deployment.",
  },
  {
    icon: <FaBrain />,
    title: "AI Technology Selection",
    description:
      "Expert guidance on selecting the right AI technologies, frameworks, and platforms based on your specific use cases, budget, and technical requirements.",
  },
  {
    icon: <FaUsers />,
    title: "AI Training & Enablement",
    description:
      "Comprehensive training programs and workshops to build AI capabilities within your teams, foster data-driven culture, and ensure successful AI adoption.",
  },
];

const excellenceItems = [
  {
    icon: <FaBolt />,
    title: "Rapid Value Delivery",
    description:
      "Agile consulting approach that delivers tangible business value within weeks, not months, through focused AI initiatives and quick wins.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Responsible AI Framework",
    description:
      "Ethical AI consulting with bias detection, fairness guidelines, transparency measures, and compliance with AI regulations and industry standards.",
  },
  {
    icon: <FaSyncAlt />,
    title: "Continuous Optimization",
    description:
      "Ongoing performance monitoring, model refinement, and strategy adjustment to ensure your AI investments continue delivering maximum ROI.",
  },
  {
    icon: <FaExpandAlt />,
    title: "Scalable AI Architecture",
    description:
      "Future-proof AI architectures designed to scale with your business growth, supporting new use cases and expanding AI capabilities.",
  },
];

const featureCards = [
  {
    icon: <FaSearch />,
    title: "Opportunity Discovery",
    description:
      "Identify high-value AI opportunities across your organization through systematic business process analysis.",
  },
  {
    icon: <FaChartLine />,
    title: "ROI Modeling",
    description:
      "Detailed financial modeling and ROI projections for AI initiatives with clear success metrics and KPIs.",
  },
  {
    icon: <FaRocket />,
    title: "Accelerated Launch",
    description:
      "Fast-track your AI journey with proven frameworks, best practices, and expert guidance from day one.",
  },
  {
    icon: <FaHandshake />,
    title: "Vendor & Partner Selection",
    description:
      "Objective evaluation and selection of AI vendors, tools, and implementation partners aligned with your needs.",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Discovery & Assessment",
    description:
      "Deep analysis of business objectives, current capabilities, data maturity, and AI readiness across the organization.",
  },
  {
    number: "2",
    title: "Strategy Development",
    description:
      "Creating comprehensive AI strategy with prioritized use cases, technology roadmap, and implementation timeline.",
  },
  {
    number: "3",
    title: "Implementation Planning",
    description:
      "Detailed planning with resource allocation, budget planning, vendor selection, and change management strategy.",
  },
  {
    number: "4",
    title: "Execution & Optimization",
    description:
      "Guided implementation, performance monitoring, and continuous optimization for sustained AI success.",
  },
];

const impactCards = [
  {
    icon: <FaMoneyBillWave />,
    title: "Revenue Growth",
    description:
      "AI-powered strategies that unlock new revenue streams, optimize pricing, and enhance customer lifetime value.",
  },
  {
    icon: <FaCogs />,
    title: "Operational Excellence",
    description:
      "Process optimization and intelligent automation that reduce costs, improve efficiency, and eliminate bottlenecks.",
  },
  {
    icon: <FaUserFriends />,
    title: "Competitive Advantage",
    description:
      "Strategic AI adoption that differentiates your business, enhances decision-making, and creates market leadership.",
  },
];

const testimonials = [
  {
    quote:
      "Their AI consulting transformed our approach from scattered experiments to a cohesive strategy. We launched 5 successful AI initiatives in 6 months with clear ROI tracking.",
    author: "David Park",
    role: "CTO, Enterprise Solutions Inc.",
  },
  {
    quote:
      "The AI readiness assessment revealed gaps we hadn't considered. Their strategic roadmap helped us prioritize investments and achieve 3x ROI within the first year.",
    author: "Lisa Thompson",
    role: "VP Innovation, RetailTech Group",
  },
  {
    quote:
      "Their vendor-agnostic approach and deep technical expertise helped us select the right AI platform. Implementation was smooth and exceeded our expectations.",
    author: "James Wilson",
    role: "Director of AI, HealthFirst Corp",
  },
];

const strategyCards = [
  {
    title: "AI Maturity Assessment",
    description:
      "Evaluate your organization's AI maturity across dimensions including strategy, data, technology, talent, and governance. Receive actionable recommendations and benchmark comparisons.",
  },
  {
    title: "Business Case Development",
    description:
      "Build compelling business cases for AI investments with detailed ROI analysis, risk assessment, implementation costs, and expected outcomes for stakeholder buy-in.",
  },
  {
    title: "Change Management Strategy",
    description:
      "Comprehensive change management planning including stakeholder communication, training programs, cultural transformation, and adoption tracking for AI success.",
  },
];

const faqs = [
  {
    question: "What is AI consulting and why do we need it?",
    answer:
      "AI consulting helps organizations identify, plan, and implement artificial intelligence solutions that deliver real business value. It provides expert guidance on AI strategy, technology selection, implementation planning, and risk management. Without proper consulting, organizations often waste resources on ineffective AI projects, face adoption challenges, or miss critical opportunities.",
  },
  {
    question: "How long does an AI consulting engagement typically take?",
    answer:
      "Timelines vary based on scope and complexity. AI readiness assessments typically take 2-4 weeks, while comprehensive AI strategy development takes 4-8 weeks. Full implementation support can extend from 3-6 months depending on the number of use cases and organizational complexity. We deliver value incrementally so you see results early.",
  },
  {
    question: "Do you help with AI vendor and technology selection?",
    answer:
      "Absolutely. We provide vendor-agnostic guidance to help you select the right AI technologies, platforms, and tools based on your specific requirements, budget, and technical environment. We evaluate options across cloud AI services, ML platforms, specialized AI tools, and implementation partners to find the optimal fit.",
  },
  {
    question: "What industries do you provide AI consulting for?",
    answer:
      "We provide AI consulting across multiple industries including financial services, healthcare, retail, manufacturing, logistics, technology, and professional services. Our consultants have deep domain expertise and understand industry-specific challenges, regulations, and opportunities for AI adoption.",
  },
  {
    question: "How do you measure the success of AI consulting?",
    answer:
      "We establish clear KPIs and success metrics at the beginning of each engagement. These include AI adoption rates, ROI achieved, number of successful AI implementations, cost savings, revenue impact, and organizational AI maturity improvement. We provide regular progress reports and conduct quarterly business reviews.",
  },
  {
    question: "Do you provide AI training for our teams?",
    answer:
      "Yes, we offer comprehensive AI training and enablement programs including executive workshops, technical training for data teams, AI literacy programs for business users, and hands-on implementation guidance. Our goal is to build lasting AI capabilities within your organization, not create dependency.",
  },
  {
    question: "Can you help with existing AI projects that are struggling?",
    answer:
      "Yes, we often help organizations rescue and optimize struggling AI initiatives. We assess current challenges, identify root causes, and develop remediation plans. Whether it's model performance issues, adoption challenges, or ROI concerns, we bring expertise to get projects back on track.",
  },
  {
    question: "What's your approach to responsible and ethical AI?",
    answer:
      "We integrate responsible AI principles throughout our consulting process. This includes bias detection and mitigation, fairness testing, explainability requirements, transparency measures, privacy considerations, and regulatory compliance. We help organizations build AI systems that are fair, accountable, and trustworthy.",
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

export default function AiConsulting() {
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
            <FaLightbulb className={styles.titleIcon} />
            <h1 className={styles.mainTitle}>
              AI <span className={styles.highlight}>Consulting</span>
            </h1>
          </div>
          <p className={styles.heroDescription}>
            Unlock the full potential of artificial intelligence with our expert
            AI consulting services. We help organizations develop winning AI
            strategies, build implementation roadmaps, select the right
            technologies, and create lasting AI capabilities that drive
            measurable business value and competitive advantage.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/contact" className={styles.btnPrimary}>
              Get AI Consultation <FaArrowRight />
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

      {/* AI Consulting Services Section */}
      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>AI Consulting Services</h2>
        <p className={styles.sectionDescription}>
          From AI readiness assessment to full-scale implementation planning, we
          provide comprehensive consulting services that guide your organization
          through every stage of AI adoption and maturity.
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

      {/* Why Choose Section */}
      <section className={styles.whyChooseSection}>
        <h2 className={styles.sectionTitle}>Why Choose Our AI Consulting</h2>
        <p className={styles.sectionDescription}>
          We combine deep technical expertise with strategic business thinking
          to deliver AI consulting that creates lasting value, not just reports
          and presentations.
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
        <h2 className={styles.sectionTitle}>Our Consulting Process</h2>
        <p className={styles.sectionDescription}>
          Our proven consulting methodology ensures your AI initiatives are
          strategically aligned, properly planned, and successfully executed for
          maximum business impact.
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
        <h2 className={styles.sectionTitle}>Business Impact</h2>
        <p className={styles.sectionDescription}>
          Our AI consulting delivers measurable business outcomes that transform
          organizations and create sustainable competitive advantages.
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
          Hear from organizations that transformed their AI journey with our
          consulting expertise
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
          <h2 className={styles.sectionTitle}>AI Strategy & Planning</h2>
        </div>
        <p className={styles.sectionDescription}>
          From AI maturity assessment to comprehensive implementation planning,
          we provide the strategic guidance needed to build successful AI
          programs that deliver sustained business value.
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
            <h3>Strategic AI Advisory</h3>
            <ul>
              <li>
                <FaCheck /> AI Maturity Assessment
              </li>
              <li>
                <FaCheck /> Technology Stack Advisory
              </li>
              <li>
                <FaCheck /> AI Center of Excellence Setup
              </li>
            </ul>
          </div>
          <div className={`${styles.solutionCard} ${styles.biCard}`}>
            <FaCogs className={styles.solutionIcon} />
            <h3>Implementation Support</h3>
            <ul>
              <li>
                <FaCheck /> Project Planning & Governance
              </li>
              <li>
                <FaCheck /> Vendor Selection & Management
              </li>
              <li>
                <FaCheck /> Change Management & Training
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>AI Consulting FAQ</h2>
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
          Ready to Accelerate Your AI Journey?
        </h2>
        <p className={styles.ctaDescription}>
          Partner with our AI consulting experts to develop winning strategies,
          build implementation roadmaps, and create lasting AI capabilities that
          drive measurable business growth and competitive advantage.
        </p>
        <div className={styles.ctaButtons}>
          <Link to="/contact" className={styles.btnCtaPrimary}>
            Schedule AI Consultation <FaComments />
          </Link>
          <Link to="#" className={styles.btnCtaSecondary}>
            Explore Case Studies <FaBookOpen />
          </Link>
        </div>
      </section>
    </main>
  );
}
