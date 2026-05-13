import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

// ── Public Layout ──────────────────────────────────────────
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// ── Public Pages ───────────────────────────────────────────
import Home from "./pages/Home";
import About from "./pages/about/About";
import OurWork from "./pages/about/OurWork";
import OurValues from "./pages/about/OurValues";
import OurWorkingCulture from "./pages/about/OurWorkingCulture";
import ContactSection from "./components/home/ContactSection";
import DataScienceAnalytics from "./pages/services/DataScienceAnalytics";
import AiMlEngineering from "./pages/services/AiMlEngineering";
import DataEngineering from "./pages/services/DataEngineering";
import AutomationWorkflows from "./pages/services/AutomationWorkflows";
import AiConsulting from "./pages/services/AiConsulting";
import DataIntelligenceSolutions from "./pages/services/DataIntelligenceSolutions";
import Products from "./pages/products/Products";

// ── Admin ──────────────────────────────────────────────────
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Contacts from "./pages/contacts/Contacts";
import Placeholder from "./pages/placeholder/Placeholder";

// ── Scroll to Top ──────────────────────────────────────────
function ScrollToTopHandler() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ── Public Layout Wrapper (Header + Footer) ────────────────
function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTopHandler />
        <Routes>
          {/* ── PUBLIC ROUTES (with Header/Footer) ───────── */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <About />
              </PublicLayout>
            }
          />
          <Route
            path="/about/how-we-work"
            element={
              <PublicLayout>
                <OurWork />
              </PublicLayout>
            }
          />
          <Route
            path="/about/our-values"
            element={
              <PublicLayout>
                <OurValues />
              </PublicLayout>
            }
          />
          <Route
            path="/about/working-culture"
            element={
              <PublicLayout>
                <OurWorkingCulture />
              </PublicLayout>
            }
          />
          <Route
            path="/services/data-science-analytics"
            element={
              <PublicLayout>
                <DataScienceAnalytics />
              </PublicLayout>
            }
          />
          <Route
            path="/services/ai-ml-engineering"
            element={
              <PublicLayout>
                <AiMlEngineering />
              </PublicLayout>
            }
          />
          <Route
            path="/services/data-engineering"
            element={
              <PublicLayout>
                <DataEngineering />
              </PublicLayout>
            }
          />
          <Route
            path="/services/automation-workflows"
            element={
              <PublicLayout>
                <AutomationWorkflows />
              </PublicLayout>
            }
          />
          <Route
            path="/services/ai-consulting"
            element={
              <PublicLayout>
                <AiConsulting />
              </PublicLayout>
            }
          />
          <Route
            path="/services/data-intelligence-solutions"
            element={
              <PublicLayout>
                <DataIntelligenceSolutions />
              </PublicLayout>
            }
          />
          <Route
            path="/products"
            element={
              <PublicLayout>
                <Products />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <ContactSection />
              </PublicLayout>
            }
          />

          {/* ── ADMIN LOGIN ───────────────────────────────── */}
          <Route path="/admin/login" element={<Login />} />

          {/* ── PROTECTED ADMIN ROUTES ────────────────────── */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/contacts" element={<Contacts />} />
            <Route
              path="/dashboard/newsletter"
              element={<Placeholder title="Newsletter" />}
            />
            <Route
              path="/dashboard/users"
              element={<Placeholder title="Users" />}
            />
            <Route
              path="/dashboard/analytics"
              element={<Placeholder title="Analytics" />}
            />
            <Route
              path="/dashboard/settings"
              element={<Placeholder title="Settings" />}
            />
          </Route>

          {/* ── REDIRECTS ─────────────────────────────────── */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/login" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
