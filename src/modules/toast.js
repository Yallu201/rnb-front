import { createAction, handleActions } from 'redux-actions';

const SHOW_TOAST = 'toast/SHOW_TOAST';
const CLOSE_TOAST = 'toast/CLOSE_TOAST';

export const showToast = createAction(SHOW_TOAST, option => option);
export const closeToast = createAction(CLOSE_TOAST);

const initialState = {
  option: null,
};

const reducer = handleActions(
  {
    [SHOW_TOAST]: (state, { payload: option }) => {
      return {
        option,
      };
    },
    [CLOSE_TOAST]: () => {
      return {
        option: null,
      };
    },
  },
  initialState
);

export default reducer;
