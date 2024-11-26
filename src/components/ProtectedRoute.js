// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import useSubscriptionStatus from '../hooks/useSubscriptionStatus';

const ProtectedRoute = ({ children }) => {
  const { subscriptionStatus, loading } = useSubscriptionStatus();

  if (loading) {
    return <p>Carregando...</p>; // Exibe um spinner ou mensagem enquanto verifica o status
  }

  if (subscriptionStatus !== 'active' && subscriptionStatus !== 'trialing') {
    return <Navigate to="/payment" />; // Redireciona para a página de pagamento se a assinatura for inválida
  }

  return children; // Renderiza o conteúdo protegido se a assinatura for válida
};

export default ProtectedRoute;
