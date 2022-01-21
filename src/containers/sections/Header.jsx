import React, { useCallback, useEffect } from 'react';
import { Heading, Button, Text, Flex } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { useSession } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkDrawing from '../../components/Drawer/BookmarkDrawing';
import UserInfoDrawing from '../../components/Drawer/UserInfoDrawing';
import LogoutModal from '../../components/Modal/LogoutModal';
import { getUserStockInfo } from '../../modules/user';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLogin = useSelector(_ => _.auth.isLogin);
  const [token, username, updateSessionInfo] = useSession();

  useEffect(() => {
    updateSessionInfo();
  }, [isLogin]);

  useEffect(() => {
    dispatch(getUserStockInfo({ token, username }));
  }, [username]);

  const onClickLogin = useCallback(() => history.push('/login'), []);

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
            <LogoutModal />
          </Flex>
        )}
        {!isLogin && <Button onClick={onClickLogin}>로그인</Button>}
        <ColorModeSwitcher />
        <BookmarkDrawing isLogin={isLogin} />
        <UserInfoDrawing isLogin={isLogin} />
      </div>
    </div>
  );
};

export default Header;
