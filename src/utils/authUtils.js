import axiosInstance from '../api/axiosInstance';

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = token;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export const getStoredAuth = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return {
    token,
    user: user ? JSON.parse(user) : null
  };
};

export const clearStoredAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setAuthToken(null);
}; 