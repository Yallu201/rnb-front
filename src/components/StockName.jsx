import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useCallback, memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  selectItem,
  fetchStockDetail,
  fetchStockBasic,
} from '../modules/stock';
import { StarIcon } from '@chakra-ui/icons';
import { useMount } from '../hooks';

const StockName = ({ bookmark = false, stockName, stockCode }) => {
  const isDark = useColorModeValue(false, true);
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(selectItem(stockName));
    dispatch(fetchStockDetail(stockCode));
    dispatch(fetchStockBasic(stockCode));
  }, []);
  const hoverColor = `hover:bg-gray-${isDark ? 500 : 200}`;
  const [isStar, setIsStar] = useState(bookmark);
  useMount(() => {
  });
  const onClickStar = useCallback(
    e => {
      e.stopPropagation(); // 상위 Element로 이벤트 전파 차단( 버블링, 캡쳐링 )
    },
    [isStar]
  );
  return (
    <Box
      className={`p-2 pl-4 mb-1 cursor-pointer rounded ${hoverColor}`}
      onClick={onClick}
    >
      <Flex align="center" justify="space-between">
        <Box>
          <span>{stockCode}</span>
          <span className="pl-5">{stockName}</span>
        </Box>
        <StarIcon
          color={`${isStar ? 'yellow' : 'gray'}.400`}
          onClick={onClickStar}
        />
      </Flex>
    </Box>
  );
};

export default memo(StockName);
