import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import useGraph from '../../hooks/useGraph';

const CategoryChart = () => {
  const data = useGraph();

  // Define um valor máximo para o eixo X, se necessário
  const maxValue = Math.max(...data.map(item => item.value)) || 0; // Valor máximo dos dados
  const domain = [0, Math.min(maxValue, 1000)]; // Define um limite superior, ajuste conforme necessário

  return (

    
    <BarChart
      width={320} // Aumente a largura conforme necessário
      height={245}
      data={data}
      layout="vertical"
    >
      <XAxis type="number" domain={domain} reversed={true} />
      <YAxis 
        type="category" 
        dataKey="nome"  
        tick={{ fontSize: 12 }} 
      />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="0 1" />
      <Bar dataKey="valor" fill="#8884d8" label={{ position: 'inside' }} />
    </BarChart>
  );
};

export default CategoryChart;
