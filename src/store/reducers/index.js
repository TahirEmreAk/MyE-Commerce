import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import productReducer from './productReducer';
import shoppingCartReducer from './shoppingCartReducer';
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  user: userReducer,
  categories: categoryReducer
});

export default rootReducer; 