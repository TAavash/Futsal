const { courtImage } = require("../middleware/uploadMiddleware");
const Court = require("../models/courtModel"); // Adjust the path if necessary
const domain = "http://localhost:5000";

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  // console.log(error);
  res.status(500).json({ msg: error.message });
};

const createCourt = async (req, res) => {
  try {
    let {
      name,
      location,
      description,
      courtType,
      pricePerHour,
      currency,
      gallery,
      amenities,
      contactPerson,
      contactNumber,
      email,
      availability,
      surfaceType,
      capacity,
      lighting,
    } = req.body;
      // Parse JSON strings if necessary
      gallery = JSON.parse(gallery || '[]');
      amenities = JSON.parse(amenities || '[]');
      availability = JSON.parse(availability || '[]');
  
    let courtData = {
      name,
      location,
      description,
      courtType,
      pricePerHour,
      currency,
      gallery,
      amenities,
      contactPerson,
      contactNumber,
      email,
      availability,
      surfaceType,
      capacity,
      lighting,
    };

    if (req.file) {
      const courtImage = `${domain}/uploads/courts/${req.file.filename}`;
      courtData.courtImage = courtImage;
    }

    const court = new Court(courtData);
    await court.save();

    res.status(201).json({
      msg: "court created successfully",
      court: court,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getAllCourts = async (req, res) => {
  try {
    const courts = await Court.find();
    res.status(200).json(courts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 
const getCourtById = async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) return res.status(404).json({ error: "Court not found" });
    res.status(200).json(court);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const createCourt = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);
//     const court = new Court(req.body);
//     await court.save();
//     res.status(201).json(court);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(400).json({ error: error.message });
//   }
// };


const updateCourt = async (req, res) => {
  try {
    const court = await Court.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!court) return res.status(404).json({ error: "Court not found" });
    res.status(200).json(court);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCourt = async (req, res) => {
  try {
    const court = await Court.findByIdAndDelete(req.params.id);
    if (!court) return res.status(404).json({ error: "Court not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCourt,
  getAllCourts,
  getCourtById,
  updateCourt,
  deleteCourt,
};