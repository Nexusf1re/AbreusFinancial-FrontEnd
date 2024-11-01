import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import useGraph from '../../hooks/useGraph';

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
        bottom: 30, // Ajuste o valor para o padding inferior desejado
      },
    },
    animations: {
      // Adiciona animação de entrada
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
        text: 'Gastos por Categoria',
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
        anchor: 'end', // Para ancorar os rótulos no final
        align: 'end',  // Alinha os rótulos ao final
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: ${value.toLocaleString()}`; // Exibe o rótulo e o valor
        },
        color: 'black', // Cor do texto dos rótulos
        font: {
          size: 10,
        },
        padding: 2, // Espaçamento
        borderColor: 'black', // Cor da linha de conexão
        borderWidth: 1,
        display: true,
        offset: 10, // Distância do rótulo até a linha de referência
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
    <div style={{ width: '100%', height: '500px' }}>
      {data.length > 0 ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <h4 style={{ color: 'gray' }}>Nenhuma saída este mês!</h4>
        </div>
      )}
    </div>
  );
};

export default CategoryChart;
