import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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
