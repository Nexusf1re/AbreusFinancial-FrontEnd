import React from 'react';
import styles from "./Home.module.css";
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import useFinanceData from '../../hooks/useHome';
import CountUp from 'react-countup';
import CategoryChart from '../../components/Charts/CategoryChart';
import Footer from '../../components/Footer/Footer'

const Home = () => {
  const { totalEntrada, totalSaida, balancoMes, balancoAno } = useFinanceData();

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

      <div className={`${styles.annualBalance} ${styles.card}`}>
        <p className={`${styles.name} ${styles.p}`}>Balanço Ano Atual</p>
        <p className={`${styles.balanceValue} ${styles.p} ${balancoAno < 0 ? styles.negative : styles.positive}`}>
          R$
          <CountUp
            end={balancoAno}
            duration={1.5}
            decimals={2}
            decimal=","
            separator="."
          />
        </p>
      </div>

      <div className={styles.InOut}>
        <div className={`${styles.income} ${styles.p} ${styles.card}`}>
          <p className={`${styles.name} ${styles.p}`}>Total Entrada</p>
          <p className={`${styles.icomeValue} ${styles.p}`}>
            R$
            <CountUp
              end={totalEntrada}
              duration={1}
              decimals={2}
              decimal=","
              separator="."
            />
          </p>
        </div>

        <div className={`${styles.outgoing} ${styles.card}`}>
          <p className={`${styles.name} ${styles.p}`}>Total Saída</p>
          <p className={`${styles.outgoingValue} ${styles.p}`}>
            R$
            <CountUp
              end={totalSaida}
              duration={1}
              decimals={2}
              decimal=","
              separator="."
            />
          </p>
        </div>
      </div>

      <div className={`${styles.monthBalance} ${styles.card}`}>
        <p className={`${styles.name} ${styles.p}`}>Balanço Mês Atual</p>
        <p className={`${styles.balanceValue} ${styles.p} ${balancoMes < 0 ? styles.negative : styles.positive}`}>
          R$
          <CountUp
            end={balancoMes}
            duration={1.5}
            decimals={2}
            decimal=","
            separator="."
          />
        </p>
      </div>

      <div className={`${styles.graph} ${styles.card}`}>
        <CategoryChart />
      </div>


      <BottomBar />
      <Footer />
    </div>
  );
};

export default Home;
