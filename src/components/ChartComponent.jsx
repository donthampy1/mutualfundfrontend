import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ChartComponent = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>
  }





  const labels = Object.keys(data).map(key => data[key].date)
  
  const values = Object.values(data).map(item => item.value)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Value Over Time',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.4
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: 'Date',
        },
        ticks: {
          maxTicksLimit: 8
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: false,
          text: 'Value',
        },
        grid: {
          display: true
        }
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  )
}

export default ChartComponent
