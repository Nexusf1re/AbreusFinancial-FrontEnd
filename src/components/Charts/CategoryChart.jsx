import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import useGraph from '../../hooks/useGraph';

// Registrar os componentes necessários
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

const CategoryChart = () => {
  const data = useGraph();

  const sortedData = data.sort((a, b) => a.valor - b.valor);

  const chartData = {
    labels: sortedData.map(item => item.nome), // Rótulos para o eixo Y
    datasets: [
      {
        label: 'Valores',
        data: sortedData.map(item => item.valor), // Valores para o eixo X
        backgroundColor: '#8884d8', // Cor das barras
        borderColor: '#6b5b92',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: false,
        min: Math.min(...sortedData.map(item => item.valor)),
        max: 0,
        reverse: true,
        ticks: {
          font: {
            size: 14, // Tamanho da fonte dos rótulos do eixo X
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12, // Tamanho da fonte dos rótulos do eixo Y
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value) => value,
        color: '#fff',
        display: (context) => context.dataset.data[context.dataIndex] !== null,
        font: {
          size: 16, // Tamanho da fonte dos rótulos de dados
        },
      },
      legend: {
        labels: {
          font: {
            size: 14, // Tamanho da fonte da legenda
          },
        },
      },
    },
  };
  

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Bar data={chartData} options={options} style={{ height: 'auto' }} />
    </div>
  );
};

export default CategoryChart;
