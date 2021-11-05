import StockName from '../../components/StockName';

const Post = ({posts, loading }) => {

  if (loading) {
    return <h2> Loading ... </h2>;
  }

  return (
    <ul>
      {posts.map(item => (
        <StockName key={item.stockCode} {...item} />
      ))}
    </ul>
  );
};

export default Post;
