import {
  FETCH_ADDRESSES_START,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAILURE,
  ADD_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_SUCCESS,
  SET_SELECTED_ADDRESS
} from '../actions/addressActionTypes';

const initialState = {
  addresses: [],
  selectedAddress: null, // Seçilen adres
  loading: false,
  error: null,
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADDRESSES_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: action.payload,
      };
    case FETCH_ADDRESSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: state.addresses.map((address) =>
          address.id === action.payload.id ? action.payload : address
        ),
      };
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: state.addresses.filter((address) => address.id !== action.payload),
      };
    case SET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer; 