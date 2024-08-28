const User = require("../models/authUserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserProfile = require("../models/userProfile");

dotenv.config();

// Helper function to generate JWT
const generateToken = (userId) => {
  const payload = { user: { id: userId } };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters long" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Log the raw and hashed passwords for debugging
    console.log("Raw Password (during registration):", password);
    console.log("Hashed Password (during registration):", hashedPassword);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword, // Save the hashed password
      role,
    });

    await user.save();

    // Create user profile
    const newProfile = new UserProfile({ user: user._id });
    await newProfile.save();

    // Generate JWT token
    const token = generateToken(user.id);

    res.status(201).json({
      msg: "User registered successfully",
      token: `Bearer ${token}`,
      user,
      userProfile: newProfile,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Log the raw password and stored hashed password for debugging
    console.log("Raw Password (during login):", password);
    console.log("Stored Hashed Password (from DB):", user.password);

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    // Generate JWT token
    const token = generateToken(user.id);

    res.json({
      msg: "User logged in successfully",
      token: `Bearer ${token}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
