import { createAction, handleActions } from 'redux-actions';
import { closeToast, showToast } from './toast';

// action name
const SET_AUTH = 'auth/SET_AUTH';

// action creator
export const setAuth = createAction(SET_AUTH);

// thunks
export const requestLogin = info => dispatch => {
  const url = 'http://127.0.0.1:8000/api/account/login/';
  async function post() {
    try {
      const response = await postData(url, info);
      const data = await response.json();
      const { user, token, success, message } = data;
      if (!success) throw new Error(message);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('username', user.username);
      dispatch(setAuth(true));
      dispatch(
        showToast({
          title: '로그인 성공',
          description: `${user.username}님 안녕하세요`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          onCloseComplete: () => {
            dispatch(closeToast());
          },
        })
      );
    } catch (e) {
      console.error(e);
      dispatch(
        showToast({
          title: '로그인 실패',
          description: e.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          onCloseComplete: () => {
            dispatch(closeToast());
          },
        })
      );
    }
  }
  post();
};
export const logout = () => dispatch => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('username');
  dispatch(setAuth(false));
  dispatch(
    showToast({
      title: '로그아웃 완료',
      status: 'success',
      duration: 5000,
      isClosable: true,
      onCloseComplete: () => {
        dispatch(closeToast());
      },
    })
  );
};

// initial state
const initialState = {
  isLogin: false,
};
postData();
// reducer
const reducer = handleActions(
  {
    [SET_AUTH]: (state, { payload }) => ({ isLogin: payload }),
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
  }).catch(e => {
    console.error(e);
  });
}
