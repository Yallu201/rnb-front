import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useCallback, memo } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { toggleBookmark } from '../modules/stock';
import { useDispatch } from 'react-redux';
import {
  fetchStockBasic,
  fetchStockDetail,
  selectItem,
} from '../modules/stock';
import { deleteUserStockInfo, postUserStockInfo } from '../modules/user';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const StockName = ({ bookmark, stockName, stockCode }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector(_ => _.auth.isLogin);
  const isDark = useColorModeValue(false, true);
  const hoverColor = `hover:bg-gray-${isDark ? 500 : 200}`;
  const onClick = useCallback(() => {
    dispatch(selectItem(stockName));
    dispatch(fetchStockDetail(stockCode));
    dispatch(fetchStockBasic(stockCode));
  }, []);
  const onClickStar = useCallback(
    e => {
      e.stopPropagation(); // 상위 Element로 이벤트 전파 차단( 버블링, 캡쳐링 )
      if (!isLogin) {
        alert('로그인 후 사용 가능합니다.');
        history.push('/login');
      }
      const stars = localStorage.getItem('stars') || '';
      const token = `,${stockCode}`;
      const stars_ = stars.replace(token, '');
      localStorage.setItem('stars', stars_.concat(bookmark ? '' : token));
      dispatch(toggleBookmark({ stockCode, bookmark }));
      if (bookmark) {
        dispatch(deleteUserStockInfo({ stockCode }));
      } else {
        dispatch(postUserStockInfo([{ stockCode }]));
      }
    },
    [isLogin, bookmark]
  );
  return (
    <Box
      className={`p-2 px-3 mb-1 cursor-pointer rounded ${hoverColor}`}
      onClick={onClick}
    >
      <Flex align="center" justify="space-between">
        <Box>
          <span>{stockCode}</span>
          <span className="pl-5">{stockName}</span>
        </Box>
        <StarIcon
          color={`${bookmark ? 'yellow' : 'gray'}.400`}
          onClick={onClickStar}
        />
      </Flex>
    </Box>
  );
};

export default memo(StockName);
