import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCurrentUser,
  isAuthenticated,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On first load, if a token already exists, try to resolve the
    // current user from the backend so a refresh doesn't log you out.
    async function bootstrap() {
      if (isAuthenticated()) {
        try {
          const data = await fetchCurrentUser();
          setUser(data?.user ?? data ?? null);
        } catch {
          logoutRequest();
        }
      }
      setLoading(false);
    }
    bootstrap();
  }, []);

  async function login(credentials) {
    const data = await loginRequest(credentials);
    setUser(data?.user ?? null);
    return data;
  }

  async function register(details) {
    const data = await registerRequest(details);
    setUser(data?.user ?? null);
    return data;
  }

  function logout() {
    logoutRequest();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user) || isAuthenticated(),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
