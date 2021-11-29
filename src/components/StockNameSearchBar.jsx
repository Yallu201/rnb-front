import { SearchIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeKey } from '../modules/stock';

const StockNameSearchBar = () => {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState('');
  const onChange = useCallback(e => setSearchKey(e.target.value), []);
  const onSearch = useCallback(
    e => {
      if (e.type === 'click') {
        dispatch(changeKey(searchKey));
      }
      if (e.type === 'keydown' && e.code === 'Enter') {
        dispatch(changeKey(e.target.value));
      }
    },
    [searchKey]
  );
  return (
    <InputGroup>
      <Input
        placeholder="종목명 입력"
        className="mb-2"
        value={searchKey}
        onChange={onChange}
        onKeyDown={onSearch}
      />
      <InputRightElement
        children={
          <IconButton
            variant="unstyled"
            isActive={false}
            icon={<SearchIcon />}
          />
        }
        onClick={onSearch}
      />
    </InputGroup>
  );
};

export default StockNameSearchBar;
