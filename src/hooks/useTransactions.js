import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchFinancialData, editTransaction, deleteTransaction } from '../services/transactionService';
import useCategories from '../hooks/useListCategories';
import dayjs from 'dayjs';
import Big from 'big.js';
import { defaultCategoriesFilter } from '../components/DefaultCategories';

export const useTransactions = () => {
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const { categories } = useCategories();

    const allCategories = useMemo(() => {

        if (!categories) return defaultCategoriesFilter;

        try {
            const customCategories = categories.map(cat => ({
                Id: cat.Id,
                Category: cat.Category,
                Type: cat.Type
            }));

            const combinedCategories = [
                ...defaultCategoriesFilter,
                ...customCategories
            ];

            return combinedCategories;
        } catch (error) {
            console.error('Erro ao processar categorias:', error);
            return defaultCategoriesFilter;
        }
    }, [categories]);

    const filteredCategories = useMemo(() => {
        if (!allCategories) return [];

        if (editingTransaction) {
            const filtered = allCategories.filter(category =>
                category.Type?.toLowerCase() === editingTransaction.Type?.toLowerCase()
            );
            return filtered;
        }

        return allCategories;
    }, [allCategories, editingTransaction]);

    useEffect(() => {
        fetchData();
    }, []);

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
        setExpandedTransaction(prev => prev === transaction ? null : transaction);
    };

    const sortedTransactions = useMemo(() => {
        return [...transactions].sort((a, b) => {
            const dateA = new Date(a.Date);
            const dateB = new Date(b.Date);

            if (dateA.getTime() === dateB.getTime()) {
                return b.Id - a.Id;
            }

            return dateB.getTime() - dateA.getTime();
        });
    }, [transactions]);

    const filteredTransactions = useMemo(() => {
        return sortedTransactions.filter(transaction => {
            const matchesSearchTerm = transaction.Description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = typeFilter ? transaction.Type === typeFilter : true;
            const matchesPaymentMethod = paymentMethodFilter ? transaction.PaymentMethod === paymentMethodFilter : true;
            const matchesCategory = categoryFilter ? transaction.Category === categoryFilter : true;

            return matchesSearchTerm && matchesType && matchesPaymentMethod && matchesCategory;
        });
    }, [sortedTransactions, searchTerm, typeFilter, paymentMethodFilter, categoryFilter]);

    const groupedTransactions = useMemo(() => {
        return filteredTransactions.reduce((acc, transaction) => {
            const date = formatDate(transaction.Date);
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(transaction);
            return acc;
        }, {});
    }, [filteredTransactions]);

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setEditedDescription(transaction.Description);
        setEditedValue(transaction.Type === "Saida" ? Math.abs(transaction.Value) : transaction.Value);
        setEditedCategory(transaction.Category);
        setEditedDate(dayjs(transaction.Date));
    };

    const confirmEdit = async () => {
        try {
            const finalValue = editingTransaction.Type === "Saida" ? -Math.abs(editedValue) : editedValue;
            const updatedData = {
                ...editingTransaction,
                Description: editedDescription,
                Value: finalValue,
                Category: editedCategory,
                Date: editedDate.toISOString(),
            };

            await editTransaction(editingTransaction.Id, updatedData);
            setTransactions(prev => prev.map(transaction =>
                transaction.Id === editingTransaction.Id ? updatedData : transaction
            ));
            setEditingTransaction(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTransaction(transactionToDelete.Id);
            setTransactions(prev => prev.filter(t => t.Id !== transactionToDelete.Id));
            setShowDeleteConfirm(false);
            setTransactionToDelete(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleModalVisibility = {
        showModal: () => {
            setVisible(true);
            setIsModalOpen(true);
        },
        handleCancel: () => {
            setVisible(false);
            setIsModalOpen(false);
        },
        handleSuccess: () => {
            setVisible(false);
            setIsModalOpen(false);
            fetchData();
        }
    };

    const handleFilters = {
        setSearchTerm,
        setTypeFilter,
        setPaymentMethodFilter,
        setCategoryFilter,
        handleSelectChange: (value) => setCategoryFilter(value),
        handleDropdownVisibleChange: (open) => setIsSelectOpen(open)
    };

    const handleEditedCategory = useCallback((value) => {
        setEditedCategory(value);
    }, []);

    const handleEditedDescription = useCallback((e) => {
        setEditedDescription(e.target.value);
    }, []);

    const handleEditedValue = useCallback((e) => {
        setEditedValue(e.target.value);
    }, []);

    const handleEditedDate = useCallback((date) => {
        setEditedDate(date);
    }, []);

    useEffect(() => {
        const shouldDisableScroll = editingTransaction || showDeleteConfirm || isModalOpen || isSelectOpen;

        if (shouldDisableScroll) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [editingTransaction, showDeleteConfirm, isModalOpen, isSelectOpen]);

    return {
        transactions: groupedTransactions,
        error,
        expandedTransaction,
        editingTransaction,
        showDeleteConfirm,
        visible,
        isModalOpen,
        isSelectOpen,
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
        fetchData,
        handleEditedCategory,
        handleEditedDescription,
        handleEditedValue,
        handleEditedDate,
        allCategories,
        filteredCategories
    };
};
