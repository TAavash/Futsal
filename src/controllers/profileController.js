const domain = "http://localhost:5000";
const User = require("../models/authUserModel");
const UserProfiles = require("../models/userProfile");
// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  // console.log(error);
  res.status(500).json({ msg: error.message });
};

// Update user profile as it is created during registration
const updateUserProfile = async (req, res) => {
  try {
    const { bio } = req.body;
    let updateData = { bio };

    if (req.file) {
      const profileImage = `${domain}/uploads/profiles/${req.file.filename}`;
      updateData.profileImage = profileImage;
    }

    const profile = await UserProfiles.findOneAndUpdate(
      { user: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.status(200).json({
      msg: "profile created successfully",
      profile: profile,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    console.log("getuserprofile");
    const profile = await UserProfiles.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.status(200).json({ profile });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get all user profiles
const getAllUserProfiles = async (req, res) => {
  try {
    console.log("getAllUserProfiles");
    const profiles = await UserProfiles.find().populate("user", [
      "name",
      "email",
    ]);
    res.status(200).json({ profiles });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get user profile by ID
const getUserProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await User.findOne({
      _id: id,
    });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.status(200).json({ profile });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
  try {
    const profile = await UserProfiles.findOneAndDelete({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.status(200).json({ msg: "Profile deleted successfully" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

//  exporting the controller functions
module.exports = {
  updateUserProfile,
  getUserProfile,
  getAllUserProfiles,
  getUserProfileById,
  deleteUserProfile,
};
