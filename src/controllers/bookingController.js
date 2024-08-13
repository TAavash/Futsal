const Booking = require('../models/bookingModel');
const Court = require('../models/courtModel');

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('court');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific booking
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('court user');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const court = await Court.findById(req.body.court);
    if (!court) return res.status(404).json({ message: 'Court not found' });

    const booking = new Booking({
      user: req.user.id,
      court: req.body.court,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      totalPrice: req.body.totalPrice,
      paymentStatus: 'pending',
    });

    const newBooking = await booking.save();

    court.bookings.push(newBooking._id);
    await court.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.date = req.body.date || booking.date;
    booking.startTime = req.body.startTime || booking.startTime;
    booking.endTime = req.body.endTime || booking.endTime;
    booking.totalPrice = req.body.totalPrice || booking.totalPrice;
    booking.paymentStatus = req.body.paymentStatus || booking.paymentStatus;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    await booking.remove();
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
