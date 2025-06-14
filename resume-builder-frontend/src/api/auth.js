import axiosInstance from './axiosConfig';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/users/login', credentials);
  if (response.data.token) {
    const token = response.data.token.replace('Bearer ', '');
    localStorage.setItem('token', token);
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