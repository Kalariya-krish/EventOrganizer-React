import React, { useState, useEffect } from 'react';
import { getAllContacts, updateContactStatus } from '../../services/contactService'; // Adjust path

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await getAllContacts();
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateContactStatus(id, newStatus);
      // Refresh the list to show the new status color
      fetchMessages(); 
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="p-8 font-bold text-slate-500">Loading messages...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">User Inquiries</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Subject & Message</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr><td colSpan="5" className="p-6 text-center italic">No messages found.</td></tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg._id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{msg.name}</p>
                    <p className="text-xs">{msg.email}</p>
                  </td>
                  <td className="px-6 py-4 max-w-md">
                    <p className="font-bold text-slate-900 mb-1">{msg.subject}</p>
                    <p className="truncate text-xs">{msg.message}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      msg.status === 'unread' ? 'bg-red-100 text-red-700' :
                      msg.status === 'read' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={msg.status}
                      onChange={(e) => handleStatusChange(msg._id, e.target.value)}
                      className="border border-slate-300 rounded-md text-xs p-1.5 focus:outline-none focus:border-[#F95A00]"
                    >
                      <option value="unread">Mark Unread</option>
                      <option value="read">Mark Read</option>
                      <option value="resolved">Mark Resolved</option>
                    </select>
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

export default AdminMessages;