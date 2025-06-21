import axiosInstance from '../../api/axiosInstance';

// Action Types
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

// Action Creators
export const fetchOrdersStart = () => ({ type: FETCH_ORDERS_START });
export const fetchOrdersSuccess = (orders) => ({ type: FETCH_ORDERS_SUCCESS, payload: orders });
export const fetchOrdersFailure = (error) => ({ type: FETCH_ORDERS_FAILURE, payload: error });

// Thunk Action
export const fetchOrders = () => async (dispatch) => {
  dispatch(fetchOrdersStart());
  try {
    console.log('Siparişler getiriliyor...');
    const response = await axiosInstance.get('/order');
    console.log('Siparişler başarıyla getirildi:', response.data);
    dispatch(fetchOrdersSuccess(response.data));
  } catch (error) {
    console.error('Siparişler getirilirken hata:', error);
    console.error('Hata detayları:', error.response?.data);
    const errorMessage = error.response?.data?.message || error.message || 'Siparişler yüklenirken hata oluştu';
    dispatch(fetchOrdersFailure(errorMessage));
  }
}; 