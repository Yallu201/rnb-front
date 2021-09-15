import { startLoading, finishLoading } from '../modules/loading.js';

function createRequestThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return params => async dispatch => {
    dispatch({ type });
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      const jsonString = await response.json();
      const payload = JSON.parse(jsonString);
      console.log(response);
      console.log(payload);
      dispatch({
        type: SUCCESS,
        payload,
      });
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      });
      throw e;
    } finally {
      dispatch(finishLoading(type));
    }
  };
}
export default createRequestThunk;
