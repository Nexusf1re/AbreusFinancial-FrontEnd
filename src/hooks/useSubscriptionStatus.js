import { useState, useEffect } from 'react';
import axios from 'axios';

const useSubscriptionStatus = (interval = 9000) => { 
  const [subscriptionStatus, setSubscriptionStatus] = useState(() => {
    // Tenta carregar o status da assinatura do localStorage
    const cachedStatus = localStorage.getItem('subscriptionStatus');
    return cachedStatus ? JSON.parse(cachedStatus) : null;
  });
  const [loading, setLoading] = useState(subscriptionStatus === null); // Se o status não estiver em cache, começa com loading

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
        localStorage.setItem('subscriptionStatus', JSON.stringify(subscriptionStatus)); // Armazena no localStorage
      }
    } catch (error) {
      console.error("Erro ao buscar status da assinatura:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!subscriptionStatus) {
      fetchSubscriptionStatus(); // Só faz a chamada inicial se não tiver status em cache
    }

    let intervalId;

    // Verifica se o status da assinatura está válido e se está na validade do intervalo
    if (subscriptionStatus) {
      intervalId = setInterval(() => {
        if (document.visibilityState === 'visible') {
          fetchSubscriptionStatus(); // Atualiza o status ao retornar à página
        }
      }, interval);
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchSubscriptionStatus(); // Valida ao voltar para a aba
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [subscriptionStatus, interval]);

  return { subscriptionStatus, loading };
};

export default useSubscriptionStatus;
