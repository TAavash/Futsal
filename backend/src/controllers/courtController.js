const Court = require('../models/courtModel');

// Create a new court (Admin Only)
const createCourt = async (req, res) => {
  try {
    const { name, location, availability, pricePerHour } = req.body;
    const court = new Court({
      name,
      location,
      availability,
      pricePerHour,
      createdBy: req.user.id, // Assuming the user is logged in and authorized as admin
    });

    await court.save();
    res.status(201).json({ msg: 'Court created successfully', court });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all courts (Public)
const getCourts = async (req, res) => {
  try {
    const courts = await Court.find();
    res.status(200).json(courts);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single court by ID (Public)
const getCourtById = async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) {
      return res.status(404).json({ msg: 'Court not found' });
    }
    res.status(200).json(court);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update a court (Admin Only)
const updateCourt = async (req, res) => {
  try {
    const { name, location, availability, pricePerHour } = req.body;
    const court = await Court.findByIdAndUpdate(req.params.id, {
      name,
      location,
      availability,
      pricePerHour,
    }, { new: true });

    if (!court) {
      return res.status(404).json({ msg: 'Court not found' });
    }

    res.status(200).json({ msg: 'Court updated successfully', court });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete a court (Admin Only)
const deleteCourt = async (req, res) => {
  try {
    const court = await Court.findByIdAndDelete(req.params.id);
    if (!court) {
      return res.status(404).json({ msg: 'Court not found' });
    }
    res.status(200).json({ msg: 'Court deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createCourt,
  getCourts,
  getCourtById,
  updateCourt,
  deleteCourt,
};
