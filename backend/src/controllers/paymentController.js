const Payment = require('../models/paymentModel');
const Booking = require('../models/bookingModel');

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { bookingId, amount, paymentMethod, transactionId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    const payment = new Payment({
      user: req.user.id,
      booking: bookingId,
      amount,
      paymentMethod,
      transactionId,
      status: 'completed',
    });

    await payment.save();
    res.status(201).json({ msg: 'Payment completed successfully', payment });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all payments for the logged-in user
const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id }).populate('booking');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all payments (Admin Only)
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('booking user');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createPayment,
  getUserPayments,
  getAllPayments,
};
