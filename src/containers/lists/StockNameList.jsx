import React, { useState, useCallback, useEffect } from 'react';
import { useSelector} from 'react-redux';
import Post from './Post';
import Pagination from './Pagination';

const StockNameList = () => {
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [postPerPage] = useState(15); //페이지당 포스트 개수
  const searchList = useSelector(_ => _.stock.searchList);
  const [posts, setPosts] = useState(searchList);  


  useEffect(() => {
    setCurrentPage(1);
  }, [searchList])

  useEffect(() => {
    //현재페이지 가져오기
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = searchList.slice(indexOfFirstPost, indexOfLastPost);
    setPosts(currentPosts);
  }, [currentPage, postPerPage, searchList])
  
  
  //클릭 이벤트 페이지 바꾸기 
  const paginate = useCallback(pageNum => setCurrentPage(pageNum), [])

  return (
    <div>
      <Post posts={posts} />
      <Pagination
        postPerPage={postPerPage}
        totalPosts={searchList.length}
        paginate={paginate}
      />
    </div>
  );
};

export default StockNameList;
