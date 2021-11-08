import React, { useCallback, useEffect } from 'react';import { Heading, Button, Text, Flex } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { useSession } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../modules/auth';
import BookmarkDrawing  from '../../components/Drawer/BookmarkDrawing';
import UserInfoDrawing from '../../components/Drawer/UserInfoDrawing';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLogin = useSelector(_ => _.auth.isLogin);
  const [token, username, updateSessionInfo] = useSession();
  
  useEffect(() => {
    updateSessionInfo();
  }, [isLogin]);
  
  const onClickLogin = useCallback(() => history.push('/login'), []);
  const onClickLogout = useCallback(() => {
    dispatch(logout(false));
    history.push('/');
  }, []);

  return (
    <div className="container mx-auto p-4 flex">
      <Heading className="flex-grow" size="4xl">
        <Link to="/">RnB</Link>
      </Heading>
      <div className="flex items-center">
        {isLogin && (
          <Flex align="center">
            <Text mr="2" fontSize="lg">
              {username} 님
            </Text>
            <Button onClick={onClickLogout}>로그아웃</Button>
          </Flex>
        )}
        {!isLogin && <Button onClick={onClickLogin}>로그인</Button>}
        <ColorModeSwitcher />
        <BookmarkDrawing />
        <UserInfoDrawing />
      </div>
    </div>
  );
};

export default Header;
