const mongoose = require('mongoose');
const Court = require('./courtModel');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['admin', 'buyer'], required: true },
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Wishlist' }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

// Review Schema
const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
});

// Address Schema
const AddressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
});

// Court Schema
const CourtSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  courtImage: { type: String },
  availability: [{
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  }],
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

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

// Review Schema
const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  court: { type: Schema.Types.ObjectId, ref: 'Court', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
});

// Payment Schema
const PaymentSchema = new Schema({
  booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed'], required: true }
});

// Notification Schema
const NotificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});


module.exports = {
  User: mongoose.model('User', UserSchema),
  Product: mongoose.model('Product', ProductSchema),
  Order: mongoose.model('Order', OrderSchema),
  Review: mongoose.model('Review', ReviewSchema),
  Category: mongoose.model('Category', CategorySchema),
  Cart: mongoose.model('Cart', CartSchema),
  Wishlist: mongoose.model('Wishlist', WishlistSchema),
  Address: mongoose.model('Address', AddressSchema)
  Court: mongoose.model('Court', CourtSchema),
  Booking: mongoose.model('Booking', BookingSchema),
  Review: mongoose.model('Review', ReviewSchema),
  Payment: mongoose.model('Payment', PaymentSchema),
  Notification: mongoose.model('Notification', NotificationSchema)
};
