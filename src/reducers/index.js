import { combineReducers } from 'redux';
import createAdminReducer from './createAdminReducer';

const rootReducer = combineReducers({
  createAdminReducer,
});

export default rootReducer;