// src/components/Layout/Layout.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdContactMail,
  MdPeople,
  MdBarChart,
  MdSettings,
  MdEmail,
  MdLogout,
  MdMenu,
  MdClose,
  MdNotifications,
  MdBusiness,
} from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import styles from "./Layout.module.css";

const NAV_ITEMS = [
  {
    section: "Main",
    items: [{ label: "Dashboard", icon: <MdDashboard />, path: "/dashboard" }],
  },
  {
    section: "Management",
    items: [
      {
        label: "Contact Enquiries",
        icon: <MdContactMail />,
        path: "/dashboard/contacts",
        badgeKey: "contacts",
      },
      { label: "Newsletter", icon: <MdEmail />, path: "/dashboard/newsletter" },
      { label: "Users", icon: <MdPeople />, path: "/dashboard/users" },
    ],
  },
  {
    section: "Reports",
    items: [
      {
        label: "Analytics",
        icon: <MdBarChart />,
        path: "/dashboard/analytics",
      },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Settings", icon: <MdSettings />, path: "/dashboard/settings" },
    ],
  },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Layout({
  children,
  pageTitle = "Dashboard",
  badgeCounts = {},
}) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const handleNav = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
        {/* Logo */}
        <div className={styles.sidebarLogo}>
          <div className={styles.logoIcon}>i</div>
          <div className={styles.logoTextWrap}>
            <span className={styles.logoName}>INTALLIA 24</span>
            <span className={styles.logoTagline}>Admin Portal</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {NAV_ITEMS.map((group) => (
            <div className={styles.navSection} key={group.section}>
              <p className={styles.navSectionTitle}>{group.section}</p>
              {group.items.map((item) => {
                const isActive =
                  item.path === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.path);
                const badge = item.badgeKey ? badgeCounts[item.badgeKey] : null;

                return (
                  <button
                    key={item.path}
                    className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                    onClick={() => handleNav(item.path)}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                    {badge > 0 && <span className={styles.badge}>{badge}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Bottom - Admin Info */}
        <div className={styles.sidebarBottom}>
          <div className={styles.sidebarAdminCard}>
            <div className={styles.sidebarAvatar}>
              {getInitials(admin?.name)}
            </div>
            <div className={styles.sidebarAdminInfo}>
              <span className={styles.sidebarAdminName}>
                {admin?.name || "Admin"}
              </span>
              <span className={styles.sidebarAdminRole}>
                {admin?.role || "admin"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────────────────── */}
      <div className={styles.main}>
        {/* ── HEADER ──────────────────────────────────────── */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button
              className={styles.menuBtn}
              onClick={() => setSidebarOpen((p) => !p)}
            >
              {sidebarOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
            </button>
            <div className={styles.headerTitleWrap}>
              <h1 className={styles.pageTitle}>{pageTitle}</h1>
              <p className={styles.breadcrumb}>
                Intallia 24 · Admin · {pageTitle}
              </p>
            </div>
          </div>

          <div className={styles.headerRight}>
            {/* Notification bell */}
            <button className={styles.headerAction} title="Notifications">
              <MdNotifications size={20} />
              {badgeCounts.contacts > 0 && <span className={styles.notifDot} />}
            </button>

            {/* Profile */}
            <div className={styles.profile}>
              <div className={styles.avatar}>{getInitials(admin?.name)}</div>
              <div className={styles.adminInfo}>
                <span className={styles.adminName}>
                  {admin?.name || "Admin"}
                </span>
                <span className={styles.adminRole}>
                  {admin?.role === "superadmin" ? "Super Admin" : "Admin"}
                </span>
              </div>
            </div>

            {/* Logout */}
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <MdLogout size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* ── CONTENT ─────────────────────────────────────── */}
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
