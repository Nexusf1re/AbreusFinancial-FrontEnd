// src/hooks/usePayment.js
import { useState } from 'react';
import axios from 'axios';

const usePayment = () => {
  const [loading, setLoading] = useState(false);

  const handleStripePayment = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      // Criação do cliente Stripe
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
        // Criação da sessão de checkout
        const checkoutSession = await axios.post(
          `${process.env.REACT_APP_API_URL}/stripe/create-checkout-session`,
          {
            customerId: response.data.customerId,
            plan: 'prod_RI3op7UcXExuNb', // ID do produto
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

  return {
    loading,
    handleStripePayment,
  };
};

export default usePayment;
