const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This creates the relationship to your User model
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide an event description']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Technology', 'Music', 'Business', 'Sports', 'Education', 'Other']
  },
  date: {
    type: Date,
    required: [true, 'Please provide an event date']
  },
  location: {
    type: String,
    required: [true, 'Please provide a location']
  },
  price: {
    type: Number,
    required: true,
    default: 0 // 0 means it's a free event
  },
  capacity: {
    type: Number,
    required: [true, 'Please specify the maximum number of attendees']
  },
  availableSeats: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/800x400?text=Event+Image'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);