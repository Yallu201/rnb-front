import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useCallback, memo, useState } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { useMount } from '../hooks';
import { toggleBookmark } from '../modules/stock';
import { useDispatch } from 'react-redux';

const StockName = ({
  bookmark = false,
  stockName,
  stockCode,
  onClick = () => {},
}) => {
  const dispatch = useDispatch();
  const isDark = useColorModeValue(false, true);
  const hoverColor = `hover:bg-gray-${isDark ? 500 : 200}`;
  const onClickStar = useCallback(
    e => {
      e.stopPropagation(); // 상위 Element로 이벤트 전파 차단( 버블링, 캡쳐링 )
      const stars = localStorage.getItem('stars') || '';
      const token = `,${stockCode}`;
      const stars_ = stars.replace(token, '');
      localStorage.setItem('stars', stars_.concat(bookmark ? '' : token));
      dispatch(toggleBookmark({ stockCode, bookmark }));
    },
    [bookmark]
  );
  return (
    <Box
      className={`p-2 px-3 mb-1 cursor-pointer rounded ${hoverColor}`}
      onClick={onClick}
    >
      <Flex align="center" justify="space-between">
        <Box>
          <span>{stockCode}</span>
          <span className="pl-5">{stockName}</span>
        </Box>
        <StarIcon
          color={`${bookmark ? 'yellow' : 'gray'}.400`}
          onClick={onClickStar}
        />
      </Flex>
    </Box>
  );
};

export default memo(StockName);
