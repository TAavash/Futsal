const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  court: { type: Schema.Types.ObjectId, ref: 'Court', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
});

module.exports = mongoose.model('Review', ReviewSchema);
