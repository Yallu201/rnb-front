import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';

const StockNameList = () => {
  const itemsPerPage = useSelector(_ => _.stock.pagenation.itemsPerPage); //페이지당 포스트 개수
  const searchList = useSelector(_ => _.stock.searchList);
  const currentPage = useSelector(_ => _.stock.pagenation.currentPage);
  const [currentPosts, setCurrentPosts] = useState(searchList);

  useEffect(() => {
    //현재페이지 가져오기
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts_ = searchList.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(currentPosts_);
  }, [searchList, currentPage, itemsPerPage]);

  return <Post posts={currentPosts} />;
};

export default StockNameList;
