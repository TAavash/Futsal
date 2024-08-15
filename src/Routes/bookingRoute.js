const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");
const {
  createBooking,
  updateBooking,
  deleteBooking,
  getUserBookings,
  getBookingById
} = require("../controllers/bookingController");

// Middleware to ensure authentication and authorization
router.use(authorizeRole('user')); // Assuming you want to restrict these routes to 'user' role

// Booking Routes
router.get("/user", getUserBookings); // Get all bookings for a user
router.get("/:id", getBookingById); // Get a specific booking by ID
router.post("/", authMiddleware, createBooking); // Create a new booking
router.put("/:id", updateBooking); // Update a booking
router.delete("/:id", deleteBooking); // Delete a booking

module.exports = router;
