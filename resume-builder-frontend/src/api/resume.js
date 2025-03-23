import axios from 'axios';
import { API_BASE_URL } from '../config';

export const createResume = async (resumeData) => {
  const response = await axios.post(`${API_BASE_URL}/resumes`, resumeData);
  return response.data;
};

export const getResumeById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/resumes/${id}`);
  return response.data;
};

// update resume details
export const updateResume = async (id, resumeData) => {
  const response = await axios.put(`${API_BASE_URL}/resumes/${id}`, resumeData);
  return response.data;
};

export const deleteResume = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/resumes/${id}`);
  return response.data;
};