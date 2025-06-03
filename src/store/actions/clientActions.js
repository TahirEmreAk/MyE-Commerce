import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE } from './actionTypes';
import axiosInstance from '../../api/axiosInstance';

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
});

// Thunk Action Creator for Roles
export const fetchRoles = () => async (dispatch, getState) => {
  const { roles } = getState().client;
  
  // Rolleri sadece gerektiğinde getir
  if (!roles || roles.length === 0) {
    try {
      const response = await axiosInstance.get('/roles');
      dispatch(setRoles(response.data));
    } catch (error) {
      console.error('Roller getirilirken hata oluştu:', error);
    }
  }
}; 