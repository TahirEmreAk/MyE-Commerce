import axiosInstance from '../api/axiosInstance';

export const setAuthToken = (token) => {
  console.log('setAuthToken - token:', token); // Debug için
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = token;
    console.log('setAuthToken - header set:', axiosInstance.defaults.headers.common['Authorization']); // Debug için
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
    console.log('setAuthToken - header cleared'); // Debug için
  }
};

export const getStoredAuth = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  console.log('getStoredAuth - token:', token, 'user:', user); // Debug için
  return {
    token,
    user: user ? JSON.parse(user) : null
  };
};

export const clearStoredAuth = () => {
  console.log('clearStoredAuth - auth temizleniyor'); // Debug için
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setAuthToken(null);
}; 