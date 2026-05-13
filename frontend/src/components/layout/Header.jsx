import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaBoxOpen,
  FaBuilding,
  FaHeart,
  FaUsers,
  FaChevronDown,
  FaCommentDots,
  FaLayerGroup,
  FaChartBar,
  FaDatabase,
  FaMobileAlt,
  FaGlobe,
  FaRobot,
  FaTimes,
} from "react-icons/fa";
import styles from "./Header.module.css";

// Logo image - replace with actual path
import logo from "../../assets/images/intallialogo.png";

const NAV_ITEMS = [
  {
    label: "Home",
    icon: <FaHome />,
    path: "/",
  },
  {
    label: "About Us",
    icon: <FaInfoCircle />,
    dropdown: [
      { label: "Our Company", icon: <FaBuilding />, path: "/about" },
      { label: "How We Work", icon: <FaCogs />, path: "/about/how-we-work" },
      { label: "Our Values", icon: <FaHeart />, path: "/about/our-values" },
      {
        label: "Our Working Culture",
        icon: <FaUsers />,
        path: "/about/working-culture",
      },
    ],
  },
  {
    label: "Services",
    icon: <FaCogs />,
    dropdown: [
      {
        label: "Data Science & Analytics",
        icon: <FaLayerGroup />,
        path: "/services/data-science-analytics",
      },
      {
        label: "AI / ML Engineering",
        icon: <FaChartBar />,
        path: "/services/ai-ml-engineering",
      },
      {
        label: "AI Consulting",
        icon: <FaRobot />,
        path: "/services/ai-consulting",
      },
      {
        label: "Data Intelligence Solutions",
        icon: <FaMobileAlt />,
        path: "/services/data-intelligence-solutions",
      },
      {
        label: "Data Engineering",
        icon: <FaGlobe />,
        path: "/services/data-engineering",
      },
      {
        label: "Automation & Workflows",
        icon: <FaRobot />,
        path: "/services/automation-workflows",
      },
    ],
  },
  {
    label: "Products",
    icon: <FaBoxOpen />,
    path: "/products",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleGetInTouch = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Intallia24" className={styles.logoImg} />
          </Link>
        </div>

        {/* Mobile Toggle - Only visible on mobile */}
        <button
          className={`${styles.menuToggle} ${menuOpen ? styles.active : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <FaTimes />
          ) : (
            <>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </>
          )}
        </button>

        {/* Nav Menu */}
        <ul className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className={`${styles.navItem} ${item.dropdown ? styles.dropdown : ""} ${openDropdown === item.label ? styles.dropdownActive : ""}`}
            >
              {item.dropdown ? (
                <>
                  <button
                    className={`${styles.navLink} ${styles.dropdownToggle}`}
                    onClick={() => toggleDropdown(item.label)}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    {item.label}
                    <FaChevronDown
                      className={`${styles.dropdownIcon} ${openDropdown === item.label ? styles.rotated : ""}`}
                    />
                  </button>
                  <ul
                    className={`${styles.dropdownMenu} ${openDropdown === item.label ? styles.dropdownOpen : ""}`}
                  >
                    {item.dropdown.map((sub) => (
                      <li key={sub.label} className={styles.dropdownItem}>
                        <Link to={sub.path} className={styles.dropdownLink}>
                          <span className={styles.dropdownIcon2}>
                            {sub.icon}
                          </span>
                          <span>{sub.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ""}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  {item.label}
                </Link>
              )}
            </li>
          ))}

          {/* Mobile CTA Button inside menu */}
          <li className={styles.mobileCtaItem}>
            <Link
              to="/contact"
              className={styles.mobileCtaButton}
              onClick={handleGetInTouch}
            >
              <FaCommentDots />
              Get In Touch
            </Link>
          </li>
        </ul>

        {/* Desktop CTA Button - Only visible on desktop */}
        <div className={styles.desktopCta}>
          <Link to="/contact" className={styles.ctaButton}>
            <FaCommentDots />
            Get In Touch
          </Link>
        </div>
      </nav>
    </header>
  );
}
