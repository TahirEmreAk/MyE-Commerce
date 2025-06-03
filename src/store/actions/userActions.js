import axiosInstance from '../../api/axiosInstance';
import { SET_USER, CLEAR_USER } from '../types';
import { setAuthToken, clearStoredAuth } from '../../utils/authUtils';

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const clearUser = () => ({
  type: CLEAR_USER
});

// Thunk Actions
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/login', {
      email: credentials.email,
      password: credentials.password
    });

    const userData = {
      ...response.data.user,
      token: response.data.token,
      gravatarUrl: credentials.gravatarUrl
    };

    // Token'ı localStorage'a kaydet (eğer beni hatırla seçiliyse)
    if (credentials.rememberMe) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(userData));
    }

    // Axios header'ına token'ı ekle
    setAuthToken(response.data.token);

    // Store'a kullanıcı bilgilerini kaydet
    dispatch(setUser(userData));

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyToken = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return false;
    }

    // Token'ı Axios header'ına ekle
    setAuthToken(token);

    // Token'ı doğrula
    const response = await axiosInstance.get('/verify');
    
    // Kullanıcı bilgilerini güncelle
    const userData = {
      ...response.data,
      token
    };

    // LocalStorage'ı güncelle
    localStorage.setItem('user', JSON.stringify(userData));

    // Store'u güncelle
    dispatch(setUser(userData));
    
    return true;
  } catch (error) {
    // Token geçersiz ise temizle
    clearStoredAuth();
    dispatch(clearUser());
    return false;
  }
};

export const logoutUser = () => (dispatch) => {
  clearStoredAuth();
  dispatch(clearUser());
}; 