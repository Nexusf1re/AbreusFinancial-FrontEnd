import React from 'react';
import { Navigate } from 'react-router-dom';
import useSubscriptionStatus from '../hooks/useSubscriptionStatus';
import './ProtectedRoute.css'; // Arquivo CSS para aplicar o blur

const ProtectedRoute = ({ children }) => {
  const { subscriptionStatus, loading } = useSubscriptionStatus();

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner">Carregando...</div>
      </div>
    );
  }

  if (!subscriptionStatus || (subscriptionStatus !== 'active' && subscriptionStatus !== 'trialing')) {
    return <Navigate to="/payment" />;
  }

  return children;
};

export default ProtectedRoute;
