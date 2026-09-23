'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginInput, RegisterInput, ApiResponse } from '@/types/auth';
import { apiGet, apiPost } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginInput) => Promise<ApiResponse<User>>;
  register: (data: RegisterInput) => Promise<ApiResponse<User>>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await apiGet('/api/auth/me') as ApiResponse<User>;
      if (res && res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (data: LoginInput): Promise<ApiResponse<User>> => {
    const res = await apiPost('/api/auth/login', data) as ApiResponse<User>;
    if (res && res.success) {
      await fetchUser();
    }
    return res;
  };

  const register = async (data: RegisterInput): Promise<ApiResponse<User>> => {
    const res = await apiPost('/api/auth/register', data) as ApiResponse<User>;
    if (res && res.success) {
      await fetchUser();
    }
    return res;
  };

  const logout = async (): Promise<void> => {
    await apiPost('/api/auth/logout', {});
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
