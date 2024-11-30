import React from 'react';
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
        formatValue,
        toggleTransaction,
        handleEdit,
        confirmEdit,
        handleDelete,
        handleModalVisibility,
        handleFilters,
        setShowDeleteConfirm,
        setTransactionToDelete,
        setEditingTransaction,
        setEditedDescription,
        setEditedValue,
        setEditedCategory,
        setEditedDate,
        allCategories,
        filteredCategories,
        handleEditedCategory,
        handleEditedDescription,
        handleEditedValue,
        handleEditedDate
    } = useTransactions();

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
                        {filteredCategories?.map((category, index) => (
                            <Option 
                                key={category.Id || `${category.Category}-${index}`}
                                value={category.Category || ''}
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
                        <th className={styles.th}>Valor</th>
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
                    maskClosable={false}
                >
                    <div className={styles.modalEditContent}>
                        <Input
                            className={styles.InputModalEdit}
                            placeholder="Descrição"
                            value={editedDescription}
                            onChange={handleEditedDescription}
                        />
                        <Input
                            className={styles.InputModalEdit}
                            placeholder="Valor"
                            type="number"
                            value={editedValue}
                            onChange={handleEditedValue}
                        />
                        <DatePicker
                            className={styles.InputModalEdit}
                            value={editedDate}
                            onChange={handleEditedDate}
                            format="DD/MM/YYYY"
                        />
                        <Select
                            className={styles.InputModalEdit}
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