import React, { useCallback, useEffect, useState } from 'react';
import './Paging.css';
import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../modules/stock';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(_ => _.stock.pagenation.currentPage);
  const pagesTotalCount = useSelector(_ => _.stock.pagenation.pagesTotalCount);
  const pageGroupSize = useSelector(_ => _.stock.pagenation.pageGroupSize);
  const pageGroupTotalCount = useSelector(
    _ => _.stock.pagenation.pageGroupTotalCount
  );
  const [pageNumbers, setPageNumbers] = useState([]);
  useEffect(() => {
    let startPage = 1;
    for (let i = 1; i <= pageGroupTotalCount; i++) {
      if (currentPage <= i * pageGroupSize) break;
      startPage += pageGroupSize;
    }
    const endPage = Math.min(startPage + pageGroupSize - 1, pagesTotalCount);
    if (startPage > endPage) return;
    const nextNumbers = new Array(endPage - startPage + 1)
      .fill(startPage)
      .map((_, i) => _ + i);
    setPageNumbers(nextNumbers);
  }, [currentPage, pagesTotalCount, pageGroupSize, pageGroupTotalCount]);

  const onClickButton = useCallback(pageNumber => {
    dispatch(changePage(pageNumber));
  });
  const onClickPrevPage = useCallback(() => {
    dispatch(changePage(currentPage - 1));
  }, [currentPage]);
  const onClickNextPage = useCallback(() => {
    dispatch(changePage(currentPage + 1));
  }, [currentPage]);
  return (
    <nav className="pagenation-wrap">
      <IconButton
        onClick={onClickPrevPage}
        icon={<ChevronLeftIcon w={8} h={8} />}
      />
      {pageNumbers.map(num => (
        <IconButton
          key={`STOCK_LIST_PAGE_BUTTON_${num}`}
          icon={<span>{num}</span>}
          boxShadow={currentPage === num ? 'outline' : null}
          onClick={() => onClickButton(num)}
        />
      ))}
      <IconButton
        onClick={onClickNextPage}
        icon={<ChevronRightIcon w={8} h={8} />}
      />
    </nav>
  );
};
export default Pagination;
