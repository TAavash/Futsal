const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log the decoded token
    req.user = decoded.user; // Ensure this matches the token payload
    next();
  } catch (err) {
    console.error("Token Verification Error:", err); // Log token verification errors
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;


// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded)
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;
