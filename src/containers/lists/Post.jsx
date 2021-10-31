import { useSelector} from 'react-redux';
import StockName from '../../components/StockName';

const Post = ({events, match }) => {
  const key = useSelector(_ => _.stock.key);

  return (
    <ul>
      {events
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
