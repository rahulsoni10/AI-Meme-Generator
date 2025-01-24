import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const memeApi = {
  // Templates
  getAllTemplates: () => axios.get(`${API_BASE_URL}/templates`),
  getTemplateById: (id) => axios.get(`${API_BASE_URL}/templates/${id}`),
  
  // Memes
  createMeme: (memeData) => axios.post(`${API_BASE_URL}/memes`, memeData),
  getMemeById: (id) => axios.get(`${API_BASE_URL}/memes/${id}`),
  getUserMemes: () => axios.get(`${API_BASE_URL}/memes/user`),
  updateMeme: (id, memeData) => axios.put(`${API_BASE_URL}/memes/${id}`, memeData),
  deleteMeme: (id) => axios.delete(`${API_BASE_URL}/memes/${id}`),
  
  // User
  register: (userData) => axios.post(`${API_BASE_URL}/auth/register`, userData),
  login: (credentials) => axios.post(`${API_BASE_URL}/auth/login`, credentials),
  logout: () => axios.post(`${API_BASE_URL}/auth/logout`)
};