// src/pages/Dashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdContactMail,
  MdMarkEmailRead,
  MdReply,
  MdFiberNew,
  MdTrendingUp,
  MdArrowForward,
} from "react-icons/md";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import styles from "./Dashboard.module.css";

function StatCard({ icon, label, value, color, trend }) {
  return (
    <div className={styles.statCard} style={{ "--accent": color }}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statInfo}>
        <span className={styles.statValue}>{value ?? "—"}</span>
        <span className={styles.statLabel}>{label}</span>
      </div>
      {trend != null && (
        <div className={styles.statTrend}>
          <MdTrendingUp size={14} />
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ new: 0, read: 0, replied: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getContacts({ limit: 5 })
      .then((res) => {
        setContacts(res.data || []);
        setStats(res.stats || { new: 0, read: 0, replied: 0 });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const total = stats.new + stats.read + stats.replied;

  return (
    <Layout pageTitle="Dashboard" badgeCounts={{ contacts: stats.new }}>
      {/* Welcome Banner */}
      <div className={styles.welcome}>
        <div>
          <h2 className={styles.welcomeTitle}>
            Welcome back, {admin?.name?.split(" ")[0]} 👋
          </h2>
          <p className={styles.welcomeSub}>
            Here's what's happening with Intallia 24 today.
          </p>
        </div>
        <div className={styles.welcomeDate}>
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <StatCard
          icon={<MdContactMail size={26} />}
          label="Total Enquiries"
          value={loading ? "..." : total}
          color="#10b981"
        />
        <StatCard
          icon={<MdFiberNew size={26} />}
          label="New Enquiries"
          value={loading ? "..." : stats.new}
          color="#f59e0b"
          trend={stats.new > 0 ? `${stats.new} pending` : "All clear"}
        />
        <StatCard
          icon={<MdMarkEmailRead size={26} />}
          label="Read"
          value={loading ? "..." : stats.read}
          color="#3b82f6"
        />
        <StatCard
          icon={<MdReply size={26} />}
          label="Replied"
          value={loading ? "..." : stats.replied}
          color="#8b5cf6"
        />
      </div>

      {/* Recent Enquiries */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Recent Enquiries</h3>
          <button
            className={styles.viewAll}
            onClick={() => navigate("/dashboard/contacts")}
          >
            View All <MdArrowForward size={15} />
          </button>
        </div>

        {loading ? (
          <div className={styles.loadingRows}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeletonRow} />
            ))}
          </div>
        ) : contacts.length === 0 ? (
          <div className={styles.emptyState}>
            <MdContactMail size={40} />
            <p>No enquiries yet</p>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr
                    key={c._id}
                    className={styles.tableRow}
                    onClick={() => navigate("/dashboard/contacts")}
                  >
                    <td className={styles.tdName}>{c.name}</td>
                    <td className={styles.tdEmail}>{c.email}</td>
                    <td>{c.service || <span className={styles.na}>—</span>}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${styles[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className={styles.tdDate}>
                      {new Date(c.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
