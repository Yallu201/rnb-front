import { Stack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { useSelector } from 'react-redux';
import StockName from '../../components/StockName';

const Post = ({ posts }) => {
  const loading = useSelector(_ => _.loading['stock/FETCH_STOCK_LIST']);
  return (
    <ul className="flex-grow">
      {loading && <SkeletonArea />}
      {loading ||
        posts.map(item => <StockName key={item.stockCode} {...item} />)}
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
