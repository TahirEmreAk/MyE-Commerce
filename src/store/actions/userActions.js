import axiosInstance from '../../api/axiosInstance';
import { SET_USER, CLEAR_USER, AUTH_LOADING, AUTH_LOADED } from '../types';
import { setAuthToken, clearStoredAuth } from '../../utils/authUtils';

// Action Creators
export const setUser = (user) => {
  console.log('setUser action creator - user:', user); // Debug için
  return {
    type: SET_USER,
    payload: user
  };
};

export const clearUser = () => {
  console.log('clearUser action creator'); // Debug için
  return {
    type: CLEAR_USER
  };
};

// Thunk Actions
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOADING }); // Yükleme başladı
    
    const response = await axiosInstance.post('/login', {
      email: credentials.email,
      password: credentials.password
    });

    console.log('Login response:', response.data); // Debug için

    const userData = {
      ...response.data.user,
      token: response.data.token
    };

    console.log('User data to be stored:', userData); // Debug için

    // Token'ı localStorage'a kaydet (eğer beni hatırla seçiliyse)
    if (credentials.rememberMe) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(userData));
    }

    // Axios header'ına token'ı ekle
    setAuthToken(response.data.token);

    // Store'a kullanıcı bilgilerini kaydet
    dispatch(setUser(userData));
    dispatch({ type: AUTH_LOADED }); // Yükleme bitti

    return response.data;
  } catch (error) {
    console.error('Login error:', error); // Debug için
    dispatch({ type: AUTH_LOADED }); // Hata durumunda da yükleme bitti
    throw error;
  }
};

export const verifyToken = () => async (dispatch) => {
  dispatch({ type: AUTH_LOADING }); // Yükleme başladı
  try {
    const token = localStorage.getItem('token');
    
    console.log('verifyToken - token:', token); // Debug için
    
    if (!token) {
      console.log('verifyToken - no token found'); // Debug için
      dispatch({ type: AUTH_LOADED }); // Yükleme bitti
      return false;
    }

    // Token'ı Axios header'ına ekle
    setAuthToken(token);

    // Token'ı doğrula
    const response = await axiosInstance.get('/verify');
    
    console.log('verifyToken - response:', response.data); // Debug için
    
    // Kullanıcı bilgilerini güncelle
    const userData = {
      ...response.data,
      token
    };

    console.log('verifyToken - userData:', userData); // Debug için

    // LocalStorage'ı güncelle
    localStorage.setItem('user', JSON.stringify(userData));

    // Store'u güncelle
    dispatch(setUser(userData));
    dispatch({ type: AUTH_LOADED }); // Yükleme bitti
    
    return true;
  } catch (error) {
    console.error('verifyToken - error:', error); // Debug için
    // Token geçersiz ise temizle
    clearStoredAuth();
    dispatch(clearUser());
    dispatch({ type: AUTH_LOADED }); // Yükleme bitti
    return false;
  }
};

export const logoutUser = () => (dispatch) => {
  console.log('logoutUser - çıkış yapılıyor'); // Debug için
  clearStoredAuth();
  dispatch(clearUser());
}; 