import { useState, useEffect } from 'react';
import axios from 'axios';

const useSubscriptionStatus = (interval = 9000) => { 
  const [subscriptionStatus, setSubscriptionStatus] = useState(() => {
    const cachedStatus = localStorage.getItem('subscriptionStatus');
    return cachedStatus ? JSON.parse(cachedStatus) : 'pending';
  });
  const [loading, setLoading] = useState(true);

  const fetchSubscriptionStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Token JWT não encontrado.");
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/stripe/check-subscription`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 && response.data.subscriptionStatus) {
        const { subscriptionStatus } = response.data;
        setSubscriptionStatus(subscriptionStatus);
        localStorage.setItem('subscriptionStatus', JSON.stringify(subscriptionStatus));
      } else {
        console.error("Status da assinatura inválido ou não retornado pela API.");
      }
    } catch (error) {
      console.error("Erro ao buscar status da assinatura:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus(); // Sempre busca o status na inicialização

    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchSubscriptionStatus();
      }
    }, interval);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchSubscriptionStatus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [interval]);

  return { subscriptionStatus, loading };
};

export default useSubscriptionStatus;
