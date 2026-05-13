// src/pages/Placeholder/Placeholder.jsx
import Layout from "../../components/layout/Layout";
import styles from "./Placeholder.module.css";
import { MdConstruction } from "react-icons/md";

export default function Placeholder({ title }) {
  return (
    <Layout pageTitle={title}>
      <div className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <MdConstruction size={40} />
          </div>
          <h2 className={styles.heading}>Coming Soon</h2>
          <p className={styles.text}>
            <strong>{title}</strong> feature is under development. It will be
            available in the next update.
          </p>
          <div className={styles.badge}>🚀 Future Feature</div>
        </div>
      </div>
    </Layout>
  );
}
