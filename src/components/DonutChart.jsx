import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Title } from 'chart.js';

// Register chart.js components for Doughnut chart
ChartJS.register(ArcElement, Tooltip, Title);

const DonutChartComponent = ({ data }) => {
  const processData = () => {
    const sectorData = {};

    data?.forEach((item) => {
      const sector = item.sector || 'Other';
      const investment = item.investment || 0;

      if (sectorData[sector]) {
        sectorData[sector] += investment;
      } else {
        sectorData[sector] = investment;
      }
    });

    return sectorData;
  };

  const sectorData = processData();
  const totalInvestment = Object.values(sectorData)
    .reduce((sum, val) => sum + val, 0)
    .toFixed(2);

  const chartData = {
    labels: [],
    datasets: [
      {
        label: 'Investment by Sector',
        data: Object.values(sectorData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      centerText: {
        display: true,
        text: totalInvestment,
        unit: 'Crores',
      },
      legrnd: {
        display:false,
        labels: {

        }
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const percentage = ((value / totalInvestment) * 100).toFixed(2);
            const unit = chartOptions.plugins.centerText.unit;

            return `${tooltipItem.label}: ${value} (${percentage} ${unit}%)`;
          },
        },
      },
    },
    cutout: '80%',
  };

  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
      const { width, height, ctx } = chart;
      const centerX = width / 2;
      const centerY = height / 2;

      const pluginOptions = chart.options.plugins.centerText;
      if (pluginOptions && pluginOptions.display) {
        ctx.save();

        // Display total value
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#333';
        ctx.fillText(pluginOptions.text, centerX, centerY - 10); // Slightly above center

        // Display unit ('Crores') below total value
        const unitFontSize = 12; // Adjust font size for unit
        ctx.font = `${unitFontSize}px Arial`; // Set font size
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#010101'; // Adjust color for unit (optional)
        ctx.fillText(pluginOptions.unit, centerX, centerY + 5); // Slightly below center

        ctx.restore();
      }
    },
  };

  // Register the custom plugin
  ChartJS.register(centerTextPlugin);

  return (
    <div className="flex flex-row   justify-center items-center h-[80%] space-x-4 p-4">
  {/* Labels on the left */}
  <div className="flex flex-col  text-sm space-y-2">
    {Object.keys(sectorData).map((label, index) => (
      <div key={index} className="flex  items-center space-x-2">
        <span
          className="w-3 h-3"
          style={{
            backgroundColor: chartData.datasets[0].backgroundColor[index],
          }}
        />
        <span>{label}</span>
      </div>
    ))}
  </div>

  {/* Doughnut Chart */}
  <div className="flex justify-center items-center  h-[250px] w-[250px]">
    <Doughnut data={chartData} options={chartOptions} />
  </div>
</div>

  );
};

export default DonutChartComponent;
