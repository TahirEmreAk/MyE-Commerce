import { ADD_TO_CART, INCREASE_CART_ITEM_COUNT, DECREASE_CART_ITEM_COUNT, REMOVE_FROM_CART, TOGGLE_CART_ITEM_CHECKED, SET_ALL_CART_ITEMS_CHECKED_BY_SELLER } from "../actions/actionTypes";

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      {
        const productToAdd = action.payload;
        const existingItem = state.cart.find(
          (item) => item.product.id === productToAdd.id
        );

        if (existingItem) {
          return {
            ...state,
            cart: state.cart.map((item) =>
              item.product.id === productToAdd.id
                ? { ...item, count: item.count + 1 }
                : item
            ),
          };
        } else {
          return {
            ...state,
            cart: [...state.cart, { count: 1, checked: true, product: productToAdd }],
          };
        }
      }
    case INCREASE_CART_ITEM_COUNT:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload
            ? { ...item, count: item.count + 1 }
            : item
        ),
      };
    case DECREASE_CART_ITEM_COUNT:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload
            ? { ...item, count: Math.max(1, item.count - 1) }
            : item
        ).filter(item => item.count > 0),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };
    case TOGGLE_CART_ITEM_CHECKED:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        ),
      };
    case SET_ALL_CART_ITEMS_CHECKED_BY_SELLER:
      {
        const { sellerId, isChecked } = action.payload;
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.store_id === sellerId // Assuming product has a store_id
              ? { ...item, checked: isChecked }
              : item
          ),
        };
      }
    default:
      return state;
  }
};

export default cartReducer; 