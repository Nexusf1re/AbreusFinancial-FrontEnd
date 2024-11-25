//src/pages/Payment/Payment.jsx
import React, { useState } from 'react';
import axios from 'axios';
import TopBar from '../../components/TopBar/TopBar';
import styles from './Payment.module.css';

const Payment = () => {
  const [loading, setLoading] = useState(false);

  const handleStripePayment = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/stripe/create-stripe-customer`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.customerId) {
        const checkoutSession = await axios.post(
          `${process.env.REACT_APP_API_URL}/stripe/create-checkout-session`,
          {
            customerId: response.data.customerId,
            plan: 'prod_RH1DyFkPbpBYCL', // ID do produto
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        window.location.href = checkoutSession.data.url;
      } else {
        console.error("Erro ao criar cliente no Stripe");
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
    } finally {
      setLoading(false);
    }
  };

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
