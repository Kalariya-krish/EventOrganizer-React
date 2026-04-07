import React, { useState, useEffect } from 'react';
import { getAllRegistrations } from '../../services/registrationService';

const EventRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const data = await getAllRegistrations();
        setRegistrations(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load registrations from the server.');
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  if (loading) return <div className="font-bold text-slate-500">Loading registrations...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Header section matching Figma Page 23 */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Event Registrations</h1>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 font-bold rounded-lg border border-red-200">{error}</div>}

      {/* Main Table matching Figma layout */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-600">
              <th className="px-6 py-4">RegID</th>
              <th className="px-6 py-4">Event Name</th>
              <th className="px-6 py-4">User Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Registration Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {registrations?.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500 font-bold">No ticket sales found yet.</td>
              </tr>
            ) : (
              registrations.map((reg) => (
                <tr key={reg._id} className="hover:bg-slate-50 transition-colors">
                  {/* Truncating the MongoDB ID to look like the #REG101 format in Figma */}
                  <td className="px-6 py-4 font-bold text-slate-500">#{reg._id.substring(reg._id.length - 6).toUpperCase()}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{reg.event?.title || 'Event Deleted'}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{reg.user?.name || 'Unknown User'}</td>
                  <td className="px-6 py-4 text-slate-600">{reg.user?.email || 'N/A'}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(reg.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default EventRegistrations;