import React from 'react';
import TopBar from '../../components/TopBar/TopBar';
import styles from './Payment.module.css';
import usePayment from '../../hooks/usePayment';
import AccessPortalButton from '../../components/AccessPortalButton/AccessPortalButton';
import useSubscriptionStatus from '../../hooks/useSubscriptionStatus';

const Payment = () => {
  const { loading, handleStripePayment } = usePayment();
  const { subscriptionStatus, loading: statusLoading } = useSubscriptionStatus();

  const showAccessPortalButton = subscriptionStatus && !statusLoading;

  const premiumFeatures = [
    "Acesso ilimitado às transações",
    "Relatórios avançados e personalizáveis",
    "Suporte exclusivo e prioritário",
    "Backup de dados em nuvem",
    "Análises em tempo real"
  ];

  return (
    <div className={styles.paymentPage}>
      <TopBar />
      <div className={styles.paymentContainer}>
        <div className={styles.productCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.productTitle}>Assinatura Premium</h2>
            <p className={styles.productSubtitle}>Desbloqueie o potencial máximo do seu gerenciamento financeiro</p>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.priceContainer}>
              <span className={styles.currencySymbol}>R$</span>
              <span className={styles.priceAmount}>29,90</span>
              <span className={styles.pricePeriod}>/mês</span>
            </div>
          </div>

          <ul className={styles.featuresList}>
            {premiumFeatures.map((feature, index) => (
              <li key={index} className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className={styles.actionSection}>
            <button
              className={styles.subscribeButton}
              onClick={handleStripePayment}
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Assinar Agora'}
            </button>

            {showAccessPortalButton && (
              <div className={styles.accessPortalSection}>
                <AccessPortalButton />
              </div>
            )}
          </div>

          <div className={styles.guaranteeText}>
          Cobrança feita apenas após os 2 dias de uso. <br /> Cancelamento fácil a qualquer momento.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;