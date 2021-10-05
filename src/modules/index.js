// Combine reducers & Export rootReducer
import { combineReducers } from 'redux';
import stock from './stock.js';
import loading from './loading.js';
const rootReducer = combineReducers({ stock, loading });
export default rootReducer;
