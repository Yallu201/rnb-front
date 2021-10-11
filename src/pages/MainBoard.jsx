import { useCallback, useState } from 'react';
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
        <StockDetail />
        <StockChart />
      </div>
      <div className="col-span-1 h-full">
        <StockList />
      </div>
    </div>
  );
};
const StockDetail = () => {
  const dispatch = useDispatch();
  const [durations] = useState([
    'ONEMONTH',
    'THREEMONTH',
    'SIXMONTH',
    'ONEYEAR',
    'TENYEARS',
  ]);
  const duration = useSelector(_ => _.stock.duration);
  const selectedStock = useSelector(_ => _.stock.selected);
  const { stockCode, stockName } = selectedStock;
  const onChangeDuration = useCallback(e =>
    dispatch(changeDuration(e.target.id))
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
        {durations.map(d => (
          <Button
            key={`duration_button_${d}`}
            id={d}
            className="mr-1"
            size="sm"
            variant={duration === d ? 'solid' : 'ghost'}
            onClick={onChangeDuration}
          >
            {d}
          </Button>
        ))}
      </Flex>
      <StockChart />
    </div>
  );
};
const StockList = () => {
  return (
    <div className="py-3 px-2 border rounded">
      <StockNameSearchBar />
      <StockNameList />
    </div>
  );
};

export default MainBoard;
