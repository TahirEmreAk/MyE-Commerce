import axiosInstance from '../../api/axiosInstance';
import { SET_USER, CLEAR_USER } from '../types';

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

    // Store'a kullanıcı bilgilerini kaydet
    dispatch(setUser(userData));

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(clearUser());
}; 