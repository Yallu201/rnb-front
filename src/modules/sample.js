import { handleActions } from 'redux-actions';
import createRequestThunk from '../lib/createRequestThunk';

// action name
const FETCH_SAMPLE_LIST = 'stock/FETCH_SAMPLE_LIST';
const FETCH_SAMPLE_LIST_SUCCESS = 'stock/FETCH_SAMPLE_LIST_SUCCESS';

// action creator
export const fetchStockList = createRequestThunk(FETCH_SAMPLE_LIST, '');

// initial state
const initialState = {
  list: [],
};

// reducer
const reducer = handleActions(
  {
    [FETCH_SAMPLE_LIST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      list: data,
    }),
  },
  initialState
);

export default reducer;
