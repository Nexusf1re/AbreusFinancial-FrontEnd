import { useEffect, useState } from 'react';
import Big from 'big.js';
import dayjs from 'dayjs';

const useFinanceData = () => {
  const [totalEntrada, setTotalEntrada] = useState(new Big(0));
  const [totalSaida, setTotalSaida] = useState(new Big(0));
  const [balancoMes, setBalancoMes] = useState(new Big(0));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL; 
        const token = localStorage.getItem('token');

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const entradaResponse = await fetch(`${apiUrl}/calc/Inflows`, { headers });
        const saidaResponse = await fetch(`${apiUrl}/calc/OutflowsDebit`, { headers });

        if (!entradaResponse.ok || !saidaResponse.ok) {
          throw new Error('Erro ao buscar dados');
        }

        const entradas = await entradaResponse.json();
        const saídas = await saidaResponse.json();

        // Filtrar entradas e saídas para o mês atual
        const currentMonth = dayjs().month();
        const currentYear = dayjs().year();

        const totalEntradaCalc = entradas
          .filter(entry => {
            const date = dayjs(entry.Date);
            return date.month() === currentMonth && date.year() === currentYear;
          })
          .reduce((acc, entry) => acc.plus(new Big(entry.Value || 0)), new Big(0));

        const totalSaidaCalc = saídas
          .filter(exit => {
            const date = dayjs(exit.Date);
            return date.month() === currentMonth && date.year() === currentYear;
          })
          .reduce((acc, exit) => acc.plus(new Big(exit.Value || 0)), new Big(0));

        // Atualizar estados
        setTotalEntrada(totalEntradaCalc);
        setTotalSaida(totalSaidaCalc);

        // Calcular balanço do mês
        const balancoCalc = totalEntradaCalc.plus(totalSaidaCalc);
        setBalancoMes(balancoCalc);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { totalEntrada, totalSaida, balancoMes };
};

export default useFinanceData;
