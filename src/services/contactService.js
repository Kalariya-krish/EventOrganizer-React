import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contact';

// Fetch all messages for Admin
export const getAllContacts = async () => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update status (e.g., mark as read/resolved)
export const updateContactStatus = async (id, status) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  const response = await axios.put(`${API_URL}/${id}`, { status }, config);
  return response.data;
};