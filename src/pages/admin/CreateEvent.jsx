import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/eventService';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology',
    date: '',
    location: '',
    price: 0,
    capacity: 100
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Send the data to the backend via our service
      await createEvent(formData);
      alert('Event created successfully!');
      navigate('/admin/manage-events'); // Send them back to dashboard
    } catch (err) {
      // Display the error thrown by the Express backend
      setError(err.response?.data?.message || 'Failed to create event');
      setIsSubmitting(false);
    }
  };

  return (

    <div className="max-w-7xl mx-auto">


      <div className="max-w-3xl mx-auto p-8 font-sans text-slate-900">
        <h1 className="text-3xl font-extrabold mb-6">Create New Event</h1>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm font-bold text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-slate-200">

          <div>
            <label className="block text-sm font-bold mb-2">Event Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange}
              className="w-full p-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
              placeholder="e.g., React Advanced Workshop" />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea name="description" required rows="4" value={formData.description} onChange={handleChange}
              className="w-full p-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
              placeholder="What is this event about?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange}
                className="w-full p-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none">
                <option value="Technology">Technology</option>
                <option value="Music">Music</option>
                <option value="Business">Business</option>
                <option value="Sports">Sports</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Date & Time</label>
              <input type="datetime-local" name="date" required value={formData.date} onChange={handleChange}
                className="w-full p-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-bold mb-2">Ticket Price (₹)</label>
              <input type="number" name="price" min="0" required value={formData.price} onChange={handleChange}
                className="w-full p-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none" />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-bold mb-2">Total Capacity</label>
              <input type="number" name="capacity" min="1" required value={formData.capacity} onChange={handleChange}
                className="w-full p-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none" />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-bold mb-2">Location</label>
              <input type="text" name="location" required value={formData.location} onChange={handleChange}
                className="w-full p-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
                placeholder="City or Venue" />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting}
            className={`w-full py-3.5 mt-4 rounded-lg font-bold text-white transition-all ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 active:scale-[0.98]'
              }`}>
            {isSubmitting ? 'Publishing Event...' : 'Create Event'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateEvent;