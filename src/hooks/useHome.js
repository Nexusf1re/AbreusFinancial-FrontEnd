import { useEffect, useState } from 'react';
import Big from 'big.js';
import dayjs from 'dayjs';

const useFinanceData = () => {
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

        console.log("Iniciando fetch de entradas e saídas...");
        
        // Fazendo o fetch das entradas e saídas
        const entradaResponse = await fetch(`${apiUrl}/calc/Inflows`, { headers });
        const saidaResponse = await fetch(`${apiUrl}/calc/OutflowsDebit`, { headers });

        if (!entradaResponse.ok) {
          console.error("Erro ao buscar entradas:", entradaResponse.status, entradaResponse.statusText);
          throw new Error('Erro ao buscar dados de entradas');
        }

        if (!saidaResponse.ok) {
          console.error("Erro ao buscar saídas:", saidaResponse.status, saidaResponse.statusText);
          throw new Error('Erro ao buscar dados de saídas');
        }

        const entradas = await entradaResponse.json();
        const saidas = await saidaResponse.json();

        console.log("Dados de entradas recebidos:", entradas);
        console.log("Dados de saídas recebidos:", saidas);

        // Filtrar entradas e saídas para o mês atual
        const currentMonth = dayjs().month();
        const currentYear = dayjs().year();

        const totalEntradaCalc = entradas
          .filter(entry => {
            const date = dayjs(entry.Date);
            return date.month() === currentMonth && date.year() === currentYear;
          })
          .reduce((acc, entry) => acc.plus(new Big(entry.Value || 0)), new Big(0));

        const totalSaidaCalc = saidas
          .filter(exit => {
            const date = dayjs(exit.Date);
            return date.month() === currentMonth && date.year() === currentYear;
          })
          .reduce((acc, exit) => acc.plus(new Big(exit.Value || 0)), new Big(0));

        console.log("Total entrada calculado para o mês:", totalEntradaCalc.toString());
        console.log("Total saída calculado para o mês:", totalSaidaCalc.toString());

        // Atualizar estados do mês
        setTotalEntrada(totalEntradaCalc);
        setTotalSaida(totalSaidaCalc);

        // Calcular balanço do mês
        const balancoCalc = totalEntradaCalc.plus(totalSaidaCalc);
        setBalancoMes(balancoCalc);
        console.log("Balanço calculado para o mês:", balancoCalc.toString());

        // Calcular balanço do ano
        const totalEntradaAnoCalc = entradas
          .filter(entry => {
            const date = dayjs(entry.Date);
            return date.year() === currentYear;
          })
          .reduce((acc, entry) => acc.plus(new Big(entry.Value || 0)), new Big(0));

        const totalSaidaAnoCalc = saidas
          .filter(exit => {
            const date = dayjs(exit.Date);
            return date.year() === currentYear; 
          })
          .reduce((acc, exit) => acc.plus(new Big(exit.Value || 0)), new Big(0));

        console.log("Total entrada calculado para o ano:", totalEntradaAnoCalc.toString());
        console.log("Total saída calculado para o ano:", totalSaidaAnoCalc.toString());

        // Calcular balanço do ano
        const balancoAnoCalc = totalEntradaAnoCalc.plus(totalSaidaAnoCalc);
        setBalancoAno(balancoAnoCalc);
        console.log("Balanço calculado para o ano:", balancoAnoCalc.toString());

      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
      }
    };

    fetchData();
  }, []);

  return { totalEntrada, totalSaida, balancoMes, balancoAno };
};

export default useFinanceData;
