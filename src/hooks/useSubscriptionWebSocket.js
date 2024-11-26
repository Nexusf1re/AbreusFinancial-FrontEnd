// src/hooks/useSubscriptionWebSocket.js
import { useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const useSubscriptionWebSocket = () => {
  const { user, setSubscriptionStatus } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    const ws = new WebSocket(`${process.env.REACT_APP_API_URL}/subscriptions`);

    ws.onopen = () => {
      console.log('WebSocket conectado!');
      // Enviar identificação do cliente (como o ID ou token) ao servidor
      ws.send(JSON.stringify({ userId: user.id }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'subscription-update') {
        console.log('Atualização recebida:', data);
        setSubscriptionStatus(data.subscriptionStatus); // Atualizar o estado local
      }
    };

    ws.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket desconectado.');
    };

    // Limpar a conexão ao desmontar o hook
    return () => {
      ws.close();
    };
  }, [user]);

  return null;
};

export default useSubscriptionWebSocket;
