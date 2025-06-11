import axiosInstance from '../../api/axiosInstance';
import {
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE
} from '../types';

// Action Creators
export const fetchCategoriesStart = () => ({
  type: FETCH_CATEGORIES_START
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error
});

// Thunk Action
export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const response = await axiosInstance.get('/categories');
    
    // Kategorileri gender'a göre grupla
    const categoriesByGender = {
      kadin: response.data.filter(cat => cat.gender === 'k'),
      erkek: response.data.filter(cat => cat.gender === 'e')
    };
    
    dispatch(fetchCategoriesSuccess(categoriesByGender));
    return categoriesByGender;
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
    throw error;
  }
}; 