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

// Refactor the createCourts function to use the API instance
export const createCourts = async (courtData) => {
  try {
    const token = localStorage.getItem('authToken'); // Replace with the correct key if needed
    const response = await axios.post(
      'http://localhost:5000/api/courts',
      courtData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // if uploading files
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating court:', error.response.data);
    throw error;
  }
};


export const fetchCourts = () => API.get('/courts');
export const fetchCourtById = (id) => API.get(`/courts/${id}`);
// export const createBooking = (data) => API.post('/bookings/create', data);
// export const fetchBookingsByUser = (userId) => API.get(`/bookings/user/${userId}`);
// export const createReview = (data) => API.post('/reviews', data);
// export const fetchReviewsByCourt = (courtId) => API.get(`/reviews/${courtId}`);
// export const fetchNotifications = () => API.get('/notifications');
// export const markNotificationAsRead = (id) => API.put(`/notifications/${id}/read`);
// export const createPayment = (data) => API.post('/payments', data);
// export const fetchPaymentById = (id) => API.get(`/payments/${id}`);
