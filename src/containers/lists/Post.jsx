import StockName from '../../components/StockName';

const Post = ({ posts }) => {
  return (
    <ul>
      {posts.map(item => (
        <StockName key={item.stockCode} {...item} />
      ))}
    </ul>
  );
};

export default Post;
