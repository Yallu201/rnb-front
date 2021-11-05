import { Box, useColorModeValue } from '@chakra-ui/react';
import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem, fetchStockDetail, fetchStockBasic } from '../modules/stock';

const StockName = ({ bookmark, stockCode, stockName }) => {
  const isDark = useColorModeValue(false, true);
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(selectItem(stockName));
    dispatch(fetchStockDetail(stockCode));
    dispatch(fetchStockBasic(stockCode));
  }, []);
  const hoverColor = `hover:bg-gray-${isDark ? 500 : 200}`;
  return (
    <Box
      className={`p-2 pl-4 mb-1 cursor-pointer rounded ${hoverColor}`}
      onClick={onClick}
    >
      <Box>
        {stockCode} {stockName}
      </Box>
    </Box>
  );
};

export default memo(StockName);