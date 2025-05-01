import axiosInstance from './axiosConfig';

export const getUserProfile = async () => {
  const response = await axiosInstance.get('/users/profile');
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await axiosInstance.put('/users/profile', userData);
  return response.data;
};