import React from 'react';
import { FormControl, Input, Button } from '@chakra-ui/react';
import { useInputs } from '../hooks';
import { useCallback, useEffect } from 'react';
import { requestLogin } from '../modules/auth';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NotifyToast from './Toast/NotifyToast';

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector(_ => _.auth.isLogin);
  useEffect(() => {
    if (isLogin) {
      NotifyToast(
        'Login Success',
        '성공적으로 로그인 되었습니다.',
        'success'
      ) 
      history.push('/');
    }
  }, [isLogin]);
  const [form, onChange] = useInputs({ username: '', password: '' });
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(requestLogin(form));
    },
    [form]
  );

  return (
    <div className="flex justify-center mt-10">
      <div className="w-96 p-8 border-solid border-4 border-light-blue-500 rounded">
        <form onSubmit={onSubmit}>
          <FormControl>
            <Input
              id="username"
              placeholder="아이디"
              value={form.username}
              onChange={onChange}
            />
          </FormControl>
          <FormControl className="mt-5">
            <Input
              id="password"
              type="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={onChange}
            />
          </FormControl>
          <Button width="100%" size="lg" className="mt-8" type="submit">
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
