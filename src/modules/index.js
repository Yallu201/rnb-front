// Combine reducers & Export rootReducer
import { combineReducers } from 'redux';
import stock from './stock.js';
import loading from './loading.js';
import auth from './auth.js';
const rootReducer = combineReducers({ stock, loading, auth });
export default rootReducer;
