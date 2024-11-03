import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Função para buscar dados financeiros
export const fetchFinancialData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error('Token não encontrado no localStorage');
    }

    try {
        const response = await axios.get(`${API_URL}/transactions/financial`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar dados financeiros: ' + error.message);
    }
};

// Função para editar uma transação
export const editTransaction = async (id, transactionData) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error('Token não encontrado no localStorage');
    }

    try {
        const response = await axios.put(`${API_URL}/transactions/update/${id}`, transactionData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao editar transação: ' + error.message);
    }
};

// Função para deletar uma transação
export const deleteTransaction = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error('Token não encontrado no localStorage');
    }

    try {
        await axios.delete(`${API_URL}/transactions/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        throw new Error('Erro ao deletar transação: ' + error.message);
    }
};
