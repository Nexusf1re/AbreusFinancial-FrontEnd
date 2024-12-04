import React from 'react';
import { Navigate } from 'react-router-dom';
import useSubscriptionStatus from '../hooks/useSubscriptionStatus';
import './ProtectedRoute.css'; // Arquivo CSS para aplicar o blur

const ProtectedRoute = ({ children }) => {
  const { subscriptionStatus, loading } = useSubscriptionStatus();
  const [showLoading, setShowLoading] = React.useState(false);

  React.useEffect(() => {
    let timeoutId;
    if (loading) {
      timeoutId = setTimeout(() => {
        setShowLoading(true);
      }, 500); // Delay de 500ms antes de mostrar o loading
    } else {
      setShowLoading(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading]);

  if (loading && showLoading) {
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
