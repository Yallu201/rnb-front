import { Stack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StockName from '../../components/StockName';
import {
  fetchStockBasic,
  fetchStockDetail,
  selectItem,
} from '../../modules/stock';

const Post = ({ posts }) => {
  const loading = useSelector(_ => _.loading['stock/FETCH_STOCK_LIST']);
  const dispatch = useDispatch();
  const onClick = useCallback(item => {
    const { stockName, stockCode } = item;
    dispatch(selectItem(stockName));
    dispatch(fetchStockDetail(stockCode));
    dispatch(fetchStockBasic(stockCode));
  }, []);
  return (
    <ul className="flex-grow">
      {loading && <SkeletonArea />}
      {loading ||
        posts.map(item => (
          <StockName
            key={item.stockCode}
            onClick={() => onClick(item)}
            {...item}
          />
        ))}
    </ul>
  );
};

const SkeletonArea = () => {
  return (
    <Stack>
      <Skeleton height="36px" />
      <Skeleton height="36px" />
      <Skeleton height="36px" />
      <Skeleton height="36px" />
      <Skeleton height="36px" />
      <Skeleton height="36px" />
      <Skeleton height="36px" />
      <Skeleton height="36px" />
      <Skeleton height="36px" />
      <Skeleton height="36px" />
      <Skeleton height="36px" />
      <Skeleton height="36px" />
      <Skeleton height="36px" />
      <Skeleton height="36px" />
      <Skeleton height="36px" />
    </Stack>
  );
};
export default Post;
