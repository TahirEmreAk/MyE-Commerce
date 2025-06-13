import axiosInstance from '../../api/axiosInstance';
import { SET_USER, CLEAR_USER, AUTH_LOADING, AUTH_LOADED } from '../types';
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
    console.log('Login attempt with:', { email: credentials.email });
    
    const response = await axiosInstance.post('/login', {
      email: credentials.email,
      password: credentials.password
    });

    console.log('Login response:', response.data);

    if (!response.data || !response.data.token) {
      throw new Error('Geçersiz sunucu yanıtı');
    }

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
    console.error('Login error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status
    });

    if (error.code === 'ECONNABORTED') {
      throw new Error('Sunucu yanıt vermiyor. Lütfen daha sonra tekrar deneyin.');
    }

    if (error.response) {
      // Sunucudan gelen hata
      const errorMessage = error.response.data?.message || 'Giriş yapılırken bir hata oluştu';
      throw new Error(errorMessage);
    } else if (error.request) {
      // İstek yapıldı ama yanıt alınamadı
      throw new Error('Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.');
    } else {
      // İstek oluşturulurken hata oluştu
      throw new Error('Giriş yapılırken bir hata oluştu: ' + error.message);
    }
  }
};

export const verifyToken = () => async (dispatch) => {
  dispatch({ type: AUTH_LOADING }); // Yükleme başladı
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      dispatch({ type: AUTH_LOADED }); // Yükleme bitti
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
    dispatch({ type: AUTH_LOADED }); // Yükleme bitti
    
    return true;
  } catch (error) {
    // Token geçersiz ise temizle
    clearStoredAuth();
    dispatch(clearUser());
    dispatch({ type: AUTH_LOADED }); // Yükleme bitti
    return false;
  }
};

export const logoutUser = () => (dispatch) => {
  clearStoredAuth();
  dispatch(clearUser());
}; 