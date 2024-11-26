//src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { isAuthenticated } from '../services/authService';
import { checkSubscriptionStatus } from '../services/subscriptionService';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [hasValidSubscription, setHasValidSubscription] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      if (isLoggedIn) {
        try {
          const subscriptionStatus = await checkSubscriptionStatus();
          setHasValidSubscription(subscriptionStatus === 'active' || subscriptionStatus === 'trialing');
        } catch (err) {
          setHasValidSubscription(false);  // Caso haja algum erro, considera-se que a assinatura não está válida
        }
      }
    };

    if (isLoggedIn) {
      checkStatus();
    } else {
      setHasValidSubscription(false); // Se não estiver logado, não há assinatura válida
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setHasValidSubscription(false);  // Limpar o estado da assinatura ao deslogar
  };

  return {
    isLoggedIn,
    hasValidSubscription,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
