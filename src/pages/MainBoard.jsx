import { useCallback, useState } from 'react';
import { Flex, Text, Button, Box, Spacer } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import StockNameList from '../containers/lists/StockNameList';
import { useMount } from '../hooks';
import { changeDuration, fetchStockList } from '../modules/stock';
import StockNameSearchBar from '../components/StockNameSearchBar';
import StockChart from '../components/StockChart';
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup } from "@chakra-ui/react"

const MainBoard = () => {
  const dispatch = useDispatch();
  const stockList = useSelector(_=>_.stock.list);
  useMount(() => {
    if(stockList.length===0){
      dispatch(fetchStockList());
    }
  });
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2 grid grid-rows-2 gap-4 ">
        <StockDetail />
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
  const stockBasicPrice = useSelector(_ => _.stock.priceBasic);
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
      {selectedStock.stockName !== '' && (
        <Flex className="mb-6">
          <Box>
            <StatGroup>
              <Stat>
                <StatLabel>현재주가</StatLabel>
                <StatNumber fontSize="3xl">
                  {stockBasicPrice.CURRENT} 원
                  <StatHelpText>
                    {stockBasicPrice.POSITIVEFLAG === 1 ? 
                      (<StatArrow type="increase" />) :
                      (<StatArrow type="decrease" />)
                    }
                    {stockBasicPrice.UPDOWNRATE} %
                  </StatHelpText>
                </StatNumber>
              </Stat>
            </StatGroup>
          </Box>
          <Spacer />
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
      )}
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