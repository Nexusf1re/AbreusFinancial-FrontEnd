import { useEffect, useState } from 'react';

const useFinanceData = () => {
  const [totalEntrada, setTotalEntrada] = useState(0);
  const [totalSaida, setTotalSaida] = useState(0);
  const [balancoMes, setBalancoMes] = useState(0);

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
        const saidas = await saidaResponse.json();

        // Calcular total de entradas
        const totalEntradaCalc = entradas[0]?.Value || 0; 
        setTotalEntrada(totalEntradaCalc);

        // Calcular total de saídas
        const totalSaidaCalc = saidas[0]?.Value || 0; 
        setTotalSaida(totalSaidaCalc);

        // Calcular balanço do mês
        const balancoCalc = totalEntradaCalc + totalSaidaCalc; // Calcula o balanço
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
