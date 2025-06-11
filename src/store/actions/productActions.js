import axiosInstance from '../../api/axiosInstance';
import {
  SET_CATEGORIES,
  SET_TOTAL,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_PRODUCTS,
  SET_LOADING,
  SET_ERROR,
  SET_PRODUCT_CATEGORY_ID,
  SET_PRODUCT_SORT,
  SET_PRODUCT_FILTER
} from './actionTypes';

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

export const setProductCategoryId = (categoryId) => ({
  type: SET_PRODUCT_CATEGORY_ID,
  payload: categoryId
});

export const setProductSort = (sort) => ({
  type: SET_PRODUCT_SORT,
  payload: sort
});

export const setProductFilter = (filterText) => ({
  type: SET_PRODUCT_FILTER,
  payload: filterText
});

export const fetchProducts = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const { product } = getState();
    const params = {
      limit: product.limit,
      offset: product.offset
    };
    if (product.categoryId) {
      params.category = product.categoryId;
    }
    if (product.sort) {
      params.sort = product.sort;
    }
    if (product.filterText) {
      params.filter = product.filterText;
    }

    const response = await axiosInstance.get('/products', { params });
    dispatch(setProducts(response.data.products));
    dispatch(setTotal(response.data.total));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
}; 