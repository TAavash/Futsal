const { courtImage } = require("../middleware/uploadMiddleware");
const Court = require("../models/courtModel"); // Adjust the path if necessary
const domain = "http://localhost:5000";

// Helper function to send error responses
const sendErrorResponse = (res, error, statusCode = 500) => {
  console.error(error); // Log the error to the server console for debugging
  res.status(statusCode).json({ msg: error.message });
};

// const createCourt = async (req, res) => {
//   try {
//     let {
//       name,
//       location,
//       description,
//       courtType,
//       pricePerHour,
//       currency,
//       gallery,
//       amenities,
//       contactPerson,
//       contactNumber,
//       email,
//       availability,
//       surfaceType,
//       capacity,
//       lighting,
//     } = req.body;

//     // Parse JSON strings if necessary
//     gallery = JSON.parse(gallery || '[]');
//     amenities = JSON.parse(amenities || '[]');
//     availability = JSON.parse(availability || '[]');

//     let courtData = {
//       name,
//       location,
//       description,
//       courtType,
//       pricePerHour,
//       currency,
//       gallery,
//       amenities,
//       contactPerson,
//       contactNumber,
//       email,
//       availability,
//       surfaceType,
//       capacity,
//       lighting,
//     };

//     if (req.file) {
//       const courtImage = `${domain}/uploads/courts/${req.file.filename}`;
//       courtData.courtImage = courtImage;
//     }

//     const court = new Court(courtData);
//     await court.save();

//     res.status(201).json({
//       msg: "Court created successfully",
//       court: court,
//       success: true,
//     });
//   } catch (error) {
//     sendErrorResponse(res, error);
//   }
// };

const getAllCourts = async (req, res) => {
  try {
    const courts = await Court.find();
    res.status(200).json(courts);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getCourtById = async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) return res.status(404).json({ error: "Court not found" });
    res.status(200).json(court);
  } catch (error) {
    sendErrorResponse(res, error);
  }
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
    availability = JSON.parse(availability || '[]'); // Ensure this is parsed properly

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
      msg: "Court created successfully",
      court: court,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const updateCourt = async (req, res) => {
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
    availability = JSON.parse(availability || '[]'); // Ensure this is parsed properly

    const courtData = {
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

    const court = await Court.findByIdAndUpdate(req.params.id, courtData, {
      new: true,
      runValidators: true,
    });

    if (!court) return res.status(404).json({ error: "Court not found" });
    res.status(200).json(court);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchCourts = async (req, res) => {
  try {
    const { search, sort } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } }
        ]
      };
    }

    let sortOptions = {};

    if (sort === "asc" || sort === "desc") {
      sortOptions.pricePerHour = sort === "asc" ? 1 : -1;
    }

    const courts = await Court.find(query).sort(sortOptions);
    res.status(200).json(courts);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};



const deleteCourt = async (req, res) => {
  try {
    const court = await Court.findByIdAndDelete(req.params.id);
    if (!court) return res.status(404).json({ error: "Court not found" });
    res.status(204).send(); // No content to send back
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  createCourt,
  getAllCourts,
  getCourtById,
  searchCourts,
  updateCourt,
  deleteCourt,
};
