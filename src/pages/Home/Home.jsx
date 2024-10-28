import React from 'react';
import styles from "./Home.module.css";
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';

const Home = () => {
  const date = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className={`${styles.body} ${styles.homePage}`}>
      <TopBar />

      <div className={`${styles.date} ${styles.card}`}>
        {date}
      </div>

      <div className={styles.InOut}>
        <div className={`${styles.income} ${styles.card}`}>
          <p className={styles.name}>Total Entrada</p>
          <p className={styles.icomeValue}>R$9.000,00</p>
        </div>

        <div className={`${styles.outgoing} ${styles.card}`}>
          <p className={styles.name}>Total Saída</p>
          <p className={styles.outgoingValue}>R$7.500,00</p>
        </div>
      </div>

      <div className={`${styles.monthBalance} ${styles.card}`}>
        <p className={styles.name}>Balanço Mês</p>
        <p className={styles.balanceValue}>R$1.500,00</p>
      </div>

      <div className={`${styles.graph} ${styles.card}`}>
      
      </div>

      <BottomBar />
    </div>
  );
};

export default Home;
