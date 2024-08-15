// src/context/AuthContext.js

import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './authSlice';

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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const loginHandler = (userData) => {
    dispatch(login(userData));
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user_id', userData.user_id); // Store user_id
  };

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user_id'); // Remove user_id
  };

  return (
    <AuthContext.Provider value={{ user, login: loginHandler, logout: logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
