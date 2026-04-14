const Event = require('../models/Event');
const sendEmail = require('../utils/sendEmail');
// @desc    Get all events
const getEvents = async (req, res) => {
  try {
    // $ne means "Not Equal". This grabs 'active' events AND old events with no status.
    const events = await Event.find({ status: { $ne: 'inactive' } }).sort({ date: 1 });
    
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error fetching events' });
  }
};

const getAdminEvents = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error fetching admin events' });
  }
};

// @desc    Get single event
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching event details' });
  }
};

// @desc    Create a new event
const createEvent = async (req, res) => {
  try {
    req.body.organizerId = req.user.id;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden. Only Admin can create events.' });
    }

    if (req.body.capacity) {
      req.body.availableSeats = req.body.capacity;
    }

    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Toggle event status (Active <-> Inactive)
const toggleEventStatus = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Flip the status
    event.status = event.status === 'active' ? 'inactive' : 'active';
    await event.save();

    res.status(200).json({ message: `Event is now ${event.status}`, event });
  } catch (error) {
    console.error("Toggle status error:", error);
    res.status(500).json({ message: 'Failed to toggle event status' });
  }
};

// @desc    Update an event
const updateEvent = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden. Only Admins can edit.' });
    }

    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating event' });
  }
};

// @desc    Delete an event
const deleteEvent = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden. Only Admins can delete events.' });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    
    await event.deleteOne();
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting event' });
  }
};

// Export all functions together at the bottom
module.exports = {
  getEvents,
  getAdminEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  toggleEventStatus
};