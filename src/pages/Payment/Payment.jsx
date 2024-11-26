// src/pages/Payment/Payment.jsx
import React from 'react';
import TopBar from '../../components/TopBar/TopBar';
import styles from './Payment.module.css';
import usePayment from '../../hooks/usePayment';

const Payment = () => {
  const { loading, handleStripePayment } = usePayment();

  return (
    <div className={styles.PaymentContainer}>
      <TopBar />
      <div className={styles.productCard}>
        <h2 className={styles.productTitle}>Assinatura Premium</h2>
        <p className={styles.productDescription}>
          Tenha acesso a todos os recursos por apenas <br /> <strong>R$ 29,90/mês</strong>.
        </p>
        <ul className={styles.benefitsList}>
          <li>Acesso ilimitado às transações</li>
          <li>Relatórios avançados</li>
          <li>Suporte exclusivo</li>
          <li>3 dias grátis para experimentar!</li>
        </ul>
        <button 
          className={styles.paymentButton} 
          onClick={handleStripePayment} 
          disabled={loading}
        >
          {loading ? 'Processando...' : 'Assinar Agora'}
        </button>
      </div>
    </div>
  );
};

export default Payment;
