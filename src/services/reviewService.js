import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reviews';

export const getAllReviews = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Admin token missing.');
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};
// Fetch reviews for the Event Details page
export const getEventReviews = async (eventId) => {
  const response = await axios.get(`${API_URL}/${eventId}`);
  return response.data;
};

// POST a new review from the user
export const submitReview = async (eventId, rating, comment) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('You must be logged in to leave feedback.');
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const response = await axios.post(`${API_URL}/${eventId}`, { rating, comment }, config);
  return response.data;
};