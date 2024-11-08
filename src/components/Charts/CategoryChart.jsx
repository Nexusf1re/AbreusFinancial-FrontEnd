import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import useGraph from '../../hooks/useGraph';
import styles from './CategoryChart.module.css';
import { getMesAtual } from '../../utils/greetings.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const CategoryChart = () => {
  const data = useGraph();

  const sortedData = [...data].sort((a, b) => a.valor - b.valor);

  const chartData = {
    labels: sortedData.map(item => item.nome),
    datasets: [
      {
        label: 'Gastos por Categoria',
        data: sortedData.map(item => item.valor),
        backgroundColor: [
          '#67ee4c', '#36A2EB', '#FFCE56', '#804bc0', '#ff9666', '#FF9F40', '#ff4040', '#e240ff'
        ],
        hoverBackgroundColor: [
          '#67ee4c', '#36A2EB', '#FFCE56', '#804bc0', '#ff9666', '#FF9F40', '#ff4040', '#e240ff'
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: { bottom: 30 },
    },
    animations: {
      arc: {
        type: 'number',
        duration: 4000,
        easing: 'easeInOutCubic',
        from: 0,
        to: 2,
      },
      opacity: {
        duration: 4000,
        easing: 'easeInOutCubic',
        from: 0,
        to: 2,
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Gastos por Categoria Mês ${getMesAtual()}`,
        font: { size: 22 },
        padding: { bottom: 0 },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: R$ ${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
      datalabels: false,
      legend: { display: false },
    },
  };

  return (
    <div className={styles.container}>
      {sortedData.length > 0 ? (
        <>
          <Doughnut data={chartData} options={options} className={styles.canvas} />
          <div className={styles.categoryList}>
            {sortedData.map((item, index) => (
              <div key={index} className={styles.categoryItem}>
                <div
                  className={styles.colorBox}
                  style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                ></div>
                <span className={styles.categoryLabel}>{item.nome}</span>
                <span className={styles.categoryValue}>: R${item.valor.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.emptyMessage}>
          <h4>Nenhuma saída este mês!</h4>
        </div>
      )}
    </div>
  );
};

export default CategoryChart;
