const Booking = require('../models/bookingModel');
const Court = require('../models/courtModel');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { courtId, date, timeSlot } = req.body;
    const court = await Court.findById(courtId);

    if (!court) {
      return res.status(404).json({ msg: 'Court not found' });
    }

    // Check if the time slot is available on the given date
    const isAvailable = court.availability.some(slot => 
      slot.date.toISOString() === new Date(date).toISOString() &&
      slot.timeSlots.includes(timeSlot)
    );

    if (!isAvailable) {
      return res.status(400).json({ msg: 'Time slot is not available' });
    }

    const booking = new Booking({
      user: req.user.id, // Assuming the user is logged in
      court: courtId,
      date,
      timeSlot,
      status: 'pending',
    });

    await booking.save();
    res.status(201).json({ msg: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all bookings for the logged-in user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('court');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all bookings (Admin Only)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('court user');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update booking status (Admin Only)
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    const booking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    res.status(200).json({ msg: 'Booking status updated successfully', booking });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Cancel a booking (User)
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({ msg: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
};
