// src/hooks/useSubscriptionStatus.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useSubscriptionStatus = (interval = 300000) => { // Intervalo padrão: 5 minutos
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptionStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Token JWT não encontrado.");
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/stripe/check-subscription`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { subscriptionStatus } = response.data;
        setSubscriptionStatus(subscriptionStatus);
      }
    } catch (error) {
      console.error("Erro ao buscar status da assinatura:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();

    // Configurar verificação periódica
    const intervalId = setInterval(fetchSubscriptionStatus, interval);

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, [interval]);

  return { subscriptionStatus, loading };
};

export default useSubscriptionStatus;
