import { useState } from 'react';
import { editTransaction, deleteTransaction } from '../services/transactionService';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    
    const handleDelete = async (id) => {
        try {
            await deleteTransaction(id);
            setTransactions(prev => prev.filter(transaction => transaction.id !== id));
        } catch (error) {
            console.error('Erro ao deletar a transação:', error.message);
        }
    };

    const handleEdit = async (id, updatedData) => {
        try {
            const updatedTransaction = await editTransaction(id, updatedData);
            setTransactions(prev => prev.map(transaction => transaction.id === id ? updatedTransaction : transaction));
        } catch (error) {
            console.error('Erro ao editar a transação:', error.message);
        }
    };

    return { transactions, setTransactions, handleDelete, handleEdit };
};
