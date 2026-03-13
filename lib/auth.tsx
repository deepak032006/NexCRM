"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { loginApi, registerApi } from "./api";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    name: string,
    password: string,
    password2: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("nexcrm_token");

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginApi(email, password);

    const token =
      res?.token?.access ||
      res?.access ||
      res?.access_token ||
      res?.token;

    if (token) {
      localStorage.setItem("nexcrm_token", token);
      setIsAuthenticated(true); // ⭐ important
    }

    setUser(res.user || res);
  };

  const register = async (
    email: string,
    name: string,
    password: string,
    password2: string
  ) => {
    const res = await registerApi(email, name, password, password2);

    const token =
      res?.token?.access ||
      res?.access ||
      res?.access_token ||
      res?.token;

    if (token) {
      localStorage.setItem("nexcrm_token", token);
      setIsAuthenticated(true);
    }

    setUser(res.user || res);
  };

  const logout = () => {
    localStorage.removeItem("nexcrm_token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}