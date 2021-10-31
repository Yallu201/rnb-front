import React from 'react';
import './Paging.css';
import Pagination from "react-js-pagination";

const Paging = ({page, count, setPage}) => {

    const handlePageChange = (page) => { 
        setPage(page); 
    }; 
    
    return ( 
        <Pagination 
            activePage={page}  //현재 페이지
            itemsCountPerPage={15} //한 페이지당 보여줄 리스트 아이템 개수
            totalItemsCount={count}  //총 아이템 개수
            pageRangeDisplayed={5} //Paginator 내에서 보여줄 페이지의 범위
            prevPageText={"‹"} 
            nextPageText={"›"} 
            onChange={handlePageChange} //페이지가 바뀔 때 핸들링
            /> 
    );

};
export default Paging;