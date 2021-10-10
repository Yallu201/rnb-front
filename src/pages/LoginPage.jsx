import React from 'react';
import { FormControl, Input, Button } from '@chakra-ui/react';
import { useInputs } from '../hooks';
import { useCallback } from 'react';
const LoginPage = () => {
  const [form, onChange] = useInputs({ userID: '', userPassword: '' });
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log(e);
    },
    [form]
  );
  return (
    <div className="flex justify-center mt-10">
      <div className="w-96 p-8 border-solid border-4 border-light-blue-500 rounded">
        <form onSubmit={onSubmit}>
          <FormControl>
            <Input
              id="userID"
              placeholder="아이디"
              value={form.userID}
              onChange={onChange}
            />
          </FormControl>
          <FormControl className="mt-5">
            <Input
              id="userPassword"
              placeholder="비밀번호"
              value={form.userPassword}
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
