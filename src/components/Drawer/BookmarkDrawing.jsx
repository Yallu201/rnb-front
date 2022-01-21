import React, { useEffect, useState } from 'react';
import {
  IconButton,
  useDisclosure,
  Stack,
  Box,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  // DrawerFooter, 사용하지 않은 Component
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import StockName from '../StockName';
import { useHistory } from 'react-router';

const BookmarkDrawing = ({ isLogin }) => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const stocks = useSelector(_ => _.stock.list);
  const [starList, setStarList] = useState([]);
  useEffect(() => {
    const nextStarList = stocks.filter(item => item.bookmark);
    setStarList(nextStarList);
  }, [stocks]);

  const onClick = () => {
    if (!isLogin) {
      alert('로그인 후 이용 가능합니다.');
      history.push('/login');
      return;
    }
    onOpen();
  };

  return (
    <>
      <IconButton
        size="md"
        variant="ghost"
        icon={<StarIcon />}
        onClick={onClick}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size={'xs'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <StarIcon />
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="stockName">관심종목</FormLabel>
                <Input
                  ref={firstField}
                  id="stockName"
                  placeholder="즐겨찾기 해둔 종목을 검색하세요!"
                />
              </Box>
              {starList.map(item => {
                return (
                  <StockName
                    key={`drawer_star_item${item.stockCode}`}
                    {...item}
                  />
                );
              })}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BookmarkDrawing;
