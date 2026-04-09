import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';
export const getAllEvents = async () => {
  // Naked request. No headers. No token.
  const response = await axios.get(API_URL);
  return response.data.data || response.data;
};

export const getAdminEvents = async () => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  const response = await axios.get(`${API_URL}/admin`, config);
  return response.data.data || response.data;
};

export const getDashboardData = async () => {
  const token = localStorage.getItem('token'); // 1. GRAB THE TOKEN
  
  const response = await axios.get('http://localhost:5000/api/admin/dashboard', {
    headers: {
      Authorization: `Bearer ${token}` // 2. SEND THE TOKEN
    }
  });
  return response.data;
};
export const getEventById = async (eventId) => {
  const response = await axios.get(`${API_URL}/${eventId}`);
  return response.data.data;
};

// Create a new event (Requires Token)
export const createEvent = async (eventData) => {
  const token = localStorage.getItem('token'); 
  
  const response = await axios.post('http://localhost:5000/api/events', eventData, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
  return response.data;
};




export const toggleEventStatus = async (eventId) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  // We use PATCH to match the backend
  const response = await axios.patch(`${API_URL}/${eventId}/status`, {}, config);
  return response.data;
};

export const updateEvent = async (eventId, eventData) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  const response = await axios.put(`${API_URL}/${eventId}`, eventData, config);
  return response.data;
};

export const deleteEvent = async (eventId) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  const response = await axios.delete(`${API_URL}/${eventId}`, config);
  return response.data;
};