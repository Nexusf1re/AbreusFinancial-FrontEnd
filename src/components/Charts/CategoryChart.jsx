import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import useGraph from '../../hooks/useGraph';

const CategoryChart = () => {
  const data = useGraph();

  // Ordena os dados pelo valor em ordem decrescente
  const sortedData = data.sort((a, b) => a.valor - b.valor);

  // Define um valor máximo para o eixo X, se necessário
  const maxValue = Math.max(...sortedData.map(item => item.valor)) || 0; // Valor máximo dos dados
  const domain = [0, Math.min(maxValue, 1000)]; // Define um limite superior, ajuste conforme necessário

  const renderLabel = (props) => {
    const { x, y, value, width } = props;
    const spaceThreshold = 30; // Defina um limite para o espaço

    // Verifica se há espaço suficiente
    if (width < spaceThreshold) {
      return (
        <text x={x} y={y + 13} fill="#000" fontSize={14} textAnchor="start">
          {value}
        </text>
      );
    }
    
    // Se houver espaço suficiente, coloca o rótulo dentro
    return (
      <text x={x} y={y + 13} fill="#fff" fontWeight={'bold'} fontSize={12} textAnchor="start">
        {value}
      </text>
    );
  };

  return (
    <BarChart
      width={240}
      height={300}
      data={sortedData} // Usar dados ordenados
      layout="vertical"
      padding={{left: 50}}

    >
      <XAxis type="number" domain={domain} reversed={true} />
      <YAxis 
        type="category" 
        dataKey="nome"  
        tick={{ fontSize: 10 }} 
        padding={{left: 50}}
      />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="0 1" />
      <Bar 
        dataKey="valor" 
        fill="#8884d8" 
        label={renderLabel} // Usa a função de rótulo personalizada
        minPointSize={20}
      />
    </BarChart>
  );
};

export default CategoryChart;
