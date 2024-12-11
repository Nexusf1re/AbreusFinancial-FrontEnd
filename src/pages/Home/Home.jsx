import React, { useState } from 'react';
import { DatePicker, Tooltip, Collapse } from 'antd';
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
import { InfoCircleOutlined } from '@ant-design/icons';

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

  const cardDescriptions = {
    annualBalance: "Mostra o saldo total do ano atual, considerando todas as entradas e saídas",
    income: "Exibe o total de entradas (receitas) do mês selecionado",
    outgoing: "Exibe o total de saídas (despesas) do mês selecionado",
    monthBalance: "Mostra o saldo do mês selecionado (entradas - saídas)"
  };

  return (
    <div className={`${styles.container}`}>
      <TopBar />

      <div className={`${styles.date} ${styles.card}`}>
        <DatePicker {...datePickerProps} />
      </div>

      <div className={`${styles.annualBalance} ${styles.card}`}>
        <p className={`${styles.name} ${styles.p}`}>
          Balanço Ano Atual
          <Tooltip title={cardDescriptions.annualBalance}>
            <InfoCircleOutlined style={{ marginLeft: '8px', cursor: 'pointer' }} />
          </Tooltip>
        </p>
        <p className={`${styles.balanceValue} ${styles.p} ${yearlyBalance < 0 ? styles.negative : styles.positive}`}>
          R$ <CountUp {...countUpProps} end={yearlyBalance} />
        </p>
      </div>

      <div className={styles.InOut}>
        <div className={`${styles.income} ${styles.p} ${styles.card}`}>
          <p className={`${styles.name} ${styles.p}`}>
            Total Entrada
            <Tooltip title={cardDescriptions.income}>
              <InfoCircleOutlined style={{ marginLeft: '8px', cursor: 'pointer' }} />
            </Tooltip>
          </p>
          <p className={`${styles.icomeValue} ${styles.p} ${totalIncome < 0 ? styles.negative : styles.positive}`}>
            R$ <CountUp {...countUpProps} end={totalIncome} duration={1} />
          </p>
        </div>

        <div className={`${styles.outgoing} ${styles.card}`}>
          <p className={`${styles.name} ${styles.p}`}>
            Total Saída
            <Tooltip title={cardDescriptions.outgoing}>
              <InfoCircleOutlined style={{ marginLeft: '8px', cursor: 'pointer' }} />
            </Tooltip>
          </p>
          <p className={`${styles.outgoingValue} ${styles.p} ${totalExpenses < 0 ? styles.negative : styles.positive}`}>
            R$ <CountUp {...countUpProps} end={totalExpenses} duration={1} />
          </p>
        </div>
      </div>
      <div className={`${styles.monthBalance} ${styles.card}`}>
        <p className={`${styles.name} ${styles.p}`}>
          Balanço Mês Atual
          <Tooltip title={cardDescriptions.monthBalance}>
            <InfoCircleOutlined style={{ marginLeft: '8px', cursor: 'pointer' }} />
          </Tooltip>
        </p>
        <p className={`${styles.balanceValue} ${styles.p} ${monthlyBalance < 0 ? styles.negative : styles.positive}`}>
          R$ <CountUp {...countUpProps} end={monthlyBalance} />
        </p>
      </div>

      <Collapse
        className={`${styles.creditInfo} ${styles.card}`}
        expandIconPosition="end"
        ghost
        items={[
          {
            key: '1',
            label: (
              <div className={styles.cardHeader}>
                <span className={`${styles.name} ${styles.p}`}>
                  Como funciona o cartão de crédito?
                  <InfoCircleOutlined style={{ marginLeft: '8px' }} />
                </span>
              </div>
            ),
            children: (
              <div className={styles.creditInfoContent}>
              <p>💡 <span style={{ fontWeight: 'bold' }}>Importante:</span> Compras no cartão de crédito não são contabilizadas como despesas até o pagamento da fatura.</p>
              <p>📊 <span style={{ fontWeight: 'bold' }}>Exemplo:</span> Se você fizer uma compra de R$ 100 no crédito, ela só será registrada nas suas saídas quando lançar o pagamento da fatura.</p>
              <p>💬 Isso ajuda você a acompanhar melhor seus gastos reais e prever o impacto do cartão de crédito nas suas finanças.</p>

            </div>
            
            ),
          },
        ]}
      />

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
