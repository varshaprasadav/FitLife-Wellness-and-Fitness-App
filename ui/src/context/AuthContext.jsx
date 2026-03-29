import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/user/me", {
        credentials: "include"
      });

      if (!res.ok) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const data = await res.json();

      setProfile({
        userName: data.userName,
        role: data.role,
        isPaid: data.isPaid || false,
        subscriptionStart: data.subscriptionStart || null,
        currentPlan: data.currentPlan || null,
      });

    } catch (err) {
      console.error(err);
      setProfile(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const login = async (email, password) => {
    const res = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Login failed");
    await fetchProfile();
    return data.user;
  };

  const logout = async () => {
    await fetch("http://localhost:5000/user/logout", {
      method: "POST",
      credentials: "include"
    });
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ profile, loading, login, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);