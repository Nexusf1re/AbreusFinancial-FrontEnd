import React from 'react';
import { Navigate } from 'react-router-dom';
import useSubscriptionStatus from '../hooks/useSubscriptionStatus';
import './ProtectedRoute.css'; // Arquivo CSS para aplicar o blur

const ProtectedRoute = ({ children }) => {
  const { subscriptionStatus, loading } = useSubscriptionStatus();

  if (loading) {
    return (
      <div className="blurred-content">
        {children}
        <div className="loading-overlay">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (subscriptionStatus !== 'active' && subscriptionStatus !== 'trialing') {
    return <Navigate to="/payment" />; // Redireciona para a página de pagamento se a assinatura for inválida
  }

  return children; // Renderiza o conteúdo protegido se a assinatura for válida
};

export default ProtectedRoute;
