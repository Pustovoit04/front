import axios from 'axios';

// Базовий URL вашого бекенду
const API_URL = 'https://practice-trly.onrender.com';

// Налаштування axios для роботи з авторизацією
const api = axios.create({
  withCredentials: true, // Дозволяє відправляти кукі для авторизації
  baseURL: API_URL,
});

// Функція для обробки помилок
const handleError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.error || 'Помилка сервера');
  } else if (error.request) {
    throw new Error('Немає відповіді від сервера');
  } else {
    throw new Error('Помилка запиту: ' + error.message);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchCandidatesByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/categories/${categoryId}/candidates`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const submitVote = async (categoryId, candidateId) => {
  try {
    const response = await api.post('/votes', { categoryId, candidateId });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const checkIfVoted = async (categoryId) => {
  try {
    const response = await api.get(`/votes/check/${categoryId}`);
    return response.data.hasVoted;
  } catch (error) {
    handleError(error);
  }
};

export const fetchStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchTopCandidate = async () => {
  try {
    const response = await api.get('/top-candidate');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchBottomCandidate = async () => {
  try {
    const response = await api.get('/bottom-candidate');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchRandomCategory = async () => {
  try {
    const response = await api.get('/categories/random');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await api.post('/categories', categoryData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await api.put(`/categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await api.delete(`/categories/${categoryId}`);
    return response.data; // Повертаємо дані, якщо бекенд їх відправляє
  } catch (error) {
    handleError(error);
  }
};

export const createCandidate = async (categoryId, candidateData) => {
  try {
    const response = await api.post(`/categories/${categoryId}/candidates`, candidateData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteCandidate = async (categoryId, candidateId) => {
  try {
    const response = await api.delete(`/categories/${categoryId}/candidates/${candidateId}`);
    return response.data; // Повертаємо дані, якщо бекенд їх відправляє
  } catch (error) {
    handleError(error);
  }
};

// Функція logout з використанням axios для узгодженості
export const logout = async () => {
  try {
    const response = await api.get('/logout'); // Змінено на GET, як у voteRoutes.js
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
