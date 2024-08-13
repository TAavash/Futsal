const express = require("express");
const router = express.Router();
const { authorizeRole } = require("../middleware/authorizationMiddleware");

const {
  getUserBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

// Booking Routes
router.get("/bookings/user", getUserBookings);
router.get("/bookings/:id", getBookingById);
router.post("/bookings", createBooking);
router.put("/bookings/:id", updateBooking);
router.delete("/bookings/:id", deleteBooking);

module.exports = router;
