import React, { useEffect, useState } from 'react';
import { fetchFinancialData, editTransaction, deleteTransaction } from '../../services/transactionService';
import useCategories from '../../hooks/useListCategories';
import Big from 'big.js';
import { Button, Input, Modal, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import styles from './Transactions.module.css';
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import ScrollUp from '../../components/ScrollUp/ScrollUp';
import Footer from '../../components/Footer/Footer';
import FormModal from '../../components/FormModal/FormModal';
import FormBtn from '../../components/FormModal/FormBtn';
import ToastConfig from '../../components/ToastConfig/ToastConfig';
import { defaultCategoriesFilter } from '../../components/DefaultCategories';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [expandedTransaction, setExpandedTransaction] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');
    const [editedValue, setEditedValue] = useState('');
    const [editedCategory, setEditedCategory] = useState('');
    const [editedDate, setEditedDate] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);

    const [typeFilter, setTypeFilter] = useState('');
    const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');


    useEffect(() => {
        fetchData();
    }, []);

    const { categories } = useCategories();

    const fetchData = async () => {
        try {
            const data = await fetchFinancialData();
            setTransactions(data);
        } catch (err) {
            setError(err.message);
        }
    };

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

    const filteredTransactions = sortedTransactions.filter(transaction => {
        const matchesSearchTerm = transaction.Description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter ? transaction.Type === typeFilter : true;
        const matchesPaymentMethod = paymentMethodFilter ? transaction.PaymentMethod === paymentMethodFilter : true;
        const matchesCategory = categoryFilter ? transaction.Category === categoryFilter : true;
        
        return matchesSearchTerm && matchesType && matchesPaymentMethod && matchesCategory;
    });
    

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
        
        // Exibe o valor positivo para edição
        setEditedValue(transaction.Type === "Saida" ? Math.abs(transaction.Value) : transaction.Value);
        
        setEditedCategory(transaction.Category);
        setEditedDate(dayjs(transaction.Date));
    };
    
    const confirmEdit = async () => {
        try {
            // Multiplica por -1 se o tipo for "Saída" ao confirmar a edição
            const finalValue = editingTransaction.Type === "Saida" ? -Math.abs(editedValue) : editedValue;
    
            const updatedData = {
                ...editingTransaction,
                Description: editedDescription,
                Value: finalValue,
                Category: editedCategory,
                Date: editedDate.toISOString(),
            };
    
            await editTransaction(editingTransaction.Id, updatedData);
    
            const updatedTransactions = transactions.map((transaction) => {
                if (transaction.Id === editingTransaction.Id) {
                    return updatedData;
                }
                return transaction;
            });
    
            setTransactions(updatedTransactions);
            setEditingTransaction(null);
        } catch (err) {
            setError(err.message);
        }
    };



    const filteredCategories = React.useMemo(() => {
        if (!editingTransaction) return [];

        return categories.filter(category =>
            category.Type?.toLowerCase() === editingTransaction.Type?.toLowerCase()
        );
    }, [categories, editingTransaction]);

    const handleDeleteClick = (transaction) => {
        setTransactionToDelete(transaction);
        setShowDeleteConfirm(true);
    };


    // Combina as categorias padrões com as categorias carregadas, garantindo que não haja duplicatas
    const allCategories = React.useMemo(() => {
        const categoryNames = new Set(defaultCategoriesFilter.map((cat) => cat.Category));
        const mergedCategories = [
            ...defaultCategoriesFilter,
            ...categories.filter((category) => !categoryNames.has(category.Category))
        ];
        return mergedCategories;
    }, [categories]);

    const handleDelete = async () => {
        try {
            await deleteTransaction(transactionToDelete.Id);

            const updatedTransactions = transactions.filter((t) => t.Id !== transactionToDelete.Id);
            setTransactions(updatedTransactions);
            setShowDeleteConfirm(false);
            setTransactionToDelete(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const handleCancel = () => setVisible(false);

    const handleSuccess = () => {
        setVisible(false);  
        fetchData();         
    };
    
    const { Option } = Select;

      const [isSelectOpen, setIsSelectOpen] = useState(false);
    
      useEffect(() => {
        if (isSelectOpen) {
          // Desabilita o scroll quando o Select está aberto
          document.body.style.overflow = 'hidden';
        } else {
          // Restaura o scroll quando o Select está fechado
          document.body.style.overflow = 'auto';
        }
    
        return () => {
          // Restaura o scroll quando o componente for desmontado
          document.body.style.overflow = 'auto';
        };
      }, [isSelectOpen]);
    
      const handleSelectChange = (value) => {
        setCategoryFilter(value);
      };
    
      const handleDropdownVisibleChange = (open) => {
        setIsSelectOpen(open);
      };
    

    return (
        <div className={styles.container}>
            <TopBar />
            <ToastConfig />

            <div>
                <FormBtn onClick={showModal} />
                <FormModal visible={visible} onCancel={handleCancel} onSuccess={handleSuccess} />
            </div>

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

            
            <div className={styles.filtersContainer}>
    <div className={styles.filtersRow}>
        {/* Filtro de Tipo */}
        <Select
            placeholder="Filtrar por Tipo"
            value={typeFilter}
            onChange={(value) => setTypeFilter(value)}
            className={`${styles.filterSelect} ${styles.tipoCategoria}`}
            allowClear
        >
            <Option value="Entrada">Entrada</Option>
            <Option value="Saida">Saída</Option>
        </Select>

        {/* Filtro de Categoria */}
        <Select
            placeholder="Filtrar por Categoria"
            value={categoryFilter}
            onChange={handleSelectChange}
            onDropdownVisibleChange={handleDropdownVisibleChange}
            className={`${styles.filterSelect} ${styles.tipoCategoria}`}
            allowClear
            >
            {allCategories.map((category) => (
                <Option key={category.Id} value={category.Category}>
                {category.Category}
                </Option>
            ))}
        </Select>
    </div>

    <div className={styles.filtersRow}>
        {/* Filtro de Método de Pagamento */}
        <Select
            placeholder="Filtrar por Método de Pagamento"
            value={paymentMethodFilter}
            onChange={(value) => setPaymentMethodFilter(value)}
            className={styles.filterSelect}
            allowClear
        >
            <Option value="Dinheiro">Dinheiro</Option>
            <Option value="Pix">Pix</Option>
            <Option value="Debito">Débito</Option>
            <Option value="Credito">Crédito</Option>
            <Option value="Boleto">Boleto</Option>
            <Option value="EmConta">Em Conta</Option>
        </Select>
    </div>
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
                                <React.Fragment key={`${transaction.Id}-${index}`}>
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
                                                <Button
                                                    className={`${styles.expandBtn} ${styles.expandEditBtn}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(transaction);
                                                    }}
                                                    type="primary">
                                                    Editar
                                                </Button>
                                                <Button
                                                    className={`${styles.expandBtn} ${styles.expandDeleteBtn}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteClick(transaction);
                                                    }}
                                                    type="danger">
                                                    Deletar
                                                </Button>
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
                    open={!!editingTransaction}
                    onOk={confirmEdit}
                    onCancel={() => setEditingTransaction(null)}
                >
                    <div className={styles.modalEditContent}>
                        <Input
                            className={styles.InputModalEdit}
                            placeholder="Descrição"
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                        />

                        <Input
                            className={styles.InputModalEdit}
                            placeholder="Valor"
                            type="number"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                        />

                        <DatePicker
                            className={styles.InputModalEdit}
                            value={editedDate}
                            onChange={(date) => setEditedDate(date)}
                            format="DD/MM/YYYY"
                        />

                        <Select
                            className={styles.InputModalEdit}
                            placeholder="Selecione a categoria"
                            value={editedCategory}
                            onChange={(value) => setEditedCategory(value)}
                        >
                            {filteredCategories.map((category) => (
                                <Option key={category.Id} value={category.Category}>
                                    {category.Category}
                                </Option>
                            ))}
                        </Select>

                        <Input
                            className={styles.InputModalEdit}
                            value={editingTransaction?.Type}
                            disabled
                            placeholder="Tipo de Lançamento"
                        />
                    </div>
                </Modal>
            )}

            <Modal
                title="Confirmar Exclusão"
                open={showDeleteConfirm}
                onOk={handleDelete}
                onCancel={() => {
                    setShowDeleteConfirm(false);
                    setTransactionToDelete(null);
                }}
            >
                <p>Tem certeza que deseja excluir esta transação?</p>
            </Modal>

            <ScrollUp />
            <BottomBar />
            <Footer />
        </div>
    );
};

export default Transactions;