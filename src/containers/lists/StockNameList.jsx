import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import Post from './Post';
import Pagination from './Pagination';

const StockNameList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [postsPerPage] = useState(15); //페이지당 포스트 개수
  
  const list = useSelector(_ => _.stock.list);

  useEffect(() => {
    const fetchPosts = () => {
      setLoading(true);
      setPosts(list);
      setLoading(false);
    }
    fetchPosts();
  }, list);

  //현재페이지 가져오기
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
  
  //클릭 이벤트 페이지 바꾸기 
  const paginate = pageNum => setCurrentPage(pageNum);

  return (
    <div>
      <Post posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={list.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default StockNameList;
