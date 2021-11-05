import { createAction, handleActions } from 'redux-actions';
import createRequestThunk from '../lib/createRequestThunk';

// action name
const CHANGE_KEY = 'stock/CHANGE_KEY';
const SELECT_ITEM = 'stock/SELECT_ITEM';
const CHNAGE_DURATION = 'stock/CHNAGE_DURATION';
const FETCH_STOCK_LIST = 'stock/FETCH_STOCK_LIST';
const FETCH_STOCK_LIST_SUCCESS = 'stock/FETCH_STOCK_LIST_SUCCESS';
const FETCH_STOCK_DETAIL = 'stock/FETCH_STOCK_DETAIL';
const FETCH_STOCK_DETAIL_SUCCESS = 'stock/FETCH_STOCK_DETAIL_SUCCESS';
const FETCH_STOCK_BASICPRICE = 'stock/FETCH_STOCK_BASICPRICE';
const FETCH_STOCK_BASICPRICE_SUCCESS = 'stock/FETCH_STOCK_BASICPRICE_SUCCESS';

const fetchMarket = market =>
  fetch(`http://127.0.0.1:8000/api/stockinfo/${market}/`).catch(e =>
    console.error(e)
  );
const fetchDetail = stockCode =>
  fetch(
    `http://127.0.0.1:8000/api/stockinfo/searchdetailinfo/${stockCode}/`
  ).catch(e => console.error(e));
const fetchBasic = stockCode =>
  fetch(
    `http://127.0.0.1:8000/api/stockinfo/searchcurrentprice/${stockCode}/`
  ).catch(e => console.error(e));
// action creator
export const changeKey = createAction(CHANGE_KEY, key => key);
export const selectItem = createAction(SELECT_ITEM, stockName => stockName);
export const changeDuration = createAction(
  CHNAGE_DURATION,
  duration => duration
);
export const fetchStockList = createRequestThunk(FETCH_STOCK_LIST, fetchMarket);
export const fetchStockDetail = createRequestThunk(
  FETCH_STOCK_DETAIL,
  fetchDetail
);
export const fetchStockBasic = createRequestThunk(
  FETCH_STOCK_BASICPRICE,
  fetchBasic
)

// initial state
const initialState = {
  key: '',
  list: [],
  searchList: [],
  selected: {
    stockCode: '종목을 선택하세요',
    stockName: '',
  },
  duration: 'ONEMONTH',
  detail: {
    ONEMONTH: [],
    ONEYEAR: [],
    SIXMONTH: [],
    TENYEARS: [],
    THREEMONTH: [],
  },
  priceBasic: {}
};

// reducer
const reducer = handleActions(
  {
    [CHANGE_KEY]: (state, { payload: key }) => ({ 
      ...state, 
      key: key,
      searchList: state.list.filter(item => item.stockName.toLowerCase().includes(key.toLowerCase())) 
    }),
    [SELECT_ITEM]: (state, { payload: stockName }) => ({
      ...state,
      selected: state.list.find(item => item.stockName === stockName),
    }),
    [CHNAGE_DURATION]: (state, { payload: duration }) => ({
      ...state,
      duration,
    }),
    [FETCH_STOCK_LIST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      list: data,
      searchList: data,
    }),
    [FETCH_STOCK_DETAIL_SUCCESS]: (state, { payload: detail }) => ({
      ...state,
      duration: 'ONEMONTH',
      detail,
    }),
    [FETCH_STOCK_BASICPRICE_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      priceBasic: data
    })
  },
  initialState
);

export default reducer;