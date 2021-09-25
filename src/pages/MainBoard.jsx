import { useCallback } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import StockNameList from '../containers/lists/StockNameList';
import { useMount } from '../hooks';
import { changeDuration, fetchStockList } from '../modules/stock';
import StockNameSearchBar from '../components/StockNameSearchBar';
import StockChart from '../components/StockChart';
const MainBoard = () => {
  const dispatch = useDispatch();
  useMount(() => {
    dispatch(fetchStockList('KOSPI'));
  });
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2 grid grid-rows-2 gap-4 ">
        <StackDetail />
        <StackChart />
      </div>
      <div className="col-span-1 h-full">
        <StackList />
      </div>
    </div>
  );
};
const StackDetail = () => {
  const dispatch = useDispatch();
  const duration = useSelector(_ => _.stock.duration);
  const selectedStock = useSelector(_ => _.stock.selected);
  const { stockCode, stockName } = selectedStock;
  const onChangeDuration = useCallback(duration =>
    dispatch(changeDuration(duration))
  );
  return (
    <div className="">
      <Flex alignItems="center" className="mb-4">
        <Text fontSize="3xl">{stockName}</Text>
        <Text fontSize="lg" color="gray.500" className="ml-2">
          {stockCode}
        </Text>
      </Flex>
      <Flex className="mb-6">
        <Button
          className="mr-1"
          size="sm"
          variant={duration === 'ONEMONTH' ? 'solid' : 'ghost'}
          onClick={() => onChangeDuration('ONEMONTH')}
        >
          ONEMONTH
        </Button>
        <Button
          className="mr-1"
          size="sm"
          variant={duration === 'THREEMONTH' ? 'solid' : 'ghost'}
          onClick={() => onChangeDuration('THREEMONTH')}
        >
          THREEMONTH
        </Button>
        <Button
          className="mr-1"
          size="sm"
          variant={duration === 'SIXMONTH' ? 'solid' : 'ghost'}
          onClick={() => onChangeDuration('SIXMONTH')}
        >
          SIXMONTH
        </Button>
        <Button
          className="mr-1"
          size="sm"
          variant={duration === 'ONEYEAR' ? 'solid' : 'ghost'}
          onClick={() => onChangeDuration('ONEYEAR')}
        >
          ONEYEAR
        </Button>
        <Button
          className="mr-1"
          size="sm"
          variant={duration === 'TENYEARS' ? 'solid' : 'ghost'}
          onClick={() => onChangeDuration('TENYEARS')}
        >
          TENYEARS
        </Button>
      </Flex>
      <StockChart />
    </div>
  );
};
const StackList = () => {
  return (
    <div className="py-3 px-2 border rounded">
      <StockNameSearchBar />
      <StockNameList />
    </div>
  );
};
const StackChart = () => {
  return <div className=""></div>;
};

export default MainBoard;
