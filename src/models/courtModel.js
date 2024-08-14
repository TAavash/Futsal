const mongoose = require("mongoose");
const { Schema } = mongoose;

const courtSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: false },
  courtType: { type: String, required: false },
  pricePerHour: { type: Number, required: true },
  currency: { type: String, default: "NPR" },
  courtImage: { type: String, required: false },
  gallery: [{ type: String }], // Array of strings
  amenities: [{ type: String }], // Array of strings
  contactPerson: { type: String, required: false },
  contactNumber: { type: String, required: false },
  email: { type: String, required: true }, // Make email required if needed
  availability: [
    {
      day: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
  surfaceType: { type: String, required: false },
  capacity: { type: Number, required: false },
  lighting: { type: Boolean, default: false },
});

const Court = mongoose.model("Court", courtSchema);
module.exports = Court;
