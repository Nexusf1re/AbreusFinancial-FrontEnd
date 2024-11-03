import React, { useEffect, useState } from 'react';
import { fetchFinancialData } from '../../services/transactionService';
import Big from 'big.js';
import { Button, Input, Modal } from 'antd';
import styles from './Transactions.module.css';
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import ScrollUp from '../../components/ScrollUp/ScrollUp';
import Footer from '../../components/Footer/Footer';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [expandedTransaction, setExpandedTransaction] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');
    const [editedValue, setEditedValue] = useState('');
    const [editedCategory, setEditedCategory] = useState('');

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

    const sortedTransactions = React.useMemo(() => {
        return [...transactions].sort((a, b) => new Date(b.Date) - new Date(a.Date));
    }, [transactions]);

    const filteredTransactions = sortedTransactions.filter(transaction =>
        transaction.Description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedTransactions = filteredTransactions.reduce((acc, transaction) => {
        const date = formatDate(transaction.Date);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
    }, {});

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setEditedDescription(transaction.Description);
        setEditedValue(transaction.Value);
        setEditedCategory(transaction.Category);
    };

    const confirmEdit = () => {
        // Lógica para editar a transação
        const updatedTransactions = transactions.map((transaction) => {
            if (transaction.Username === editingTransaction.Username && transaction.Date === editingTransaction.Date) {
                return { ...transaction, Description: editedDescription, Value: editedValue, Category: editedCategory };
            }
            return transaction;
        });
        setTransactions(updatedTransactions);
        setEditingTransaction(null);
    };

    const handleDelete = (transaction) => {
        // Lógica para deletar a transação
        const updatedTransactions = transactions.filter((t) => t !== transaction);
        setTransactions(updatedTransactions);
    };

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
                                                <p className={styles.p}><strong>Método de Pagamento:&nbsp;</strong> {transaction.PaymentMethod}</p>
                                                <p className={styles.p}><strong>Tipo:&nbsp;</strong> {transaction.Type}</p>
                                                <p className={styles.p}><strong>Categoria:&nbsp;</strong> {transaction.Category}</p>
                                                <Button onClick={() => handleEdit(transaction)} type="primary">Editar</Button>
                                                <Button onClick={() => handleDelete(transaction)} type="danger">Deletar</Button>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            {editingTransaction && (
                <Modal
                    title="Editar Transação"
                    visible={!!editingTransaction}
                    onOk={confirmEdit}
                    onCancel={() => setEditingTransaction(null)}
                >
                    <Input
                        placeholder="Descrição"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <Input
                        placeholder="Valor"
                        type="number"
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                    />
                    <Input
                        placeholder="Categoria"
                        value={editedCategory}
                        onChange={(e) => setEditedCategory(e.target.value)}
                    />
                </Modal>
            )}

            <ScrollUp />
            <BottomBar />
            <Footer />
        </div>
    );
};

export default Transactions;
