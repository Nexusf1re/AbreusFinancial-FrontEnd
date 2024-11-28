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
    let intervalId;

    const startValidation = () => {
      fetchSubscriptionStatus(); // Validação imediata ao entrar na página

      // Configurar validações periódicas somente quando a aba estiver visível
      intervalId = setInterval(() => {
        if (document.visibilityState === 'visible') {
          fetchSubscriptionStatus();
        }
      }, interval);
    };

    startValidation();

    // Listener para eventos de visibilidade da página
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchSubscriptionStatus(); // Validação imediata ao retornar para a aba ativa
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [interval]);

  return { subscriptionStatus, loading };
};

export default useSubscriptionStatus;
