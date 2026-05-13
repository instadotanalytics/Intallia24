// src/pages/Contacts/Contacts.jsx
import { useEffect, useState, useCallback } from "react";
import {
  MdDelete,
  MdVisibility,
  MdClose,
  MdSearch,
  MdFilterList,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdPhone,
  MdEmail,
  MdPerson,
  MdMessage,
  MdBusiness,
  MdCalendarToday,
  MdRefresh,
  MdDeleteSweep,
} from "react-icons/md";
import Layout from "../../components/layout/Layout";
import api from "../../utils/api";
import styles from "./Contacts.module.css";

const STATUS_OPTIONS = ["all", "new", "read", "replied"];

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ new: 0, read: 0, replied: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [statusFilter, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [detail, setDetail] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null); // id or "bulk"

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (statusFilter !== "all") params.status = statusFilter;
      const res = await api.getContacts(params);
      setContacts(res.data || []);
      setStats(res.stats || { new: 0, read: 0, replied: 0 });
      setPagination(res.pagination || {});
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Search filter (client-side for current page)
  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone || "").includes(search),
  );

  const toggleSelect = (id) =>
    setSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const toggleAll = () =>
    setSelected(
      selected.length === filtered.length ? [] : filtered.map((c) => c._id),
    );

  const handleStatusChange = async (id, status) => {
    try {
      await api.updateContactStatus(id, status);
      setContacts((p) => p.map((c) => (c._id === id ? { ...c, status } : c)));
      if (detail?._id === id) setDetail((p) => ({ ...p, status }));
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteContact(id);
      setContacts((p) => p.filter((c) => c._id !== id));
      setSelected((p) => p.filter((x) => x !== id));
      if (detail?._id === id) setDetail(null);
      setDelConfirm(null);
      fetchContacts();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await api.bulkDeleteContacts(selected);
      setContacts((p) => p.filter((c) => !selected.includes(c._id)));
      setSelected([]);
      setDelConfirm(null);
      fetchContacts();
    } catch (e) {
      alert(e.message);
    }
  };

  const openDetail = async (c) => {
    setDetail(c);
    if (c.status === "new") {
      await api.updateContactStatus(c._id, "read").catch(() => {});
      setContacts((p) =>
        p.map((x) => (x._id === c._id ? { ...x, status: "read" } : x)),
      );
    }
  };

  const totalNew = stats.new;

  return (
    <Layout pageTitle="Contact Enquiries" badgeCounts={{ contacts: totalNew }}>
      {/* Stat pills */}
      <div className={styles.pills}>
        {STATUS_OPTIONS.map((s) => {
          const count =
            s === "all"
              ? stats.new + stats.read + stats.replied
              : (stats[s] ?? 0);
          return (
            <button
              key={s}
              className={`${styles.pill} ${statusFilter === s ? styles.pillActive : ""}`}
              onClick={() => {
                setStatus(s);
                setPage(1);
                setSelected([]);
              }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
              <span className={styles.pillCount}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <MdSearch className={styles.searchIcon} size={18} />
          <input
            className={styles.searchInput}
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className={styles.clearSearch}
              onClick={() => setSearch("")}
            >
              <MdClose size={15} />
            </button>
          )}
        </div>

        <div className={styles.toolbarActions}>
          {selected.length > 0 && (
            <button
              className={styles.bulkDeleteBtn}
              onClick={() => setDelConfirm("bulk")}
            >
              <MdDeleteSweep size={17} />
              Delete ({selected.length})
            </button>
          )}
          <button className={styles.refreshBtn} onClick={fetchContacts}>
            <MdRefresh size={17} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        {loading ? (
          <div className={styles.loadingRows}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={styles.skeletonRow} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <MdMessage size={44} />
            <p>No enquiries found</p>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    <button className={styles.checkBtn} onClick={toggleAll}>
                      {selected.length === filtered.length &&
                      filtered.length > 0 ? (
                        <MdCheckBox size={18} color="#10b981" />
                      ) : (
                        <MdCheckBoxOutlineBlank size={18} />
                      )}
                    </button>
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c._id}
                    className={`${styles.row} ${c.status === "new" ? styles.rowNew : ""}`}
                  >
                    <td>
                      <button
                        className={styles.checkBtn}
                        onClick={() => toggleSelect(c._id)}
                      >
                        {selected.includes(c._id) ? (
                          <MdCheckBox size={18} color="#10b981" />
                        ) : (
                          <MdCheckBoxOutlineBlank size={18} />
                        )}
                      </button>
                    </td>
                    <td className={styles.tdName}>
                      <div className={styles.nameAvatar}>
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      {c.name}
                    </td>
                    <td className={styles.tdEmail}>{c.email}</td>
                    <td className={styles.tdPhone}>{c.phone}</td>
                    <td>
                      {c.service ? (
                        <span className={styles.serviceTag}>{c.service}</span>
                      ) : (
                        <span className={styles.na}>—</span>
                      )}
                    </td>
                    <td>
                      <select
                        className={`${styles.statusSelect} ${styles[c.status]}`}
                        value={c.status}
                        onChange={(e) =>
                          handleStatusChange(c._id, e.target.value)
                        }
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </td>
                    <td className={styles.tdDate}>
                      {new Date(c.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.viewBtn}
                          onClick={() => openDetail(c)}
                          title="View"
                        >
                          <MdVisibility size={16} />
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => setDelConfirm(c._id)}
                          title="Delete"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className={styles.pagination}>
            <span className={styles.pageInfo}>
              Page {pagination.page} of {pagination.pages} · {pagination.total}{" "}
              total
            </span>
            <div className={styles.pageButtons}>
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className={styles.pageBtn}
              >
                Prev
              </button>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ""}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                disabled={page === pagination.pages}
                onClick={() => setPage((p) => p + 1)}
                className={styles.pageBtn}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── DETAIL MODAL ────────────────────────────────── */}
      {detail && (
        <div className={styles.modalOverlay} onClick={() => setDetail(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Enquiry Details</h3>
              <button
                className={styles.modalClose}
                onClick={() => setDetail(null)}
              >
                <MdClose size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <MdPerson className={styles.detailIcon} size={16} />
                  <div>
                    <span className={styles.detailLabel}>Full Name</span>
                    <span className={styles.detailValue}>{detail.name}</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <MdEmail className={styles.detailIcon} size={16} />
                  <div>
                    <span className={styles.detailLabel}>Email</span>
                    <a
                      href={`mailto:${detail.email}`}
                      className={styles.detailLink}
                    >
                      {detail.email}
                    </a>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <MdPhone className={styles.detailIcon} size={16} />
                  <div>
                    <span className={styles.detailLabel}>Phone</span>
                    <a
                      href={`tel:${detail.phone}`}
                      className={styles.detailLink}
                    >
                      {detail.phone}
                    </a>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <MdBusiness className={styles.detailIcon} size={16} />
                  <div>
                    <span className={styles.detailLabel}>Service</span>
                    <span className={styles.detailValue}>
                      {detail.service || "Not specified"}
                    </span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <MdCalendarToday className={styles.detailIcon} size={16} />
                  <div>
                    <span className={styles.detailLabel}>Submitted On</span>
                    <span className={styles.detailValue}>
                      {new Date(detail.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <MdFilterList className={styles.detailIcon} size={16} />
                  <div>
                    <span className={styles.detailLabel}>Status</span>
                    <select
                      className={`${styles.statusSelect} ${styles[detail.status]}`}
                      value={detail.status}
                      onChange={(e) =>
                        handleStatusChange(detail._id, e.target.value)
                      }
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.messageBox}>
                <div className={styles.messageLabel}>
                  <MdMessage size={15} /> Message
                </div>
                <p className={styles.messageText}>{detail.message}</p>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.modalDeleteBtn}
                onClick={() => {
                  setDetail(null);
                  setDelConfirm(detail._id);
                }}
              >
                <MdDelete size={16} /> Delete
              </button>
              <a
                href={`mailto:${detail.email}?subject=Re: Your Enquiry at Intallia 24`}
                className={styles.replyBtn}
              >
                <MdEmail size={16} /> Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM ──────────────────────────────── */}
      {delConfirm && (
        <div
          className={styles.modalOverlay}
          onClick={() => setDelConfirm(null)}
        >
          <div
            className={styles.confirmModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.confirmIcon}>
              <MdDelete size={28} />
            </div>
            <h3 className={styles.confirmTitle}>Confirm Delete</h3>
            <p className={styles.confirmText}>
              {delConfirm === "bulk"
                ? `Are you sure you want to delete ${selected.length} selected enquiries? This cannot be undone.`
                : "Are you sure you want to delete this enquiry? This cannot be undone."}
            </p>
            <div className={styles.confirmActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setDelConfirm(null)}
              >
                Cancel
              </button>
              <button
                className={styles.confirmDeleteBtn}
                onClick={() =>
                  delConfirm === "bulk"
                    ? handleBulkDelete()
                    : handleDelete(delConfirm)
                }
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
