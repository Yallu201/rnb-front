import React from 'react';
import { FormControl, Input, Button, Heading, Center } from '@chakra-ui/react';
import { useInputs } from '../hooks';
import { useCallback, useEffect } from 'react';
import { requestLogin } from '../modules/auth';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RegisterAccountDrawer from '../components/Drawer/RegisterAccountDrawer';
const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector(_ => _.auth.isLogin);
  useEffect(() => {
    if (isLogin) history.push('/');
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
    <div className="flex h-screen justify-center">
      <div className="flex flex-col justify-center">
        <div className="w-96 p-8 border-solid border-4 border-light-blue-500 rounded">
          <div className="flex flex-col">
            <Center className="pb-10">
              <Heading className="align" size="4xl">
                <Link to="/">RnB</Link>
              </Heading>
            </Center>
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
              <RegisterAccountDrawer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
