import { useState, useCallback } from 'react';

const useInputs = (initialForm = {}) => {
  const [form, callback] = useState(initialForm);
  const setForm = useCallback(({ target }) => {
    const { id, value } = target;
    callback(state => ({ ...state, [id]: value }));
  }, []);
  return [form, setForm];
};

export default useInputs;
