// Combine reducers & Export rootReducer
import { combineReducers } from 'redux';
import sample from './sample.js';
import stock from './stock.js';
import loading from './loading.js';
const rootReducer = combineReducers({ sample, stock, loading });
export default rootReducer;
