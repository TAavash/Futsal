// src/context/AuthContext.js

import React, { createContext, useContext, useState } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// Create useAuthContext Hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    // localStorage.setItem("access_token", response.data.token);
    // localStorage.setItem("user_id", response.data.user_id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    // localStorage.removeItem('user_id');
    // localStorage.removeItem('access_token');  
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
