import { useEffect, useState } from 'react';
import Big from 'big.js';
import dayjs from 'dayjs';

const useFinanceData = (mes, ano) => { // Adicione mes e ano como parâmetros
  const [totalEntrada, setTotalEntrada] = useState(new Big(0));
  const [totalSaida, setTotalSaida] = useState(new Big(0));
  const [balancoMes, setBalancoMes] = useState(new Big(0));
  const [balancoAno, setBalancoAno] = useState(new Big(0));

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
          throw new Error('Erro ao buscar dados financeiros');
        }

        const entradas = await entradaResponse.json();
        const saidas = await saidaResponse.json();

        const totalEntradaCalc = entradas
          .filter(entry => {
            const date = dayjs(entry.Date);
            return date.month() === mes - 1 && date.year() === ano; // Filtra pelo mês e ano passados
          })
          .reduce((acc, entry) => acc.plus(new Big(entry.Value || 0)), new Big(0));

        const totalSaidaCalc = saidas
          .filter(exit => {
            const date = dayjs(exit.Date);
            return date.month() === mes - 1 && date.year() === ano;
          })
          .reduce((acc, exit) => acc.plus(new Big(exit.Value || 0)), new Big(0));

        setTotalEntrada(totalEntradaCalc);
        setTotalSaida(totalSaidaCalc);

        const balancoCalc = totalEntradaCalc.plus(totalSaidaCalc);
        setBalancoMes(balancoCalc);

        const totalEntradaAnoCalc = entradas
          .filter(entry => dayjs(entry.Date).year() === ano)
          .reduce((acc, entry) => acc.plus(new Big(entry.Value || 0)), new Big(0));

        const totalSaidaAnoCalc = saidas
          .filter(exit => dayjs(exit.Date).year() === ano)
          .reduce((acc, exit) => acc.plus(new Big(exit.Value || 0)), new Big(0));

        const balancoAnoCalc = totalEntradaAnoCalc.plus(totalSaidaAnoCalc);
        setBalancoAno(balancoAnoCalc);

      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
      }
    };

    fetchData();
  }, [mes, ano]); // Adicione mes e ano como dependências

  return { totalEntrada, totalSaida, balancoMes, balancoAno };
};

export default useFinanceData;
