import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as loginService, logout as logoutService, register as registerService, getStoredToken, User, House } from '~/services/auth.service';
import api from '~/services/api';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; nickname: string; email: string; password: string; house: House }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restore() {
      const token = await getStoredToken();
      if (token) {
        try {
          const res = await api.get('/users/me');
          setUser(res.data);
        } catch {
          // token expirado ou inválido
        }
      }
      setLoading(false);
    }
    restore();
  }, []);

  async function login(email: string, password: string) {
    const { user } = await loginService(email, password);
    setUser(user);
  }

  async function register(data: { name: string; nickname: string; email: string; password: string; house: House }) {
    await registerService(data);
    await login(data.email, data.password);
  }

  async function logout() {
    await logoutService();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
