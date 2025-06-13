import { combineReducers, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';

import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import userReducer from './reducers/userReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';
import clientReducer from './reducers/clientReducer';
import cartReducer from './reducers/cartReducer';
import addressReducer from './reducers/addressReducer';
import cardReducer from './reducers/cardReducer';

const rootReducer = combineReducers({
  product: productReducer,
  categories: categoryReducer,
  user: userReducer,
  shoppingCart: shoppingCartReducer,
  client: clientReducer,
  cart: cartReducer,
  address: addressReducer,
  card: cardReducer,
});

const middleware = [thunk];

// Development ortamında logger'ı ekle
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store; 