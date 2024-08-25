// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'), // Check if there's a token in localStorage
  userRole: localStorage.getItem('userRole'), // Retrieve user role from localStorage
  token: localStorage.getItem('token'), // Retrieve token from localStorage
  userId: localStorage.getItem('user_id'), // Retrieve token from localStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id; // Ensure this line is present if using Redux state for user_id
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userRole = null;
      state.token = null;
      state.userId = null; // Clear userId on logout
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
    },
    setToken(state, action) {
      state.token = action.payload.token;
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
