const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ message: 'Server error while fetching users.' });
  }
};
const getUserProfile = async (req, res) => {
  try {
  
    const user = await User.findById(req.user._id).select('-password');
    
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

module.exports = {
  getUserProfile,
  getAllUsers,

};