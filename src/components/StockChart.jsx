import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
const StockChart = () => {
  const isDark = useColorModeValue(false, true);
  const duration = useSelector(_ => _.stock.duration);
  const detailData = useSelector(_ => _.stock.detail[duration]);
  const data = useMemo(() => {
    return {
      labels: detailData.map(o => o['날짜'].split(' ')[0]),
      datasets: [
        {
          label: null,
          data: detailData.map(o => o['종가']),
          borderColor: 'rgb(86, 115, 235)',
          pointRadius: 4,
          pointBackgroundColor: 'rgb(86, 115, 235)',
        },
      ],
    };
  }, [detailData]);
  const options = useMemo(() => {
    const themeColor = isDark
      ? 'rgba(255, 255, 255, 0.92)' // --chakra-colors-whiteAlpha-900
      : 'rgba(0, 0, 0, 0.64)'; // --chakra-colors-blackAlpha-700
    return {
      plugins: { legend: { display: false } },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      scales: {
        x: {
          ticks: {
            color: themeColor,
          },
          grid: {
            borderWidth: 0.125,
            lineWidth: 0.125,
            color: themeColor,
            tickColor: themeColor,
            borderColor: themeColor,
          },
        },
        y: {
          ticks: {
            color: themeColor,
          },
          grid: {
            borderWidth: 0.125,
            lineWidth: 0.125,
            color: themeColor,
            tickColor: themeColor,
            borderColor: themeColor,
          },
        },
      },
    };
  }, [isDark]);
  return <Line data={data} options={options} />;
};

export default StockChart;
