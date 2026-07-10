"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  // ==========================
  // Load User From LocalStorage
  // ==========================

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);

      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // ==========================
  // Login
  // ==========================

  const login = (userData, jwtToken) => {
    localStorage.setItem("token", jwtToken);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

    setToken(jwtToken);
  };

  // ==========================
  // Logout
  // ==========================

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ==========================
// Custom Hook
// ==========================

export const useAuth = () => {
  return useContext(AuthContext);
};