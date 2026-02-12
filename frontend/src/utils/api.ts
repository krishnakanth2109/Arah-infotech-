import axios from 'axios';

// Ensure you have VITE_API_URL defined in your .env file
// Example .env: VITE_API_URL=http://localhost:5000/api
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the Token for admin routes
api.interceptors.request.use((config) => {
  // We use sessionStorage as per your request
  const token = sessionStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- API FUNCTIONS ---

export const getCareers = async () => {
  const response = await api.get('/careers');
  return response.data;
};

export const createCareer = async (data: any) => {
  const response = await api.post('/careers', data);
  return response.data;
};

export const updateCareer = async (id: string, data: any) => {
  const response = await api.put(`/careers/${id}`, data);
  return response.data;
};

export const deleteCareer = async (id: string) => {
  const response = await api.delete(`/careers/${id}`);
  return response.data;
};

export const submitContact = async (data: any) => {
  const response = await api.post('/contact', data);
  return response.data;
};

export const getContacts = async () => {
  const response = await api.get('/contact');
  return response.data;
};

export const loginAdmin = async (credentials: any) => {
  const response = await api.post('/admin/login', credentials);
  return response.data;
};

export default api;