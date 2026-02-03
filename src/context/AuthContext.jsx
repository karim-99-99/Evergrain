import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const ADMIN_USER = { username: "admin", password: "admin" };
const STORAGE_KEY = "evergrain_admin";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isAdmin));
  }, [isAdmin]);

  const login = (username, password) => {
    const ok =
      String(username).toLowerCase() === ADMIN_USER.username &&
      String(password) === ADMIN_USER.password;
    if (ok) setIsAdmin(true);
    return ok;
  };

  const logout = () => setIsAdmin(false);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
