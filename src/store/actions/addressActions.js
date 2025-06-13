import axiosInstance from '../../api/axiosInstance';
import {
  FETCH_ADDRESSES_START,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAILURE,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAILURE,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  SET_SELECTED_ADDRESS
} from './addressActionTypes';

// Action Creators
export const fetchAddressesStart = () => ({
  type: FETCH_ADDRESSES_START,
});

export const fetchAddressesSuccess = (addresses) => ({
  type: FETCH_ADDRESSES_SUCCESS,
  payload: addresses,
});

export const fetchAddressesFailure = (error) => ({
  type: FETCH_ADDRESSES_FAILURE,
  payload: error,
});

export const addAddressSuccess = (address) => ({
  type: ADD_ADDRESS_SUCCESS,
  payload: address,
});

export const addAddressFailure = (error) => ({
  type: ADD_ADDRESS_FAILURE,
  payload: error,
});

export const updateAddressSuccess = (address) => ({
  type: UPDATE_ADDRESS_SUCCESS,
  payload: address,
});

export const updateAddressFailure = (error) => ({
  type: UPDATE_ADDRESS_FAILURE,
  payload: error,
});

export const deleteAddressSuccess = (addressId) => ({
  type: DELETE_ADDRESS_SUCCESS,
  payload: addressId,
});

export const deleteAddressFailure = (error) => ({
  type: DELETE_ADDRESS_FAILURE,
  payload: error,
});

export const setSelectedAddress = (address) => ({
  type: SET_SELECTED_ADDRESS,
  payload: address,
});

// Thunk Actions
export const fetchAddresses = () => async (dispatch) => {
  dispatch(fetchAddressesStart());
  try {
    const response = await axiosInstance.get('/user/address');
    console.log('fetchAddresses API yanıtı (response.data):', response.data); // Yeni log
    dispatch(fetchAddressesSuccess(response.data));
  } catch (error) {
    dispatch(fetchAddressesFailure(error.message));
  }
};

export const addAddress = (addressData) => async (dispatch) => {
  try {
    await axiosInstance.post('/user/address', addressData);
    dispatch(fetchAddresses()); // Başarılı eklemeden sonra adresleri yeniden çek
  } catch (error) {
    dispatch(addAddressFailure(error.message));
    throw error; // Hata durumunu çağırana ilet
  }
};

export const updateAddress = (addressData) => async (dispatch) => {
  try {
    await axiosInstance.put('/user/address', addressData);
    dispatch(fetchAddresses()); // Başarılı güncellemeden sonra adresleri yeniden çek
  } catch (error) {
    dispatch(updateAddressFailure(error.message));
    throw error;
  }
};

export const deleteAddress = (addressId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/user/address/${addressId}`);
    dispatch(deleteAddressSuccess(addressId));
  } catch (error) {
    dispatch(deleteAddressFailure(error.message));
    throw error;
  }
}; 