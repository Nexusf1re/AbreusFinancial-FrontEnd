import { useEffect, useState } from 'react';
import Big from 'big.js';
import dayjs from 'dayjs';

const useGraph = (mes, ano, tipoTransacao) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const token = localStorage.getItem('token');
        const endpoint = tipoTransacao === 'despesas' ? 'Outflows' : 'Inflows';

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`${apiUrl}/calc/${endpoint}`, { headers });

        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }

        const transactions = await response.json();

        // Filtrar pelos mês e ano selecionados
        const monthlyData = transactions
          .filter(transaction => {
            const date = dayjs(transaction.Date);
            return date.month() + 1 === parseInt(mes) && date.year() === parseInt(ano); // Ajusta para o formato do mês (1-12)
          })
          .reduce((acc, transaction) => {
            const category = transaction.Category;
            const value = new Big(transaction.Value || 0);

            if (!acc[category]) {
              acc[category] = value;
            } else {
              acc[category] = acc[category].plus(value);
            }

            return acc;
          }, {});

        // Converter o objeto em um array para o gráfico
        const chartData = Object.keys(monthlyData).map(category => ({
          nome: category,
          valor: monthlyData[category].toNumber(), // Converte para número padrão
        }));

        setData(chartData);
      } catch (error) {
        console.error('Erro ao buscar dados de gráfico:', error);
      }
    };

    fetchData();
  }, [mes, ano, tipoTransacao]); // Atualizar os dados sempre que o mês, o ano ou o tipo de transação mudar

  return data;
};

export default useGraph;
