import { createAction, handleActions } from 'redux-actions';
import createRequestThunk from '../lib/createRequestThunk';

// action name
const SET_AUTH = 'auth/SET_AUTH';

// action creator
export const changeKey = createAction(SET_AUTH, key => key);

// thunks
export const requestLogin = info => dispatch => {
  const url = 'http://127.0.0.1:8000/api/account/';
  async function post() {
    try {
      const response = await postData(url, info);
      const { accessToken } = response.data;
    } catch (e) {
      console.log(e);
    }
  }
  post();
};

// initial state
const initialState = {};
postData();
// reducer
const reducer = handleActions(
  {
    [SET_AUTH]: (state, { payload: key }) => ({ ...state, key }),
  },
  initialState
);

export default reducer;

function postData(url = '', data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    credentials: 'same-origin',
  }).then(response => {
    console.log(response);
    response.json();
  }); // parses JSON response into native JavaScript objects
}
