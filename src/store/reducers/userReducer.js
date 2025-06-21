import { SET_USER, CLEAR_USER, AUTH_LOADING, AUTH_LOADED } from '../types';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log('userReducer - SET_USER action:', action.payload);
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case CLEAR_USER:
      console.log('userReducer - CLEAR_USER action');
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_LOADING:
      console.log('userReducer - AUTH_LOADING action');
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOADED:
      console.log('userReducer - AUTH_LOADED action');
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default userReducer; 