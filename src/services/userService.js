import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Fetch all users for Admin Dashboard
export const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  const response = await axios.get(API_URL, config);
  return response.data;
};