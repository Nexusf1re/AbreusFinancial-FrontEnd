import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const insertTransaction = async (transactionData) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.post(`${API_URL}/transactions/insert`, transactionData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao inserir transação:", error);
        throw error;
    }
};
