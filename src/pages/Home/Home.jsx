import React, { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/pt_BR';
import 'dayjs/locale/pt-br';
import styles from "./Home.module.css";
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import useFinanceData from '../../hooks/useHome';
import CountUp from 'react-countup';
import CategoryChart from '../../components/Charts/CategoryChart';
import Footer from '../../components/Footer/Footer';
import FormModal from '../../components/FormModal/FormModal';
import FormBtn from '../../components/FormModal/FormBtn';
import ToastConfig from '../../components/ToastConfig/ToastConfig';

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const { 
    totalEntrada: totalIncome,
    totalSaida: totalExpenses,
    balancoMes: monthlyBalance,
    balancoAno: yearlyBalance,
    refetch: refreshData
  } = useFinanceData(selectedMonth, selectedYear);
  const [chartKey, setChartKey] = useState(0);

  const handleModalShow = () => setIsModalVisible(true);
  const handleModalClose = () => setIsModalVisible(false);

  const handleDateChange = (selectedDate) => {
    if (!selectedDate) return;
    setSelectedMonth(selectedDate.month() + 1);
    setSelectedYear(selectedDate.year());
  };

  const handleFormSuccess = () => {
    setIsModalVisible(false);
    refreshData();
    setChartKey(prevKey => prevKey + 1);
  };

  const datePickerProps = {
    className: styles.datePicker,
    picker: "month",
    onChange: handleDateChange,
    defaultValue: dayjs(),
    locale,
    format: "MMMM YYYY",
    style: { width: '100%', textAlign: 'center', justifyContent: 'center' },
    inputReadOnly: true,
    allowClear: false
  };

  const countUpProps = {
    duration: 1.5,
    decimals: 2,
    decimal: ",",
    separator: "."
  };

  return (
    <div className={`${styles.container}`}>
      <TopBar />

      <div className={`${styles.date} ${styles.card}`}>
        <DatePicker {...datePickerProps} />
      </div>

      <div className={`${styles.annualBalance} ${styles.card}`}>
        <p className={`${styles.name} ${styles.p}`}>Balanço Ano Atual</p>
        <p className={`${styles.balanceValue} ${styles.p} ${yearlyBalance < 0 ? styles.negative : styles.positive}`}>
          R$
          <CountUp {...countUpProps} end={yearlyBalance} />
        </p>
      </div>

      <div className={styles.InOut}>
        <div className={`${styles.income} ${styles.p} ${styles.card}`}>
          <p className={`${styles.name} ${styles.p}`}>Total Entrada</p>
          <p className={`${styles.icomeValue} ${styles.p} ${totalIncome < 0 ? styles.negative : styles.positive}`}>
            R$
            <CountUp {...countUpProps} end={totalIncome} duration={1} />
          </p>
        </div>

        <div className={`${styles.outgoing} ${styles.card}`}>
          <p className={`${styles.name} ${styles.p}`}>Total Saída</p>
          <p className={`${styles.outgoingValue} ${styles.p} ${totalExpenses < 0 ? styles.negative : styles.positive}`}>
            R$
            <CountUp {...countUpProps} end={totalExpenses} duration={1} />
          </p>
        </div>
      </div>

      <div className={`${styles.monthBalance} ${styles.card}`}>
        <p className={`${styles.name} ${styles.p}`}>Balanço Mês Atual</p>
        <p className={`${styles.balanceValue} ${styles.p} ${monthlyBalance < 0 ? styles.negative : styles.positive}`}>
          R$
          <CountUp {...countUpProps} end={monthlyBalance} />
        </p>
      </div>

      <div className={`${styles.graph} ${styles.card}`}>
        <CategoryChart 
          key={chartKey} 
          mes={selectedMonth} 
          ano={selectedYear} 
        />
      </div>
      <ToastConfig />
      <div>
        <FormBtn onClick={handleModalShow} />
        <FormModal 
          visible={isModalVisible} 
          onCancel={handleModalClose} 
          onSuccess={handleFormSuccess} 
        />
      </div>
      <BottomBar />
      <Footer />
    </div>
  );
};

export default Home;
