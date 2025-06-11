import {
  SET_CATEGORIES,
  SET_PRODUCTS,
  SET_TOTAL,
  SET_LOADING,
  SET_ERROR,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_PRODUCT_CATEGORY_ID,
  SET_PRODUCT_SORT,
  SET_PRODUCT_FILTER,
  SET_PRODUCT_DETAIL,
  FETCH_PRODUCT_DETAIL_START,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_FAILURE
} from '../actions/actionTypes';

const initialState = {
  categories: [],
  products: [],
  currentProduct: null,
  total: 0,
  loading: false,
  error: null,
  limit: 25,
  offset: 0,
  filter: '',
  categoryId: null,
  sort: '',
  filterText: ''
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case SET_TOTAL:
      return {
        ...state,
        total: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case SET_PRODUCT_CATEGORY_ID:
      return {
        ...state,
        categoryId: action.payload
      };
    case SET_PRODUCT_SORT:
      return {
        ...state,
        sort: action.payload
      };
    case SET_PRODUCT_FILTER:
      return {
        ...state,
        filterText: action.payload
      };
    case FETCH_PRODUCT_DETAIL_START:
      return {
        ...state,
        loading: true,
        error: null,
        currentProduct: null
      };
    case SET_PRODUCT_DETAIL:
      return {
        ...state,
        currentProduct: action.payload
      };
    case FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case FETCH_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        currentProduct: null
      };
    default:
      return state;
  }
};

export default productReducer; 