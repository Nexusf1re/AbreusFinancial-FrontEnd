//src/services/subscriptionService.js
import axios from 'axios';

// Função para verificar o status da assinatura
export const checkSubscriptionStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error('Token não encontrado no localStorage');
    }

    try {
        // Faz a requisição para o backend, passando o token JWT no cabeçalho
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/stripe/check-subscription`, {
            headers: {
                Authorization: `Bearer ${token}`,  // Envia o token JWT
            },
        });

        if (response.status === 200) {
            // Se a assinatura não for encontrada, retorna um erro
            if (response.data.error === 'Assinatura não encontrada.') {
                throw new Error('Assinatura não encontrada.');
            }
            return response.data.subscriptionStatus;  // 'active', 'inactive' ou 'null'
        } else {
            throw new Error('Erro ao verificar o status da assinatura');
        }
    } catch (error) {
        throw new Error('Erro ao verificar o status da assinatura: ' + error.message);
    }
};
