import { createAction, handleActions } from 'redux-actions';

// action name
const SET_USER_STOCK_INFO = 'user/SET_USER_STOCK_INFO';

// action creator
export const setUserStockInfo = createAction(SET_USER_STOCK_INFO);

// thunks
export const getUserStockInfo = session => dispatch => {
  const { token, username } = session;
  async function post() {
    try {
      const url = `http://127.0.0.1:8000/api/userstockinfo/?username=${username}`;
      const jwt = `JWT ${token}`;
      const data = await getData(url, jwt);
      dispatch({ type: SET_USER_STOCK_INFO, payload: data });
    } catch (e) {
      console.error(e);
    }
  }
  post();
};

export const postUserStockInfo = bookmarkArray => dispatch => {
  const token = sessionStorage.getItem('token');
  async function post() {
    try {
      const url = `http://127.0.0.1:8000/api/userstockinfo/`;
      const jwt = `JWT ${token}`;
      const data = { UserStockInfo: bookmarkArray };
      await postData(url, jwt, data);
    } catch (e) {
      console.error(e);
    }
  }
  post();
};

// initial state
const initialState = {
  userStockInfo: [],
};
// reducer
const reducer = handleActions(
  {
    [SET_USER_STOCK_INFO]: (state, { payload }) => ({ userStockInfo: payload }),
  },
  initialState
);

export default reducer;

export function getData(url = '', Authorization = '') {
  // Default options are marked with *
  return fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      Authorization,
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    credentials: 'same-origin',
  }).catch(e => {
    console.error(e);
  });
}

export function postData(url = '', Authorization = '', data = null) {
  // Default options are marked with *
  return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      Authorization,
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    credentials: 'same-origin',
    body: JSON.stringify(data),
  }).catch(e => {
    console.error(e);
  });
}
