import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../services/userService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load users.');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="font-bold text-slate-500">Loading user database...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Header section matching Figma */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Registered Users</h1>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 font-bold rounded-lg border border-red-200">{error}</div>}

      {/* Main Table matching Figma Page 22 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-600">
              <th className="px-6 py-4">UserID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500 font-bold">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                  {/* Truncating the MongoDB ObjectId so it looks cleaner like your Figma #USR101 */}
                  <td className="px-6 py-4 font-bold text-slate-500">#{user._id.substring(user._id.length - 6).toUpperCase()}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{user.name}</td>
                  <td className="px-6 py-4 text-slate-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      user.role === 'admin' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors">
                      View Profile
                    </button>
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

export default UserList;