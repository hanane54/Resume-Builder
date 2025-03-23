import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getUserProfile = async () => {
  const response = await axios.get(`${API_BASE_URL}/users/profile`);
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await axios.put(`${API_BASE_URL}/users/profile`, userData);
  return response.data;
};