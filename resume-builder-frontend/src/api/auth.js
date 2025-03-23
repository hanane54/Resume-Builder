import axios from 'axios';
import { API_BASE_URL } from '../config';

export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/login`, credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, userData);
  return response.data;
};