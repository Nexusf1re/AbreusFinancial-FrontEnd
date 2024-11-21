import { useEffect, useState, useCallback } from 'react';
import Big from 'big.js';
import dayjs from 'dayjs';

const useFinanceData = (mes, ano) => {
  const [totalEntrada, setTotalEntrada] = useState(new Big(0));
  const [totalSaida, setTotalSaida] = useState(new Big(0));
  const [balancoMes, setBalancoMes] = useState(new Big(0));
  const [balancoAno, setBalancoAno] = useState(new Big(0));

  const fetchData = useCallback(async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const [entradaResponse, saidaResponse] = await Promise.all([
        fetch(`${apiUrl}/calc/Inflows`, { headers }),
        fetch(`${apiUrl}/calc/OutflowsDebit`, { headers }),
      ]);

      if (!entradaResponse.ok || !saidaResponse.ok) {
        throw new Error('Erro ao buscar dados financeiros');
      }

      const entradas = await entradaResponse.json();
      const saidas = await saidaResponse.json();

      const filterByMonthAndYear = (data, month, year) =>
        data.filter(item => {
          const date = dayjs(item.Date);
          return date.month() === month - 1 && date.year() === year;
        });

      const filterByYear = (data, year) =>
        data.filter(item => dayjs(item.Date).year() === year);

      const calculateTotal = (data) =>
        data.reduce((acc, item) => acc.plus(new Big(item.Value || 0)), new Big(0));

      // Cálculo para o mês atual
      const entradasMes = filterByMonthAndYear(entradas, mes, ano);
      const saidasMes = filterByMonthAndYear(saidas, mes, ano);

      const totalEntradaCalc = calculateTotal(entradasMes);
      const totalSaidaCalc = calculateTotal(saidasMes);

      setTotalEntrada(totalEntradaCalc);
      setTotalSaida(totalSaidaCalc);
      setBalancoMes(totalEntradaCalc.plus(totalSaidaCalc));

      // Cálculo para o ano
      const entradasAno = filterByYear(entradas, ano);
      const saidasAno = filterByYear(saidas, ano);

      const totalEntradaAnoCalc = calculateTotal(entradasAno);
      const totalSaidaAnoCalc = calculateTotal(saidasAno);

      setBalancoAno(totalEntradaAnoCalc.plus(totalSaidaAnoCalc));
    } catch (error) {
      console.error("Erro ao buscar dados financeiros:", error);
    }
  }, [mes, ano]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { 
    totalEntrada, 
    totalSaida, 
    balancoMes, 
    balancoAno, 
    refetch: fetchData 
  };
};

export default useFinanceData;
