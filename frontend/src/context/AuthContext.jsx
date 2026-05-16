// // src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import api from "../utils/api";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("intallia_token");
//     if (token) {
//       api
//         .getMe()
//         .then((res) => setAdmin(res.admin))
//         .catch(() => {
//           localStorage.removeItem("intallia_token");
//         })
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = async (credentials) => {
//     const res = await api.login(credentials);
//     localStorage.setItem("intallia_token", res.token);
//     setAdmin(res.admin);
//     return res;
//   };

//   const logout = async () => {
//     await api.logout().catch(() => {});
//     localStorage.removeItem("intallia_token");
//     setAdmin(null);
//   };

//   return (
//     <AuthContext.Provider value={{ admin, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// };

// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("intallia_token");
    const savedAdmin = localStorage.getItem("intallia_admin");

    // Restore admin instantly from localStorage
    if (savedAdmin) {
      try {
        setAdmin(JSON.parse(savedAdmin));
      } catch (error) {
        console.error("Failed to parse admin data:", error);
        localStorage.removeItem("intallia_admin");
      }
    }

    if (token) {
      api
        .getMe()
        .then((res) => {
          setAdmin(res.admin);

          // Update latest admin data
          localStorage.setItem(
            "intallia_admin",
            JSON.stringify(res.admin),
          );
        })
        .catch(() => {
          localStorage.removeItem("intallia_token");
          localStorage.removeItem("intallia_admin");
          setAdmin(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const res = await api.login(credentials);

    // Save token
    localStorage.setItem("intallia_token", res.token);

    // Save admin data
    localStorage.setItem(
      "intallia_admin",
      JSON.stringify(res.admin),
    );

    // Update state
    setAdmin(res.admin);

    return res;
  };

  const logout = async () => {
    await api.logout().catch(() => {});

    localStorage.removeItem("intallia_token");
    localStorage.removeItem("intallia_admin");

    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
};