// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Armazena as informações do usuário
  const [subscriptionStatus, setSubscriptionStatus] = useState(null); // Armazena o status da assinatura

  const login = (userData) => {
    setUser(userData);
    setSubscriptionStatus(userData.subscriptionStatus); // Armazenando o status da assinatura ao fazer login
  };

  const logout = () => {
    setUser(null);
    setSubscriptionStatus(null);
  };

  return (
    <AuthContext.Provider value={{ user, subscriptionStatus, login, logout, setSubscriptionStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
    