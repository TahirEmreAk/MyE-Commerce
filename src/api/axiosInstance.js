import axios from 'axios';

// Backend (Workintech) Render ücretsiz katmanında barınıyor; servis bir süre
// hareketsiz kalınca uykuya geçer ve ilk istekte ~50 sn'lik soğuk başlangıç
// yaşanır. Eski 15 sn'lik timeout bu süreye yetmediği için ilk açılışta veriler
// gelmiyordu. Timeout 60 sn'ye çıkarıldı ve soğuk başlangıç için tek seferlik
// otomatik yeniden deneme eklendi.
const REQUEST_TIMEOUT = 60000;

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config;

    // Soğuk başlangıç (timeout) veya geçici ağ hatasında bir kez yeniden dene.
    const isTimeout = error.code === 'ECONNABORTED';
    const isNetwork = !error.response && error.message === 'Network Error';
    if ((isTimeout || isNetwork) && config && !config._retry) {
      config._retry = true;
      console.warn('Sunucu uyanıyor olabilir; istek bir kez yeniden deneniyor...');
      return axiosInstance(config);
    }

    console.error('Response error:', error);
    if (error.response?.status === 401) {
      console.error('401 Unauthorized - Token geçersiz veya eksik');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
