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
} from '../actions/cardActionTypes';

const initialState = {
  cards: [],
  loading: false,
  error: null,
  selectedCard: null,
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: action.payload,
        error: null,
      };
    case FETCH_CARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        // Kart eklendiğinde API'den tüm kartlar yeniden çekildiği için burada manuel ekleme yapmaya gerek yok.
        // Ancak yine de tutarlılık için eklenen kartı listeye ekleyebiliriz.
        // cards: [...state.cards, action.payload],
        error: null,
      };
    case ADD_CARD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        // Kart güncellendiğinde API'den tüm kartlar yeniden çekildiği için burada manuel güncellemeye gerek yok.
        // cards: state.cards.map((card) =>
        //   card.id === action.payload.id ? action.payload : card
        // ),
        error: null,
      };
    case UPDATE_CARD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
        error: null,
      };
    case DELETE_CARD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SET_SELECTED_CARD:
      return {
        ...state,
        selectedCard: action.payload,
      };
    default:
      return state;
  }
};

export default cardReducer; 