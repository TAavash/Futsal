const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Booking Schema
const BookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  court: { type: Schema.Types.ObjectId, ref: 'Court', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed'], required: true }
});

module.exports = mongoose.model('Booking', BookingSchema);
