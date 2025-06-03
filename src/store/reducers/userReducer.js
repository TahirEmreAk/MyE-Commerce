import { SET_USER, CLEAR_USER } from '../types';

const initialState = {
  currentUser: null,
  isAuthenticated: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default userReducer; 