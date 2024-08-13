// src/services/api.js

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (data) => API.post('/auth/register', data);
export const fetchCourts = () => API.get('/courts');
export const fetchCourtById = (id) => API.get(`/courts/${id}`);
export const createBooking = (data) => API.post('/bookings', data);
export const fetchBookingsByUser = (userId) => API.get(`/bookings/user/${userId}`);
export const createReview = (data) => API.post('/reviews', data);
export const fetchReviewsByCourt = (courtId) => API.get(`/reviews/${courtId}`);
export const fetchNotifications = () => API.get('/notifications');
export const markNotificationAsRead = (id) => API.put(`/notifications/${id}/read`);
export const createPayment = (data) => API.post('/payments', data);
export const fetchPaymentById = (id) => API.get(`/payments/${id}`);
