import { ADD_TO_CART, INCREASE_CART_ITEM_COUNT, DECREASE_CART_ITEM_COUNT, REMOVE_FROM_CART, TOGGLE_CART_ITEM_CHECKED, SET_ALL_CART_ITEMS_CHECKED_BY_SELLER } from "./actionTypes";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const increaseCartItem = (productId) => ({
  type: INCREASE_CART_ITEM_COUNT,
  payload: productId,
});

export const decreaseCartItem = (productId) => ({
  type: DECREASE_CART_ITEM_COUNT,
  payload: productId,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const toggleCartItemChecked = (productId) => ({
  type: TOGGLE_CART_ITEM_CHECKED,
  payload: productId,
});

export const setAllCartItemsCheckedBySeller = (sellerId, isChecked) => ({
  type: SET_ALL_CART_ITEMS_CHECKED_BY_SELLER,
  payload: { sellerId, isChecked },
}); 