import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchFinancialData = async () => {
    const username = localStorage.getItem("username");
    if (!username) {
        throw new Error('Usuário não encontrado no localStorage');
    }

    try {
        const response = await axios.get(`${API_URL}/transactions/financial?Username=${username}`);
        return response.data; // Ajuste conforme a estrutura da resposta da sua API
    } catch (error) {
        throw new Error('Erro ao buscar dados financeiros: ' + error.message);
    }
};
