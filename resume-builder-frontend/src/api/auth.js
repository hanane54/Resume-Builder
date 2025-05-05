import axiosInstance from './axiosConfig';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/users/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post('/users/register', userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};