import axiosInstance from './axiosConfig';

export const createResume = async (resumeData) => {
  const response = await axiosInstance.post('/resumes', resumeData);
  return response.data;
};

export const getResumeById = async (id) => {
  const response = await axiosInstance.get(`/resumes/${id}`);
  return response.data;
};

export const getAllResumes = async () => {
  const response = await axiosInstance.get('/resumes');
  return response.data;
};

// update resume details
export const updateResume = async (id, resumeData) => {
  const response = await axiosInstance.put(`/resumes/${id}`, resumeData);
  return response.data;
};

export const deleteResume = async (id) => {
  const response = await axiosInstance.delete(`/resumes/${id}`);
  return response.data;
};