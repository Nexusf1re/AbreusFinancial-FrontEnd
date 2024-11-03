import { useState } from 'react';

export const useEditTransactions = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const startEditing = (transaction) => {
        setEditingTransaction(transaction);
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setEditingTransaction(null);
        setIsEditing(false);
    };

    return { isEditing, editingTransaction, startEditing, cancelEditing };
};
