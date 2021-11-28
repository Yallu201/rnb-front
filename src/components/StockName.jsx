import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useCallback, memo, useState } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { useMount } from '../hooks';

const StockName = ({ bookmark = false, stockName, stockCode, onClick }) => {
  const isDark = useColorModeValue(false, true);
  const hoverColor = `hover:bg-gray-${isDark ? 500 : 200}`;
  const [isStar, setIsStar] = useState(bookmark);
  useMount(() => {
    const stars = localStorage.getItem('stars') || ''; // 값이 없으면 빈 문자열로 초기화
    const token = `,${stockCode}`; // ',' 쉼표로 구분자 사용
    // #1 - bookmark 값이 서버에서 전달되었을경우
    if (isStar) {
      const stars_ = stars.replace(token, '');
      localStorage.setItem('stars', stars_.concat(token));
      return;
    }
    // #2 - localStorage에 stockCode가 저장된 경우
    if (stars.includes(token)) {
      setIsStar(true);
    }
  });
  const onClickStar = useCallback(
    e => {
      e.stopPropagation(); // 상위 Element로 이벤트 전파 차단( 버블링, 캡쳐링 )
      const stars = localStorage.getItem('stars') || '';
      const token = `,${stockCode}`;
      const stars_ = stars.replace(token, '');
      localStorage.setItem('stars', stars_.concat(isStar ? '' : token));
      setIsStar(!isStar);
    },
    [isStar]
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
          color={`${isStar ? 'yellow' : 'gray'}.400`}
          onClick={onClickStar}
        />
      </Flex>
    </Box>
  );
};

export default memo(StockName);
