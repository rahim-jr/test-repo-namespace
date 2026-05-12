import { createContext, useState, useEffect } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  setAuthToken,
} from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { token, user } = await apiLogin(email, password);
    setAuthToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  const register = async (name, email, password) => {
    const { token, user } = await apiRegister(name, email, password);
    setAuthToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
