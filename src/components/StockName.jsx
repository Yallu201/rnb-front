import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem, fetchStockDetail } from '../modules/stock';

const StockName = ({ bookmark, stockCode, stockName }) => {
  const isDark = useColorModeValue(false, true);
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(selectItem(stockName));
    dispatch(fetchStockDetail(stockCode));
  }, []);
  const hoverColor = `hover:bg-gray-${isDark ? 500 : 200}`;
  return (
    <Box
      className={`p-2 pl-4 mb-1 cursor-pointer rounded ${hoverColor}`}
      onClick={onClick}
    >
      <Text isTruncated>
        {stockCode} {stockName}
      </Text>
    </Box>
  );
};

export default memo(StockName);
