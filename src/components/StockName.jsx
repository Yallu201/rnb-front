import { Button, Text } from '@chakra-ui/react';
import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem } from '../modules/stock';

const StockName = ({ bookmark, stockCode, stockName }) => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(selectItem(stockName));
  }, []);
  return (
    <Button
      pl={4}
      variant="unstyled"
      textAlign="left"
      onClick={onClick}
      isFullWidth
    >
      <Text isTruncated>
        {stockCode} {stockName}
      </Text>
    </Button>
  );
};

export default memo(StockName);
