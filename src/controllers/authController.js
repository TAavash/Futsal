const User = require("../models/authUserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserProfile = require("../models/userProfile");

dotenv.config();

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      role,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Create user profile
    const newProfile = new UserProfile({ user: user._id });
    await newProfile.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          msg: "User registered successfully",
          token: `Bearer ${token}`,
          user,
          userProfile: newProfile,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: "User logged in successfully",
          token: `Bearer ${token}`,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server error" });
  }
};


module.exports = {
  registerUser,
  loginUser,
};


// const User = require("../models/authUserModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const UserProfile = require("../models/userProfile");

// dotenv.config();

// const registerUser = async (req, res) => {
//   const { name, email, password,role } = req.body;
//   // const userEmail = req.body.email;

//   try {
//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     user = new User({
//       // name,
//       // email,
//       // password,
//       name: name,
//       email: email,
//       password: password,
//       role:role
//     });

//     await user.save();

//     // Create profile for the new user
//     const newProfile = new UserProfile({ user: user._id });
//     await newProfile.save();

//     // do this if you want to redirect to dashboard after registration
//     // const payload = {
//     //   user: {
//     //     id: user.id,
//     //   },
//     // };

//     // console.log(payload);

//     // jwt.sign(
//     //   payload,
//     //   process.env.JWT_SECRET,
//     //   { expiresIn: "1h" },
//     //   (err, token) => {
//     //     if (err) throw err;
//     //     res.json({ token});
//     //   }
//     // );

//     res.status(201).json({
//       msg: "User registered successfully",
//       user: user,
//       userProfile: newProfile,
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send({ msg: err.message });
//   }
// };

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" },
//       (err, token) => {
//         if (err) throw err;
//         res.json({
//           msg: "user logged in successfully",
//           token: `Bearer ${token}`,
//           user: user,
//         });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
// };
