import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import styles from "./Home.module.css";
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import useFinanceData from '../../hooks/useHome';
import CountUp from 'react-countup';
import CategoryChart from '../../components/Charts/CategoryChart';
import Footer from '../../components/Footer/Footer';
import FormModal from '../../components/FormModal/FormModal';
import FormBtn from '../../components/FormModal/FormBtn';

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [mes, setMes] = useState(dayjs().month() + 1);
  const [ano, setAno] = useState(dayjs().year());
  const { totalEntrada, totalSaida, balancoMes, balancoAno } = useFinanceData(mes, ano);

  const showModal = () => setVisible(true);
  const handleCancel = () => setVisible(false);

  const handleDateChange = (date) => {
    setMes(date.month() + 1);
    setAno(date.year());
  };

  const handleFormSubmit = () => {
    setMes(mes);
    setAno(ano);
  };

  useEffect(() => {
  }, [mes, ano]);

  return (
    <div className={`${styles.body} ${styles.homePage}`}>
      <TopBar />

      <div>
        <FormBtn onClick={showModal} />
        <FormModal visible={visible} onCancel={handleCancel} onSuccess={handleFormSubmit} />
      </div>

      <div className={`${styles.date} ${styles.card}`}>
        <DatePicker
          className={styles.datePicker}
          picker="month"
          onChange={handleDateChange}
          defaultValue={dayjs()}
          format="MMMM YYYY"
          style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
          inputReadOnly
        />
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
        <CategoryChart mes={mes} ano={ano} />
      </div>

      <BottomBar />
      <Footer />
    </div>
  );
};

export default Home;
