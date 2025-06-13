import { SET_USER, CLEAR_USER, AUTH_LOADING, AUTH_LOADED } from '../types';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOADED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default userReducer; 