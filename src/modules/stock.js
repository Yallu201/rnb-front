import { createAction, handleActions } from 'redux-actions';
import createRequestThunk from '../lib/createRequestThunk';
// action name
const CHANGE_KEY = 'stock/CHANGE_KEY';
const SELECT_ITEM = 'stock/SELECT_ITEM';
const CHNAGE_DURATION = 'stock/CHNAGE_DURATION';
const CHANGE_PAGE = 'stock/CHANGE_PAGE';
const TOGGLE_BOOKMARK = 'stock/TOGGLE_BOOKMARK';
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
export const changePage = createAction(CHANGE_PAGE, page => page);
export const toggleBookmark = createAction(TOGGLE_BOOKMARK);

export const fetchStockList = createRequestThunk(FETCH_STOCK_LIST, fetchMarket);
export const fetchStockDetail = createRequestThunk(
  FETCH_STOCK_DETAIL,
  fetchDetail
);
export const fetchStockBasic = createRequestThunk(
  FETCH_STOCK_BASICPRICE,
  fetchBasic
);

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
  priceBasic: {},
  pagenation: {
    currentPage: 1,
    pagesTotalCount: null, // 페이지 총 개수
    itemsPerPage: 15, // 한번에 보여주는 최대 아이템 개수
    pageGroupSize: 8, // 한번에 보여주는 최대 페이지 개수
    pageGroupTotalCount: null, // 페이지 그룹 총 개수
  },
};

// reducer
const reducer = handleActions(
  {
    [CHANGE_KEY]: (state, { payload: key }) => {
      const searchList = state.list.filter(item =>
        item.stockName.toLowerCase().includes(key.toLowerCase())
      );
      const pagesTotalCount = Math.ceil(
        searchList.length / state.pagenation.itemsPerPage
      );
      const pageGroupTotalCount = Math.ceil(
        pagesTotalCount / state.pagenation.pageGroupSize
      );
      return {
        ...state,
        key,
        searchList,
        pagenation: {
          ...state.pagenation,
          currentPage: 1,
          pagesTotalCount,
          pageGroupTotalCount,
        },
      };
    },
    [SELECT_ITEM]: (state, { payload: stockName }) => ({
      ...state,
      selected: state.list.find(item => item.stockName === stockName),
    }),
    [CHNAGE_DURATION]: (state, { payload: duration }) => ({
      ...state,
      duration,
    }),
    [CHANGE_PAGE]: (state, { payload: page }) => {
      const { pagesTotalCount } = state.pagenation;
      const currentPage = Math.min(Math.max(1, page), pagesTotalCount);
      return {
        ...state,
        pagenation: { ...state.pagenation, currentPage },
      };
    },
    [TOGGLE_BOOKMARK]: (state, { payload: { stockCode, bookmark } }) => {
      const list = state.list.map(item => {
        if (item.stockCode === stockCode) {
          return { ...item, bookmark: !bookmark };
        }
        return item;
      });
      const searchList = state.searchList.map(item => {
        if (item.stockCode === stockCode) {
          return { ...item, bookmark: !bookmark };
        }
        return item;
      });
      return { ...state, list, searchList };
    },
    [FETCH_STOCK_LIST_SUCCESS]: (state, { payload: data }) => {
      const pagesTotalCount = Math.ceil(
        data.length / state.pagenation.itemsPerPage
      );
      const pageGroupTotalCount = Math.ceil(
        pagesTotalCount / state.pagenation.pageGroupSize
      );
      const stars = localStorage.getItem('stars') || '';
      const bookmarkedList = data.map(item => {
        const bookmark = stars.includes(item.stockCode);
        return { ...item, bookmark };
      });
      return {
        ...state,
        list: bookmarkedList,
        searchList: bookmarkedList,
        pagenation: {
          ...state.pagenation,
          currentPage: 1,
          pagesTotalCount, // 페이지 총 개수
          pageGroupTotalCount, // 페이지 그룹 총 개수
        },
      };
    },
    [FETCH_STOCK_DETAIL_SUCCESS]: (state, { payload: detail }) => ({
      ...state,
      duration: 'ONEMONTH',
      detail,
    }),
    [FETCH_STOCK_BASICPRICE_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      priceBasic: data,
    }),
  },
  initialState
);

export default reducer;
