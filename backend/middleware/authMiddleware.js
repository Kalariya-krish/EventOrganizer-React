const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // 1. Check if the token exists in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Extract token from "Bearer <token>"
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route. No token provided.' });
  }

  try {
    // 2. Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find the user in the database and attach them to the req object
    req.user = await User.findById(decoded.id);
    next(); // Pass control to the next function (the controller)

  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized. Token failed or expired.' });
  }
};