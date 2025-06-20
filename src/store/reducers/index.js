import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import productReducer from './productReducer';
import shoppingCartReducer from './shoppingCartReducer';
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import addressReducer from './addressReducer';
import cardReducer from './cardReducer';

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  user: userReducer,
  categories: categoryReducer,
  cart: cartReducer,
  order: orderReducer,
  address: addressReducer,
  card: cardReducer,
});

export default rootReducer; 