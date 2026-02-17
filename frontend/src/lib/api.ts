import axios from 'axios';

// .env: VITE_API_URL="http://localhost:5000"  (no trailing /api)
// We append /api here so all endpoints resolve correctly.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token for admin routes
api.interceptors.request.use((config) => {
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

export const submitApplication = async (data: any) => {
  const response = await api.post('/applications', data);
  return response.data;
};

export const getApplications = async () => {
  const response = await api.get('/applications');
  return response.data;
};

export const deleteApplication = async (id: string) => {
  const response = await api.delete(`/applications/${id}`);
  return response.data;
};

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (data: any) => {
  const response = await api.post('/products', data);
  return response.data;
};

export const updateProduct = async (id: string, data: any) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export default api;