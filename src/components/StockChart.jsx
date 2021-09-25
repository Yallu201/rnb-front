import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const StockChart = () => {
  const duration = useSelector(_ => _.stock.duration);
  const detailData = useSelector(_ => _.stock.detail[duration]);
  const data = {
    labels: detailData.map(o => o['날짜'].split(' ')[0]),
    datasets: [
      {
        label: null,
        data: detailData.map(o => o['종가']),
      },
    ],
  };
  const options = {
    plugins: { legend: { display: false } },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };
  return <Line data={data} options={options} />;
};

export default StockChart;
