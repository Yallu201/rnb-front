import React, { useCallback, useEffect } from 'react';
import { useSelector} from 'react-redux';
import Post from './Post';
import Paging from './Paging';
import { shallowEqual, useDispatch } from 'react-redux';

const StockNameList = ({match, history}) => {
  const dispatch = useDispatch();
  
  const {count, page, items} = useSelector(
    ({event}) => ({
      count: event.count,
      page: event.page,
      items: event.items,
    }),
    shallowEqual
  );

  useEffect((event) => {
    dispatch(event.getEvents());
  }, []);

  const setPage = useCallback(
    (page, event) => {
      dispatch(event.getEvents(page));
    },
    [dispatch],
  );
  
//page : 현재 페이지
//count : 총 item개수
//setPage : 페이지 설정
  return (
    <div>
      <Post events={items} match={match} />
      <Paging page={page} count={count} setPage={setPage}/>
    </div>
  );
};

export default StockNameList;
