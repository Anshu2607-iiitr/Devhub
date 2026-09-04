import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER } from '../data/mockUserData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('devhub_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USER;
      }
    }
    return INITIAL_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('devhub_auth') === 'true';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('devhub_user', JSON.stringify(user));
    }
  }, [user]);

  const login = (email, password) => {
    const loggedUser = {
      ...user,
      email: email || user.email,
      name: email ? email.split('@')[0].replace('.', ' ') : user.name,
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    localStorage.setItem('devhub_auth', 'true');
    return { success: true };
  };

  const signup = (name, email, password) => {
    const newUser = {
      ...INITIAL_USER,
      name: name || "Dev Learner",
      email: email || "dev@devhub.io",
      totalXp: 50,
      streak: 1,
      completedLessons: [],
      completedModules: [],
      completedQuizzes: {},
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('devhub_auth', 'true');
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('devhub_auth', 'false');
  };

  const updateUser = (updater) => {
    setUser(prev => typeof updater === 'function' ? updater(prev) : { ...prev, ...updater });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
