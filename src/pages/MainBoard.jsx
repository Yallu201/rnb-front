import { SearchIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StockNameList from '../containers/lists/StockNameList';
import { changeKey } from '../modules/sample';
const MainBoard = () => {
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
  const selectedSample = useSelector(_ => _.sample.selected);
  const { name, email, phone } = selectedSample;
  return (
    <div className="">
      <Text fontSize="3xl">{name}</Text>
      <Text>{email}</Text>
    </div>
  );
};
const StackList = () => {
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
    <div className="py-3 px-2 border rounded">
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
      <StockNameList />
    </div>
  );
};
const StackChart = () => {
  return <div className=""></div>;
};

export default MainBoard;
