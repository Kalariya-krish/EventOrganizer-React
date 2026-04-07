import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvents, deleteEvent, updateEvent, toggleEventStatus } from '../../services/eventService';
import { Edit, Trash2, X, AlertCircle } from 'lucide-react';


const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal States
  const [editingEvent, setEditingEvent] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);




  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load events.');
      setLoading(false);
    }
  };

  // --- DELETE LOGIC ---
  const handleDelete = async (eventId) => {
    // We still use a quick native confirm to prevent accidental clicks before hitting the DB
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await deleteEvent(eventId);
      setEvents(events.filter(event => event._id !== eventId));

      // Trigger the Figma "EVENT DELETED" overlay
      setShowDeleteAlert(true);
      setTimeout(() => setShowDeleteAlert(false), 2000); // Auto-hide after 2 seconds
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete event');
    }
  };

  // --- EDIT LOGIC ---
  const handleEditChange = (e) => {
    setEditingEvent({ ...editingEvent, [e.target.name]: e.target.value });
  };

  const handleToggleStatus = async (eventId) => {
    try {
      // 1. Hit the API
      const response = await toggleEventStatus(eventId);

      // 2. Force React to update the specific event in the UI instantly
      // We are taking the new status directly from the JSON you just showed me
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt._id === eventId ? { ...evt, status: response.event.status } : evt
        )
      );

    } catch (error) {
      console.error("Failed to toggle:", error);
      alert('Failed to change event status.');
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateEvent(editingEvent._id, editingEvent);
      // Update the local state so the table refreshes instantly without reloading the page
      setEvents(events.map(ev => ev._id === editingEvent._id ? editingEvent : ev));
      setEditingEvent(null); // Close modal
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update event');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic Status Calculator
  const getEventStatus = (eventDate) => {
    return new Date(eventDate) > new Date() ? 'Active' : 'Completed';
  };

  if (loading) return <div className="font-bold text-slate-500">Loading events data...</div>;

  return (
    <div className="max-w-7xl mx-auto relative">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Manage Events</h1>
        <Link to="/admin/createevent" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-5 rounded-lg transition-colors">
          Add New Event
        </Link>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 font-bold rounded-lg border border-red-200">{error}</div>}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-600">
              <th className="px-6 py-4">Event Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500 font-bold">No events exist.</td>
              </tr>
            ) : (
              events.map((event) => {
                const status = getEventStatus(event.date);
                return (
                  <tr key={event._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{event.title}</td>
                    <td className="px-6 py-4 text-slate-600">{event.category}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                    </td>
                    {/* <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                        {status}
                      </span>
                    </td> */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(event._id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${event.status === 'active'
                            ? 'bg-green-100 text-green-700 border-green-200 hover:bg-red-100 hover:text-red-700 hover:border-red-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-green-100 hover:text-green-700 hover:border-green-200'
                          }`}
                      >
                        {event.status === 'active' ? 'Active' : 'Inactive'}
                      </button>
                    </td>




                    <td className="px-6 py-4 text-right space-x-3">
                      {/* Clicking this sets the state and opens the modal */}
                      <button onClick={() => setEditingEvent(event)} className="text-blue-600 hover:text-blue-800 font-bold text-sm inline-flex items-center gap-1">
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button onClick={() => handleDelete(event._id)} className="text-red-500 hover:text-red-700 font-bold text-sm inline-flex items-center gap-1">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* =========================================
          FIGMA PAGE 26: EDIT EVENT MODAL
          ========================================= */}
      {editingEvent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-slate-200">

            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-2xl font-extrabold text-slate-900">Edit Event</h2>
              <button onClick={() => setEditingEvent(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={submitEdit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Event Name</label>
                  <input type="text" name="title" value={editingEvent.title} onChange={handleEditChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Category Tag</label>
                  <select name="category" value={editingEvent.category} onChange={handleEditChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20">
                    <option value="Technology">Technology</option>
                    <option value="Music">Music</option>
                    <option value="Business">Business</option>
                    <option value="Sports">Sports</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Event Date & Time</label>
                  {/* Note: In React, datetime-local expects a specific YYYY-MM-DDThh:mm format, so we slice the ISO string */}
                  <input type="datetime-local" name="date" value={new Date(editingEvent.date).toISOString().slice(0, 16)} onChange={handleEditChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Venue/Location</label>
                  <input type="text" name="location" value={editingEvent.location} onChange={handleEditChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Total Capacity</label>
                  <input type="number" name="capacity" value={editingEvent.capacity} onChange={handleEditChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Ticket Price (₹)</label>
                  <input type="number" name="price" value={editingEvent.price} onChange={handleEditChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Short Description</label>
                <textarea name="description" rows="3" value={editingEvent.description} onChange={handleEditChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-8 rounded-lg transition-colors">
                  {isSubmitting ? 'Saving...' : 'Edit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================
          FIGMA PAGE 28: EVENT DELETED ALERT
          ========================================= */}
      {showDeleteAlert && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center border border-slate-200 animate-in fade-in zoom-in duration-200">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">EVENT DELETED</h2>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageEvents;