const express = require('express');
const router = express.Router();
const { authorizeRole } = require('../middleware/authorizationMiddleware');
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
} = require('../controllers/bookingController');

// Create a new booking (Player Only)
router.post('/bookings', authorizeRole('player'), createBooking);

// Get all bookings for the logged-in user (Player Only)
router.get('/bookings/user', authorizeRole('player'), getUserBookings);

// Get all bookings (Admin Only)
router.get('/bookings', authorizeRole('admin'), getAllBookings);

// Update booking status (Admin Only)
router.put('/bookings/status', authorizeRole('admin'), updateBookingStatus);

// Cancel a booking (Player Only)
router.delete('/bookings/:id', authorizeRole('player'), cancelBooking);

module.exports = router;
