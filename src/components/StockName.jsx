import { Button, Text } from '@chakra-ui/react';
import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem } from '../modules/sample';

const StockName = ({ bookmark, name }) => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(selectItem(name));
  }, []);
  return (
    <Button
      pl={4}
      variant="unstyled"
      textAlign="left"
      onClick={onClick}
      isFullWidth
    >
      <Text isTruncated>{name}</Text>
    </Button>
  );
};

export default memo(StockName);
