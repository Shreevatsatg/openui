import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  hasProfile: boolean;
  onboarded: boolean;
  profileData?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get<User>('/api/auth/me')
      .then(res => {
        const u = res.data;
        setUser({
          ...u,
          hasProfile: u.hasProfile ?? false,
          onboarded: u.onboarded ?? false,
        });
      })
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    setUser({
      ...userData,
      hasProfile: userData.hasProfile ?? false,
      onboarded: userData.onboarded ?? false,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
