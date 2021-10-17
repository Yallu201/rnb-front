import { useCallback, useState } from 'react';

const useSession = () => {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [username, setUserName] = useState(sessionStorage.getItem('username'));
  const updateSessionInfo = useCallback(() => {
    setToken(sessionStorage.getItem('token'));
    setUserName(sessionStorage.getItem('username'));
  }, []);
  return [token, username, updateSessionInfo];
};

export default useSession;
