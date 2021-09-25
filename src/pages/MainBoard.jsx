import { Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import StockNameList from '../containers/lists/StockNameList';
import { useMount } from '../hooks';
import { fetchStockList } from '../modules/stock';
import StockNameSearchBar from '../components/StockNameSearchBar';
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
  const selectedStock = useSelector(_ => _.stock.selected);
  const { stockCode, stockName } = selectedStock;
  return (
    <div className="">
      <Text fontSize="3xl">{stockCode}</Text>
      <Text>{stockName}</Text>
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
