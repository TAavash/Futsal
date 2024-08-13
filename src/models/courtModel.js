const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourtSchema = new Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  availability: [
    {
      date: { type: Date, required: true },
      timeSlots: [{ type: String, required: true }] // e.g., ["09:00-10:00", "10:00-11:00"]
    }
  ],
  pricePerHour: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Admin who created the court
});

module.exports = mongoose.model('Court', CourtSchema);
