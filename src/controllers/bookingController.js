const Booking = require("../models/bookingModel");
const Court = require("../models/courtModel");

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  res.status(500).json({ msg: error.message });
};

// Get all bookings for a user
const getUserBookings = async (req, res) => {
  try {
    // Assuming req.user.id is set from authentication middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    // Corrected to use req.user.id instead of req.id
    const bookings = await Booking.find({ user: req.user.id }).populate(
      "court"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific booking
const getBookingById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Booking ID is required' });
  }

  try {
    console.log('Fetching booking with ID:', id);

    const booking = await Booking.findById(id).populate('court user');
    if (!booking) {
      console.warn('Booking not found:', id);
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};




const createBooking = async (req, res) => {
  try {
    const { courtId, date, startTime, endTime } = req.body;
    const userId = req.user.id; // Ensure req.user is properly set

    console.log("Request Body:", req.body);
    console.log("User ID from token:", userId);

    // Validate input
    if (!courtId || !userId || !date || !startTime || !endTime) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the court exists
    const court = await Court.findById(courtId);
    if (!court) return res.status(404).json({ error: "Court not found" });

    // Check if the court is available
    const isAvailable = court.availability.some((slot) => {
      return (
        slot.day ===
          new Date(date).toLocaleDateString("en-US", { weekday: "long" }) &&
        slot.startTime <= startTime &&
        slot.endTime >= endTime
      );
    });

    console.log("Court availability:", isAvailable);

    // Check if court is not booked during the selected time slot
    const isAlreadyBooked = await Booking.findOne({
      court: courtId,
      date,
      $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }],
    });

    if (!isAvailable || isAlreadyBooked)
      return res
        .status(400)
        .json({ error: "Court is not available for the selected time slot" });

    // Calculate the total price
    const start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);
    const duration = (end - start) / 3600000; // Duration in hours
    const totalPrice = duration * court.pricePerHour;

    // Create and save the booking
    const booking = new Booking({
      user: userId,
      court: courtId,
      date,
      startTime,
      endTime,
      totalPrice,
      paymentStatus: "pending", // Default to pending; adjust based on your payment system
    });
    await booking.save();

    res.status(201).json({
      msg: "Booking created successfully",
      booking,
      success: true,
    });
  } catch (error) {
    console.error("Error in createBooking:", error); // Log the error
    sendErrorResponse(res, error);
  }
};

const updateBooking = async (req, res) => {
  try {
    console.log('Updating booking with ID:', req.params.id); // Log the request ID

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      console.warn('Booking not found:', req.params.id); // Log a warning if booking is not found
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update booking fields
    booking.date = req.body.date || booking.date;
    booking.startTime = req.body.startTime || booking.startTime;
    booking.endTime = req.body.endTime || booking.endTime;
    booking.totalPrice = req.body.totalPrice || booking.totalPrice;
    booking.paymentStatus = req.body.paymentStatus || booking.paymentStatus;

    // Save updated booking
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error.message); // Log detailed error message
    sendErrorResponse(res, error);
  }
};


// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await booking.remove();
    res.json({ message: "Booking deleted" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getAllBookings = async (req, res) => {
  try {
    console.log("Fetching all bookings");
    const bookings = await Booking.find().populate("court").populate("user"); // Ensure 'user' and 'court' are ObjectId references
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ msg: "Failed to fetch bookings", error: error.message });
  }
};

module.exports = {
  createBooking,
  updateBooking,
  deleteBooking,
  getUserBookings,
  getBookingById,
  getAllBookings,
};
