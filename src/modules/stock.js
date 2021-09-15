import { createAction, handleActions } from 'redux-actions';
import createRequestThunk from '../lib/createRequestThunk';

// action name
const CHANGE_KEY = 'stock/CHANGE_KEY';
const SELECT_ITEM = 'stock/SELECT_ITEM';
const FETCH_STOCK_LIST = 'stock/FETCH_STOCK_LIST';
const FETCH_STOCK_LIST_SUCCESS = 'stock/FETCH_STOCK_LIST_SUCCESS';

const fetchMarket = market =>
  fetch(`http://127.0.0.1:8000/api/stockinfo/${market}/`);
// action creator
export const changeKey = createAction(CHANGE_KEY, key => key);
export const selectItem = createAction(SELECT_ITEM, stockName => stockName);
export const fetchStockList = createRequestThunk(FETCH_STOCK_LIST, fetchMarket);

// initial state
const initialState = {
  key: '',
  list: [],
  selected: {},
};

// reducer
const reducer = handleActions(
  {
    [CHANGE_KEY]: (state, { payload: key }) => ({ ...state, key }),
    [SELECT_ITEM]: (state, { payload: stockName }) => ({
      ...state,
      selected: state.list.find(item => item.stockName === stockName),
    }),
    [FETCH_STOCK_LIST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      list: data,
    }),
  },
  initialState
);

export default reducer;
