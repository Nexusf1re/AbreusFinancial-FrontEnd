import React from 'react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Controle Total das Suas Finanças</h1>
        <p>Gerencie suas entradas, saídas e muito mais em um único lugar!</p>
        <a href="/" className={styles.ctaButton}>Comece Agora</a>
      </section>
      
      <section className={styles.features}>
        <h2>Funcionalidades</h2>
        <div className={styles.feature}>
          <h3>Dashboard Completo</h3>
          <p>Visão geral das suas finanças em tempo real.</p>
        </div>
        <div className={styles.feature}>
          <h3>Gestão de Transações</h3>
          <p>Controle de entradas e saídas de forma fácil e rápida.</p>
        </div>
        {/* Adicionar mais funcionalidades aqui */}
      </section>
      
      <section className={styles.pricing}>
        <h2>Planos e Preços</h2>
        <p>A partir de R$ 29,90/mês, com teste gratuito de 2 dias.</p>
      </section>
    </div>
  );
};

export default LandingPage;
