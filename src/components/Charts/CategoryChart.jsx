import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import useGraph from '../../hooks/useGraph';

const CategoryChart = () => {
  const data = useGraph();


  const sortedData = data.sort((a, b) => a.valor - b.valor);

  // Define um valor máximo para o eixo X, se necessário
  const maxValue = Math.max(...sortedData.map(item => item.valor)) || 0;
  const domain = [0, Math.min(maxValue, 1000)]; 

  const renderLabel = (props) => {
    const { x, y, value, width } = props;
    const spaceThreshold = 30; 

  
    if (width < spaceThreshold) {
      return (
        <text x={x} y={y + 13} fill="#000" fontSize={14} textAnchor="start">
          {value}
        </text>
      );
    }
    
    return (
      <text x={x} y={y + 13} fill="#fff" fontWeight={'bold'} fontSize={12} textAnchor="start">
        {value}
      </text>
    );
  };

  return (
    <BarChart
      width={340}
      height={300}
      data={sortedData}
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
        label={renderLabel} 
        minPointSize={20}
      />
    </BarChart>
  );
};

export default CategoryChart;
