import React, { useState, useEffect } from 'react';
import { getAdminEvents } from '../../services/eventService';
import { getAllRegistrations } from '../../services/registrationService';
import { getAllUsers } from '../../services/userService';
import { X } from 'lucide-react';
import AdminMessages from './AdminMessages';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Real Database States
  const [stats, setStats] = useState({ totalEvents: 0, totalRegistrations: 0, totalUsers: 0 });
  const [recentRegistrations, setRecentRegistrations] = useState([]);

  // Modal State
  const [viewRegistration, setViewRegistration] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [eventsData, regsData, usersData] = await Promise.all([
          getAdminEvents(), // <--- USE THE NEW ADMIN FUNCTION HERE
          getAllRegistrations(),
          getAllUsers()
        ]);


        // 1. Populate the top cards
        setStats({
          totalEvents: eventsData.length,
          totalRegistrations: regsData.length,
          totalUsers: usersData.length
        });

        // 2. Sort registrations by newest first, and grab the top 5 for the table
        const sortedRegs = regsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        setRecentRegistrations(sortedRegs);

        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data from the database.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="font-bold text-slate-500">Loading live dashboard...</div>;

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900">Welcome, Admin</h1>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 font-bold rounded-lg border border-red-200">{error}</div>}

      {/* Stats Grid (Now powered by MongoDB) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Events</p>
          <h3 className="text-4xl font-extrabold text-slate-900">{stats.totalEvents}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Registrations</p>
          <h3 className="text-4xl font-extrabold text-slate-900">{stats.totalRegistrations}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Users</p>
          <h3 className="text-4xl font-extrabold text-slate-900">{stats.totalUsers}</h3>
        </div>
      </div>

      {/* Recent Event Registrations Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Recent Event Registrations</h2>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-600">
              <th className="px-6 py-4">Username</th>
              <th className="px-6 py-4">Event Name</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentRegistrations.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-slate-500 font-bold">No recent registrations found.</td>
              </tr>
            ) : (
              recentRegistrations.map((reg) => (
                <tr key={reg._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{reg.user?.name || 'Unknown User'}</td>
                  <td className="px-6 py-4 text-slate-600">{reg.event?.title || 'Event Deleted'}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(reg.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    {/* Clicking this sets the state to open the modal */}
                    <button
                      onClick={() => setViewRegistration(reg)}
                      className="text-orange-500 hover:text-orange-600 font-bold text-sm bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>

      <div className='mt-10'>


        <AdminMessages />
      </div>

      {/* =========================================
          FIGMA PAGE 25: VIEW REGISTRATION MODAL
          ========================================= */}
      {viewRegistration && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">

            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xl font-extrabold text-slate-900">Registration Details</h2>
              <button onClick={() => setViewRegistration(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body matches Figma fields */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">User Name</p>
                <p className="text-lg font-bold text-slate-900">{viewRegistration.user?.name || 'Unknown User'}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                <p className="text-slate-700 font-medium">{viewRegistration.user?.email || 'N/A'}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Event Name</p>
                <p className="text-slate-700 font-medium">{viewRegistration.event?.title || 'Event Deleted'}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Registration Date</p>
                <p className="text-slate-700 font-medium">
                  {new Date(viewRegistration.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                </p>
              </div>
            </div>


            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setViewRegistration(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;