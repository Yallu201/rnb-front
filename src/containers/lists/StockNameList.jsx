import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StockName from '../../components/StockName';
import ReactPaginate from 'react-paginate';
import './Paging.css';

const StockNameList = () => {
  const items = useSelector(_ => _.stock.list);
  const key = useSelector(_ => _.stock.key);

  const itemsPerPage = 15;
  
  const Items=({ currentItems }) =>{
    return (
      <>
        <ul>
        {currentItems && currentItems
        .filter(({ stockName }) =>
          stockName.toLowerCase().includes(key.toLowerCase())
        )
        .map(item => (
          <StockName key={item.stockCode} {...item} />
        ))}
        </ul>
      </>
    );
  };
  
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(5);
  const [itemOffset, setItemOffset] = useState(15);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  /**
   * Pagination Options
   * pageCount - 총 게시글의 개수(총 row 수)
   * pageRangeDisplayed - 한 페이지에 표시할 게시글의 수
   * marginPagesDisplayed - 여백에 표시할 페이지 수
   * breakLabel - 페이지 수가 많을 경우 건너뛸 수 있는 버튼
   * previousLabel - 이전페이지로 가는 버튼의 value값
   * nextLabel - 다음페이지로 가는 버튼의 value값
   * onPageChange - 페이지 버튼을 눌렀을 때 일어나는 이벤트 이를 이용해 페이지 증감
   * containerClassName - css적용할 때 사용
   * activeClassName - 현재 페이지에 css처리해주기 위한 클래스명
   * previousClassName/NextClassName - 이전/다음버튼 css적용위한 클래스명
   */
  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate 
        pageCount={pageCount} 
        pageRangeDisplayed={10} 
        marginPagesDisplayed={0}
        breakLabel=""
        previousLabel={"<"}
        nextLabel={">"}
        onPageChange={handlePageClick}
        containerClassName={"pagination ul"}
        activeClassName={"currentPage"}
        previousClassName={"pageLabel btn"}
        nextClassName={"pageLabel btn"}
      />  
    </>
  );
};

export default StockNameList;
