import { useSelector } from 'react-redux';
import StockName from '../../components/StockName';

const StockNameList = () => {
  const key = useSelector(_ => _.stock.key);
  const list = useSelector(_ => _.stock.list);
  return (
    <div>
      {list
        .filter(({ stockName }) =>
          stockName.toLowerCase().includes(key.toLowerCase())
        )
        .map(item => (
          <StockName key={item.stockCode} {...item} />
        ))}
    </div>
  );
};

export default StockNameList;
