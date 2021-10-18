import { useSelector} from 'react-redux';
import StockName from '../../components/StockName';

const Post = ({posts, loading }) => {
  const key = useSelector(_ => _.stock.key);

  if (loading) {
    return <h2> Loading ... </h2>;
  }

  return (
    <ul>
      {posts
        .filter(({ stockName }) =>
          stockName.toLowerCase().includes(key.toLowerCase())
        )
        .map(item => (
          <StockName key={item.stockCode} {...item} />
        ))}
    </ul>
  );
};

export default Post;
