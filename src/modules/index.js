// Combine reducers & Export rootReducer
import { combineReducers } from 'redux';
import stock from './stock.js';
import loading from './loading.js';
import auth from './auth.js';
import toast from './toast.js';
const rootReducer = combineReducers({ stock, loading, auth, toast });
export default rootReducer;
