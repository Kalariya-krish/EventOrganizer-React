const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const crypto = require('crypto'); 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false 
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true 
});

// 1. SECURITY HOOK: Hash the password before saving to the database
userSchema.pre('save', async function() {
  // If the password hasn't been changed, exit the hook immediately
  if (!this.isModified('password')) {
    return; // Notice there is no next() here. We just return.
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 2. AUTH METHOD: Compare user entered password with the hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 3. SECURITY METHOD: Generate and hash password token
userSchema.methods.getResetPasswordToken = function() {
  // Generate a raw token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash it and set it to the schema field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set the expiration date to 10 minutes from now
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  // Return the raw, unhashed token to be sent in the email
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);