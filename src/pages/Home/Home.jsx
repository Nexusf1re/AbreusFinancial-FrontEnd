import React from 'react';
import styles from "./Home.module.css";
import TopBar from '../../components/TopBar/TopBar.jsx';
import BottomBar from '../../components/BottomBar/BottomBar.jsx';

const Home = () => {
  const date = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className={`${styles.body} ${styles.homePage}`}>
      <TopBar />

      <div className={styles.date}>
        {date}
      </div>

      <div className={styles.InOut}>
        <div className={styles.income}>
          <p>Total Entrada</p>
          <p className={styles.icomeValue}></p>
        </div>

        <div className={styles.outgoing}>
          <p>Total Saída</p>
          <p className={styles.outgoingValue}></p>
        </div>
      </div>

      <div className={styles.monthBalance}>
        <p className={styles.name}>Balanço Mês</p>
        <p className={styles.balanceValue}> R$1500,00</p>
      </div>

      <BottomBar />
    </div>
  );
};

export default Home;
