import React, { useEffect } from 'react';
import { Button, Input, Modal, Select, DatePicker } from 'antd';
import { useTransactions } from '../../hooks/useTransactions';
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import ScrollUp from '../../components/ScrollUp/ScrollUp';
import Footer from '../../components/Footer/Footer';
import FormModal from '../../components/FormModal/FormModal';
import FormBtn from '../../components/FormModal/FormBtn';
import ToastConfig from '../../components/ToastConfig/ToastConfig';
import styles from './Transactions.module.css';
import { NumericFormat } from 'react-number-format';

const Transactions = () => {
    const { Option } = Select;
    const {
        transactions,
        error,
        expandedTransaction,
        editingTransaction,
        showDeleteConfirm,
        visible,
        searchTerm,
        typeFilter,
        paymentMethodFilter,
        categoryFilter,
        editedDescription,
        editedValue,
        editedCategory,
        editedDate,
        toggleTransaction,
        handleEdit,
        confirmEdit,
        handleDelete,
        handleModalVisibility,
        handleFilters,
        setShowDeleteConfirm,
        setTransactionToDelete,
        setEditingTransaction,
        filteredCategories,
        handleEditedCategory,
        handleEditedDescription,
        handleEditedValue,
        handleEditedDate
    } = useTransactions();

    const uniqueCategories = [...new Set(Object.values(transactions)
        .flat()
        .map(t => t.Category))]
        .filter(Boolean)
        .sort();

    useEffect(() => {
        const handleOverflow = (shouldLock) => {
            const body = document.body;

            if (shouldLock) {
                body.style.overflow = 'hidden';
                body.style.position = 'fixed';
                body.style.width = '100%';
                body.style.height = '100%';
                body.style.touchAction = 'none';
            } else {
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
                body.style.height = '';
                body.style.touchAction = '';
            }
        };

        if (editingTransaction) {
            handleOverflow(true);
        } else {
            handleOverflow(false);
        }

        return () => {
            handleOverflow(false);
        };
    }, [editingTransaction]);

    const formatValue = (value) => {
        if (!value) return 'R$ 0,00';

        // Converte para número e fixa 2 casas decimais
        const numValue = Math.abs(Number(value)).toFixed(2);

        // Separa parte inteira e decimal
        const [integerPart, decimalPart] = numValue.split('.');

        // Adiciona pontos para milhares na parte inteira
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        // Reconstrói o valor com o sinal negativo se necessário
        const signal = value < 0 ? '-' : '';

        return `${signal}R$ ${formattedInteger},${decimalPart}`;
    };

    return (
        <div className={styles.container}>
            <TopBar />
            <ToastConfig />

            <div>
                <FormBtn onClick={handleModalVisibility.showModal} />
                <FormModal
                    visible={visible}
                    onCancel={handleModalVisibility.handleCancel}
                    onSuccess={handleModalVisibility.handleSuccess}
                />
            </div>

            <h3 className={styles.title}>Histórico de lançamentos</h3>

            {error && <p className={styles.error}>Erro ao carregar transações: {error}</p>}

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Pesquisar por descrição..."
                    value={searchTerm}
                    onChange={(e) => handleFilters.setSearchTerm(e.target.value)}
                />
            </div>

            <div className={styles.filtersContainer}>
                <div className={styles.filtersRow}>
                    <Select
                        placeholder="Filtrar por Tipo"
                        value={typeFilter || undefined}
                        onChange={(value) => handleFilters.setTypeFilter(value)}
                        className={`${styles.filterSelect} ${styles.tipoCategoria}`}
                        allowClear
                    >
                        <Option value="Entrada">Entrada</Option>
                        <Option value="Saida">Saída</Option>
                    </Select>

                    <Select
                        placeholder="Filtrar por Categoria"
                        value={categoryFilter || undefined}
                        onChange={handleFilters.handleSelectChange}
                        onDropdownVisibleChange={handleFilters.handleDropdownVisibleChange}
                        className={`${styles.filterSelect} ${styles.tipoCategoria}`}
                        allowClear
                    >
                        {uniqueCategories.map((category) => (
                            <Option
                                key={category}
                                value={category}
                            >
                                {category.Category || ''}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div className={styles.filtersRow}>
                    <Select
                        placeholder="Filtrar por Método de Pagamento"
                        value={paymentMethodFilter || undefined}
                        onChange={(value) => handleFilters.setPaymentMethodFilter(value)}
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
                        <th className={`${styles.th} ${styles.thvalor}`}>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(transactions).map(([date, dateTransactions]) => (
                        <React.Fragment key={date}>
                            <tr>
                                <td colSpan={2} className={styles.dateTitle}>{date}</td>
                            </tr>
                            {dateTransactions.map((transaction, index) => (
                                <React.Fragment key={`${transaction.Id}-${index}`}>
                                    <tr
                                        className={styles.tr}
                                        onClick={() => toggleTransaction(transaction)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td className={styles.td}>{transaction.Description}</td>
                                        <td className={styles.td}>{formatValue(transaction.Value)}</td>
                                    </tr>
                                    {expandedTransaction === transaction && (
                                        <tr className={`${styles.tr} ${styles.expanded}`}>
                                            <td colSpan={2} className={styles.additionalInfo}>
                                                <p className={styles.p}>
                                                    <strong>Método de Pagamento:&nbsp;</strong>
                                                    {transaction.PaymentMethod}
                                                </p>
                                                <p className={styles.p}>
                                                    <strong>Tipo:&nbsp;</strong>
                                                    {transaction.Type}
                                                </p>
                                                <p className={styles.p}>
                                                    <strong>Categoria:&nbsp;</strong>
                                                    {transaction.Category}
                                                </p>
                                                <Button
                                                    className={`${styles.expandBtn} ${styles.expandEditBtn}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(transaction);
                                                    }}
                                                    type="primary"
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    className={`${styles.expandBtn} ${styles.expandDeleteBtn}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setTransactionToDelete(transaction);
                                                        setShowDeleteConfirm(true);
                                                    }}
                                                    type="danger"
                                                >
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
                    maskClosable={true}
                    destroyOnClose={true}
                    transitionName=""
                    maskTransitionName=""
                    className={styles.modalAnimation}
                    centered
                    styles={{ mask: { backdropFilter: 'blur(4px)' } }}
                >
                    <div className={styles.modalEditContent}>
                        <Input
                            className={styles.InputModalEdit}
                            placeholder="Descrição"
                            value={editedDescription}
                            onChange={handleEditedDescription}
                        />
                        <NumericFormat
                            customInput={Input}
                            className={styles.InputModalEdit}
                            placeholder="Valor"
                            thousandSeparator="."
                            decimalSeparator=","
                            decimalScale={2}
                            fixedDecimalScale
                            allowNegative={false}
                            value={editedValue}
                            onValueChange={(values) => {
                                const { value } = values;
                                handleEditedValue({ target: { value } });
                            }}
                            prefix="R$ "
                            style={{ fontSize: '20px', padding: '0 12px', height: '40px' }}
                        />
                        <DatePicker
                            className={`${styles.InputModalEdit} ${styles.InputDateEdit}`}
                            value={editedDate}
                            onChange={handleEditedDate}
                            format="DD/MM/YYYY"
                        />
                        <Select
                            className={`${styles.InputModalEdit} ${styles.InputCategoryEdit}`}
                            placeholder="Selecione a categoria"
                            value={editedCategory || undefined}
                            onChange={handleEditedCategory}
                        >
                            {filteredCategories?.map((category, index) => (
                                <Option
                                    key={category.Id || `${category.Category}-${index}`}
                                    value={category.Category || ''}
                                >
                                    {category.Category || ''}
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
                maskClosable={true}
                destroyOnClose={true}
                transitionName=""
                maskTransitionName=""
                className={styles.modalAnimation}
                centered
                styles={{ mask: { backdropFilter: 'blur(4px)' } }}
                okButtonProps={{ danger: true }}
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