import React, { useEffect } from 'react';
import styles from './Payment.module.css';

const Payment = () => {
  useEffect(() => {
    // Carregar script da Stripe
    const stripeScript = document.createElement('script');
    stripeScript.src = "https://js.stripe.com/v3/buy-button.js";
    stripeScript.async = true;
    stripeScript.onload = () => {
      console.log("Script Stripe carregado com sucesso.");
    };
    document.body.appendChild(stripeScript);

    return () => {
      document.body.removeChild(stripeScript);
    };
  }, []);

  return (
    <div className={styles['payment-container']}>
      {/* Cabeçalho */}
      <div className={styles['payment-header']}>
        <h2>Ative seu Acesso ao Sistema</h2>
      </div>

      {/* Descrição */}
      <div className={styles['payment-description']}>
        <p>
          Garanta acesso total ao sistema por apenas <strong>R$ 29,90/mês</strong>. 
          Experimente gratuitamente por <strong>3 dias</strong> antes de ser cobrado.
        </p>
      </div>

      {/* Botão de Pagamento da Stripe */}
      <div className={styles['stripe-button-container']}>
        <stripe-buy-button
          buy-button-id="buy_btn_1QOizlGrkVP6EhhvyUQmrFzz"
          publishable-key="pk_test_51QNxvcGrkVP6EhhvIc4T41GOUQq89CHi1zYxKiClPKUWAQJt6Y4HpDaU4bDWPYKIoSjkEKyaxq0vDcoh0RO9moTd00YFs278RS"
        >
        </stripe-buy-button>
      </div>

      {/* Rodapé */}
      <div className={styles['payment-footer']}>
        <p>
          Após a ativação, você terá acesso completo às funcionalidades do sistema.
        </p>
        <p>
          <a href="/faq">Dúvidas? Consulte nossa FAQ</a>.
        </p>
      </div>
    </div>
  );
};

export default Payment;
