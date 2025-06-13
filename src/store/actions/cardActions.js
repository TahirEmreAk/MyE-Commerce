import axiosInstance from '../../api/axiosInstance';
import {
  FETCH_CARDS_START,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAILURE,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAILURE,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
  SET_SELECTED_CARD,
} from './cardActionTypes';

// Action Creators
export const fetchCardsStart = () => ({
  type: FETCH_CARDS_START,
});

export const fetchCardsSuccess = (cards) => ({
  type: FETCH_CARDS_SUCCESS,
  payload: cards,
});

export const fetchCardsFailure = (error) => ({
  type: FETCH_CARDS_FAILURE,
  payload: error,
});

export const addCardSuccess = (card) => ({
  type: ADD_CARD_SUCCESS,
  payload: card,
});

export const addCardFailure = (error) => ({
  type: ADD_CARD_FAILURE,
  payload: error,
});

export const updateCardSuccess = (card) => ({
  type: UPDATE_CARD_SUCCESS,
  payload: card,
});

export const updateCardFailure = (error) => ({
  type: UPDATE_CARD_FAILURE,
  payload: error,
});

export const deleteCardSuccess = (cardId) => ({
  type: DELETE_CARD_SUCCESS,
  payload: cardId,
});

export const deleteCardFailure = (error) => ({
  type: DELETE_CARD_FAILURE,
  payload: error,
});

export const setSelectedCard = (card) => ({
  type: SET_SELECTED_CARD,
  payload: card,
});

// Thunk Actions
export const fetchCards = () => async (dispatch) => {
  dispatch(fetchCardsStart());
  try {
    const response = await axiosInstance.get('/user/card');
    dispatch(fetchCardsSuccess(response.data));
  } catch (error) {
    dispatch(fetchCardsFailure(error.message));
  }
};

export const addCard = (cardData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/user/card', cardData);
    dispatch(addCardSuccess(response.data));
    dispatch(fetchCards()); // Refresh cards after adding
  } catch (error) {
    dispatch(addCardFailure(error.message));
    throw error; // Propagate error to the caller
  }
};

export const updateCard = (cardData) => async (dispatch) => {
  try {
    const response = await axiosInstance.put('/user/card', cardData);
    dispatch(updateCardSuccess(response.data));
    dispatch(fetchCards()); // Refresh cards after updating
  } catch (error) {
    dispatch(updateCardFailure(error.message));
    throw error;
  }
};

export const deleteCard = (cardId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/user/card/${cardId}`);
    dispatch(deleteCardSuccess(cardId));
  } catch (error) {
    dispatch(deleteCardFailure(error.message));
    throw error;
  }
}; 