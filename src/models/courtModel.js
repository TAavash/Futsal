const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: String,
  courtType: String,
  pricePerHour: { type: Number, required: true },
  currency: { type: String, default: 'NPR' },
  courtImage: String,
  gallery: String,
  amenities: String,
  contactPerson: String,
  contactNumber: String,
  email: String,
  availability: [{
    day: String,
    startTime: String,
    endTime: String,
  }],
  surfaceType: String,
  capacity: Number,
  lighting: { type: Boolean, default: false },
});

const Court = mongoose.model('Court', courtSchema);

module.exports = Court;