import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import useGraph from '../../hooks/useGraph';
import styles from './CategoryChart.module.css';

// Registrar os componentes necessários
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const CategoryChart = () => {
  const data = useGraph();

  const chartData = {
    labels: data.map(item => item.nome), // Rótulos para o gráfico
    datasets: [
      {
        label: 'Gastos por Categoria',
        data: data.map(item => item.valor), // Valores para cada categoria
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ], // Cores para cada segmento
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        bottom: 30,
      },
    },
    animations: {
      arc: {
        type: 'number',
        duration: 2000,
        easing: 'easeInOutCubic',
        from: 0,
        to: 1,
      },
      opacity: {
        duration: 2000,
        easing: 'easeInOutCubic',
        from: 0,
        to: 1,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Gastos por Categoria Mês Atual',
        font: {
          size: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: ${value.toLocaleString()}`;
        },
        color: 'black',
        font: {
          size: "11em",
        },
        padding: 2,
        borderColor: 'black',
        borderWidth: 1,
        display: true,
        offset: 10,
        borderRadius: 4,
      },
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      {data.length > 0 ? (
        <Doughnut data={chartData} options={options} className={styles.canvas} />
      ) : (
        <div className={styles.emptyMessage}>
          <h4>Nenhuma saída este mês!</h4>
        </div>
      )}
    </div>
  );
};

export default CategoryChart;
