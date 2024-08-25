const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");
const {
  createBooking,
  updateBooking,
  deleteBooking,
  getUserBookings,
  getBookingById,
  getAllBookings,
} = require("../controllers/bookingController");

// router.use(authorizeRole('user')); // Assuming you want to restrict these routes to 'user' role
// router.use(authMiddleware);

// Booking Routes
router.get("/user", authMiddleware, getUserBookings); // Get all bookings for a user
router.get("/:id", authMiddleware, getBookingById); // Get a specific booking by ID
router.get("/", authMiddleware,authorizeRole('admin'), getAllBookings);  // Get all bookings
router.put("/:id", authMiddleware, updateBooking); // Update a booking
router.delete("/:id", authMiddleware, deleteBooking); // Delete a booking
router.post("/create", authMiddleware, createBooking);// Create a new booking

module.exports = router;
