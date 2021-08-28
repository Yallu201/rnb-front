import { ListItem, UnorderedList } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import StockName from '../../components/StockName';

const StockNameList = () => {
  const key = useSelector(_ => _.sample.key);
  const list = useSelector(_ => _.sample.list);
  return (
    <div>
      {list
        .filter(({ name }) => name.toLowerCase().includes(key.toLowerCase()))
        .map(stock => (
          <StockName key={stock.name} {...stock} />
        ))}
    </div>
  );
};

export default StockNameList;
