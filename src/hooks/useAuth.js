import { useState, useEffect } from 'react';
import { isAuthenticated } from '../services/authService';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    const authStatus = isAuthenticated();
    setIsLoggedIn(authStatus);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
