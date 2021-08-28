import { createAction, handleActions } from 'redux-actions';
import fetchSample from '../api/fetchSample';
import createRequestThunk from '../lib/createRequestThunk';
import sampleData from './sampleData';
// action name
const CHANGE_KEY = 'sample/CHANGE_KEY';
const SELECT_ITEM = 'sample/SELECT_ITEM';
const FETCH_SAMPLE_LIST = 'sample/FETCH_SAMPLE_LIST';
const FETCH_SAMPLE_LIST_SUCCESS = 'sample/FETCH_SAMPLE_LIST_SUCCESS';

// action creator
export const changeKey = createAction(CHANGE_KEY, key => key);
export const selectItem = createAction(SELECT_ITEM, name => name);
export const fetchSampleList = createRequestThunk(
  FETCH_SAMPLE_LIST,
  fetchSample
);

// initial state
const initialState = {
  key: '',
  list: sampleData,
  selected: sampleData[0],
};

// reducer
const reducer = handleActions(
  {
    [CHANGE_KEY]: (state, { payload: key }) => ({ ...state, key }),
    [SELECT_ITEM]: (state, { payload: name }) => ({
      ...state,
      selected: state.list.find(item => item.name === name),
    }),
    [FETCH_SAMPLE_LIST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      list: data,
    }),
  },
  initialState
);

export default reducer;
