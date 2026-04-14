const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Helper function to generate JWT and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token (Requires JWT_SECRET in your .env file)
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'fallback_secret_key', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // 2. Create the user in the database
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user'
    });

    // 3. NEW LOGIC: Send the Welcome Email
    try {
      const message = `Hi ${name},\n\nWelcome to Eventalk! We are thrilled to have you on board.\n\nStart exploring, booking, and managing the best events today. If you have any questions, just reply to this email.\n\nBest Regards,\nThe Eventalk Team`;

      await sendEmail({
        email: user.email,
        subject: 'Welcome to Eventalk! 🎉',
        message: message
      });
      console.log(`Welcome email sent to ${user.email}`);
    } catch (emailError) {
      // We log the error, but we DO NOT crash the registration process. 
      // The user account was successfully created.
      console.error("Welcome email failed to send, but user was created:", emailError);
    }

    // 4. Send the successful response and JWT token to the frontend
    sendTokenResponse(user, 201, res);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password inputs
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    // Check for user (must explicitly select password if your model hides it by default)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches (assuming you have a matchPassword method in your User model)
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// @desc    Forgot password (Generates token & sends email)
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(200).json({ success: true, message: 'Email sent' });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Assuming Vite frontend runs on 5173
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) requested a password reset for your Eventalk account.\n\nPlease click the link below to securely choose a new password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Eventalk Security: Password Reset Request',
        message: message
      });

      res.status(200).json({ success: true, message: 'Email sent' });
    } catch (err) {
      console.error("SMTP Error:", err);
      
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ success: false, message: 'Email could not be sent' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Reset password (Verifies token & updates DB)
// @route   PUT /api/auth/resetpassword/:token
// @access  Public
exports.resetPassword = async (req, res, next) => {
  try {
    // Reconstruct hash from the raw token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};