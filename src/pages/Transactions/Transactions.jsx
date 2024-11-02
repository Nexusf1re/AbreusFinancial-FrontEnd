import React, { useEffect, useState } from 'react';
import { fetchFinancialData } from '../../services/transactionService';
import Big from 'big.js';
import styles from './Transactions.module.css';
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import ScrollUp from '../../components/ScrollUp/ScrollUp';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [expandedTransaction, setExpandedTransaction] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchFinancialData();
                setTransactions(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    // Função para formatar a data sem fuso horário
    const formatDate = (dataString) => {
        const date = new Date(dataString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();

        return `${day}/${month}/${year}`;
    };

    const formatValue = (value) => `R$ ${new Big(value).toFixed(2)}`;

    const toggleTransaction = (transaction) => {
        if (expandedTransaction === transaction) {
            setExpandedTransaction(null);
        } else {
            setExpandedTransaction(transaction);
        }
    };

    // Função para ordenar as transações
    const sortedTransactions = React.useMemo(() => {
        return [...transactions].sort((a, b) => {
            return new Date(b.Date) - new Date(a.Date);
        });
    }, [transactions]);

    // Função para filtrar as transações com base no termo de pesquisa
    const filteredTransactions = sortedTransactions.filter(transaction =>
        transaction.Description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Agrupando transações por data
    const groupedTransactions = filteredTransactions.reduce((acc, transaction) => {
        const date = formatDate(transaction.Date);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
    }, {});

    return (
        <div className={styles.container}>
            <TopBar />
            <h3 className={styles.title}>Histórico de lançamentos</h3>
            
            {error && <p className={styles.error}>Erro ao carregar transações: {error}</p>}
            
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Pesquisar por descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>Descrição</th>
                        <th className={styles.th}>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(groupedTransactions).map(date => (
                        <React.Fragment key={date}>
                            <tr>
                                <td colSpan={2} className={styles.dateTitle}>{date}</td>
                            </tr>
                            {groupedTransactions[date].map((transaction, index) => (
                                <React.Fragment key={`${transaction.Username}-${transaction.Date}-${index}`}>
                                    <tr className={styles.tr} onClick={() => toggleTransaction(transaction)} style={{ cursor: 'pointer' }}>
                                        <td className={styles.td}>{transaction.Description}</td>
                                        <td className={styles.td}>{formatValue(transaction.Value)}</td>
                                    </tr>
                                    {expandedTransaction === transaction && (
                                        <tr className={`${styles.tr} ${styles.expanded}`}>
                                            <td colSpan={2} className={styles.additionalInfo}>
                                                <p><strong>Método de Pagamento:&nbsp;</strong> {transaction.PaymentMethod}</p>
                                                <p><strong>Tipo:&nbsp;</strong> {transaction.Type}</p>
                                                <p><strong>Categoria:&nbsp;</strong> {transaction.Category}</p>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <ScrollUp />
            <BottomBar />
        </div>
    );
};

export default Transactions;
