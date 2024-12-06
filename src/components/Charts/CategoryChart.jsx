import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import useGraph from '../../hooks/useGraph';
import styles from './CategoryChart.module.css';

ChartJS.register(Tooltip, Legend, ArcElement);

const CategoryChart = ({ mes, ano }) => {
  const [tipoTransacao, setTipoTransacao] = useState('despesas');

  const data = useGraph(mes, ano, tipoTransacao);

  // Ordenando e calculando o total
  const sortedData = [...data].sort((a, b) => a.valor - b.valor);
  
  const chartData = {
    labels: sortedData.map(item => item.nome),
    datasets: [
      {
        label: 'Gastos por Categoria',
        data: sortedData.map(item => {
          const total = sortedData.reduce((acc, curr) => acc + curr.valor, 0);
          const percentage = (item.valor / total) * 100;
          return percentage < 2 ? total * 0.015 : item.valor;
        }),
        backgroundColor: [
          '#67ee4c', '#36A2EB', '#FFCE56', '#804bc0', '#b4fff9', '#FF9F40', '#ff4040', '#e240ff', '#3dfe6a', '#5e5e5e', '#ffed25', '#4a40ff', '#000000'
        ],
        hoverBackgroundColor: [
          '#67ee4c', '#36A2EB', '#FFCE56', '#804bc0', '#b4fff9', '#FF9F40', '#ff4040', '#e240ff', '#3dfe6a', '#5e5e5e', '#ffed25', '#4a40ff', '#000000'
        ],
        borderWidth: 5,
        borderColor: '#ffffff',
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '60%',
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
      title: { display: false },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const originalValue = sortedData[tooltipItem.dataIndex].valor;
            return `${tooltipItem.label}: R$ ${originalValue.toLocaleString()}`;
          },
        },
      },
      datalabels: false,
      legend: { display: false },
    },
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.chartTitle}>
        {tipoTransacao === 'despesas' ? 'Despesas' : 'Receitas'} por Categoria - Mês {mes}/{ano}
      </h2>
      {sortedData.length > 0 ? (
        <>
          <div className={styles.toggleWrapper}>
            <input
              type="checkbox"
              id="toggle"
              className={styles.toggleInput}
              checked={tipoTransacao === 'receitas'}
              onChange={(e) => setTipoTransacao(e.target.checked ? 'receitas' : 'despesas')}
            />
            <label htmlFor="toggle" className={styles.toggleLabel}>
              <span className={styles.toggleText}>
                {tipoTransacao === 'despesas' ? 'Despesas' : 'Receitas'}
              </span>
            </label>
          </div>
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
          <h4>Nenhuma {tipoTransacao === 'despesas' ? 'saída' : 'entrada'} para o período selecionado!</h4>
        </div>
      )}
    </div>
  );
};

export default CategoryChart;
