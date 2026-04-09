import axios from 'axios';

const API_URL = 'http://localhost:5000/api/registrations';

// Fetch all registrations for the Admin dashboard
export const getAllRegistrations = async () => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  const response = await axios.get(API_URL, config);
  
  // FIX: Return the actual array, not a ghost property
  return response.data; 
};

// Register (Buy Ticket) for an event
export const registerForEvent = async (eventId) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  const response = await axios.post(`${API_URL}/${eventId}`, {}, config);
  return response.data;
};


export const getMyTickets = async () => {
  const token = localStorage.getItem('token'); // Grab the saved JWT token
  
  if (!token) throw new Error("No token found. Please log in.");

  const response = await axios.get('http://localhost:5000/api/registrations/my-tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};