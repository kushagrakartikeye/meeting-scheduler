import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (userData) => api.post('/auth/login', userData),
};

// Meeting endpoints
export const meetingAPI = {
  create: (meetingData) => api.post('/meetings', meetingData),
  getAll: () => api.get('/meetings'),
  getSummary: () => api.get('/meetings/summary'),
  getUpcoming: () => api.get('/meetings/upcoming'),
  joinMeeting: (meetingId) => api.get(`/meetings/${meetingId}/join`),
  rsvp: (meetingId, status) => api.put(`/meetings/${meetingId}/rsvp`, { status }),
};

export default api;
