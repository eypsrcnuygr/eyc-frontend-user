import { combineReducers } from 'redux';
import createAdminReducer from './createAdminReducer';
import createBasketReducer from './createBasketReducer';

const rootReducer = combineReducers({
  createAdminReducer, createBasketReducer
});

export default rootReducer;