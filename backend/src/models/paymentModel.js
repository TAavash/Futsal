const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentMethod: { type: String, required: true }, // e.g., 'credit card', 'paypal'
  transactionId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', PaymentSchema);
